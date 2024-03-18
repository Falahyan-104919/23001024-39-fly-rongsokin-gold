import React, { createContext, useState } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const userTraits = JSON.parse(localStorage.getItem('user_traits')) || {
    userId: '',
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: '',
    token: '',
  };
  const userIsLoggedIn =
    JSON.parse(localStorage.getItem('user_is_logged_in')) || false;
  const [user, setUser] = useState(userTraits);
  const [isLoggedIn, setIsLoggedIn] = useState(userIsLoggedIn);

  const login = async ({ email, password }) => {
    const res = await axiosInstance
      .post('login', {
        email: email,
        password: password,
      })
      .then((response) => {
        return {
          status: response.status,
          data: response.data,
          userData: response.data.userData,
          token: response.data.token,
          message: response.data.message,
        };
      })
      .catch((err) => {
        if (err.name === 'AxiosError') {
          return err.response;
        }
      });

    if (res.status != 200) {
      return {
        status: res.status,
        message: res.data.message,
      };
    }
    setIsLoggedIn(true);
    setUser({
      userId: res.userData.userId,
      fullname: res.userData.fullname,
      email: res.userData.email,
      phoneNumber: res.userData.phoneNumber,
      address: res.userData.address,
      role: res.userData.role,
      token: res.token,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = res.token;
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    if (res.userData.mitraId) {
      axiosInstance.interceptors.request.use(
        (config) => {
          config.headers['role'] = res.role;
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );
      setUser((prevData) => {
        return {
          ...prevData,
          mitraId: res.userData.mitraId,
          mitraType: res.userData.mitraType,
          mitraName: res.userData.mitraName,
        };
      });
    }

    if (res.userData.image_profile[0]['image_path'] !== null) {
      setUser((prevData) => {
        return {
          ...prevData,
          profileImg: res.userData.image_profile[0]['image_path'],
        };
      });
    }

    return res;
  };

  const setRole = (values) => {
    setUser((prevData) => {
      return {
        ...prevData,
        role: values,
      };
    });
  };

  const setMitraId = (values) => {
    setUser((prevData) => {
      return {
        ...prevData,
        mitraId: values,
      };
    });
  };

  const setProfilePic = (values) => {
    setUser((prevData) => {
      return {
        ...prevData,
        profileImg: values,
      };
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({
      userId: '',
      fullname: '',
      email: '',
      phoneNumber: '',
      address: '',
      role: '',
      token: '',
      profileImg: '',
    });

    localStorage.removeItem('user_traits');
    localStorage.removeItem('user_is_logged_in');
    navigate('/');
    navigate(0);
  };

  localStorage.setItem('user_traits', JSON.stringify(user));
  localStorage.setItem('user_is_logged_in', JSON.stringify(isLoggedIn));

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isLoggedIn,
        setRole,
        setMitraId,
        setProfilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
