import React, { createContext, useState } from 'react';
import axiosInstance from '../utils/axios';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialValues = {
    userId: '',
    fullname: '',
    email: '',
    phoneNumber: '',
    role: '',
    token: '',
  };
  const [user, setUser] = useState(initialValues);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          mitraAddress: res.userData.mitraAddress,
        };
      });
    }

    if (res.userData.image_id) {
      setUser((prevData) => {
        return {
          ...prevData,
          imageId: res.userData.image_id,
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

  const logout = () => {
    setIsLoggedIn(false);
    setUser(initialValues);
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
