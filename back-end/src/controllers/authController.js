const {db} = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    registerUser: async (req, res) => {
        try{    
            const { fullname, email, phoneNumber, password} = req.body;
            
            const existingUser = await db.oneOrNone(`
                SELECT * from users 
                WHERE email = $1
            `, email);

            if(existingUser != null){
                return res.status(200).json({
                    message: "Email already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.none(`
                INSERT INTO users (fullname, email, phone_number, role, password_hash)
                VALUES ($1, $2, $3, $4, $5);
            `, [fullname, email, phoneNumber, 'user',hashedPassword])

            return res.status(200).json({
                message: "User Registration Successfull"
            })
        }catch(error){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },
  
    loginUser: async (req, res) => {
        try{
            const { email, password } = req.body;
    
            const user = await db.oneOrNone(`
                SELECT * from users 
                WHERE email = $1
            `, email);
            

            if(user == null){
                return res.status(404).json({
                    message: "User not Found"
                });
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
            if(!passwordMatch){
                return res.status(401).json({
                    message: "Invalid Password"
                })
            }

            const token = jwt.sign({
                userId : user.user_id
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            });
    
            let userData = {
                userId: user.user_id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phone_number,
                role: user.role,
            }

            const mitra = await db.oneOrNone(`
                SELECT * from mitras 
                WHERE user_id = $1
            `, user.user_id);


            if(mitra){
                userData.mitraId = mitra.mitra_id
            }
    
            return res.status(200).json({
                message: "Authentication is Successfull",
                data: userData,
                token: token
            })

        }catch(error){
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }

    },
}
module.exports = authController;