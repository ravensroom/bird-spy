import axios from 'axios';
import { User } from '../types/types';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/users/login`, {
      email,
      password,
    });
    const { userId } = response.data;
    localStorage.setItem('userId', userId);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/login/google`
    );
    const { userId } = response.data;
    localStorage.setItem('userId', userId);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const loginWithGitHub = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/login/github`
    );
    const { userId } = response.data;
    localStorage.setItem('userId', userId);
  } catch (error: any) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/logout`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const signup = async (user: User, localData: {}) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/users/signup`,
      {
        user,
        localData,
      }
    );
    const { userId } = response.data;
    localStorage.setItem('userId', userId);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

const users = {
  loginWithEmail,
  loginWithGoogle,
  loginWithGitHub,
  logout,
  signup,
};

export default users;
