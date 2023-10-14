const {db} = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userController = {
    registerUser: async (req, res) => {
        try {
            const {fullname, email, phoneNumber, password} = req.body;


            const existingUser = db.oneOrNone(`
                SELECT * FROM users 
                WHERE email = $1;
            `, [email])
            

            if(existingUser.email == email){
                return res.status(400).json({
                    message: 'Email already exist'
                })
            }

            const hashedPass = await bcrypt.hash(password, 10);
            const prefixedPhoneNumber = phoneNumber.replace('0','62');
            const prefixedFullname = fullname.toLowerCase().split(" ").map(word => {
                return word[0].toUpperCase() + word.substring(1)
            }).join(" ");
            await db.none(`
                INSERT INTO users (fullname, email, password_hash, phone_number, mitra_type, role)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [prefixedFullname, email, hashedPass, prefixedPhoneNumber, 'customer', 'user']);

            res.status(200).json({
                message: 'User Registration is Successful'
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },
  
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;


            const user = await db.oneOrNone(`
                SELECT * FROM users 
                WHERE email = $1
            `, email);

            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const passwordValid = await bcrypt.compare(password, user.password_hash);

            if(!passwordValid){
                return res.status(401).json({
                    message: 'Invalid Password'
                })
            }

            const token = jwt.sign({
                userId: user.user_id
            }, process.env.JWT_SECRET, {expiresIn: '1h'});

            res.status(200).json({ message: 'User login successful', token: token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
  
    getUserProfile: async (req, res) => {
        try {
            const userId = req.params.userId;
            const userProfile = await db.oneOrNone(`
                SELECT * FROM users 
                WHERE user_id = $1
            `, userId);

            if(!userProfile){
                res.status(404).json({
                    message: 'User not found'
                })
            }

            res.status(200).json({ user: userProfile });
        } catch (error) {
            console.error('Error while fetching user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
  
    updateUserProfile: async (req, res) => {
        try {
            const userId = req.params.userId;
            const userData = req.body;
            await db.none(`
                UPDATE users SET 
                fullname = $1,
                email = $2,
                phone_number = $3,
                address = $4
                WHERE user_id = $5;
            `, [userData.fullname,userData.email, userData.phoneNumber, userData.address,userId]);
            res.status(200).json({ message: 'User profile updated successfully'});
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error'});
        }
    },
  
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            await db.none('DELETE FROM users WHERE user_id = $1', userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateUserPassword: async(req,res) =>{
        try{
            const userId = req.params.userId
            const {oldPassword, newPassword} = req.body;
            const userProfile = await db.oneOrNone(`
                SELECT * from users 
                WHERE user_id = $1
            `, userId)

            if(!userProfile){
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            const passwordMatch = await bcrypt.compare(oldPassword, userProfile.password_hash)

            if(!passwordMatch){
                return res.status(404).json({
                    message: 'Invalid password'
                })
            }

            const newPasswordHashed = await bcrypt.hash(newPassword, 10);

            await db.none(`
                UPDATE users SET
                password_hash = $1 
                WHERE user_id = $2
            `, [newPasswordHashed, userId])

            return res.status(400).json({
                message: 'Password successfully changed'
            })

        } catch(error){
            res.status(500).json({message: 'Internal server error'})
        }
    }

  };
  
  module.exports = userController;