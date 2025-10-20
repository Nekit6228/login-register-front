import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});



export type Auth = {
  email: string;
  password: string;
};


export const register = async (data: Auth)=> {
  const res = await api.post('/register', data);
  return res.data;
};

export const login = async (data: Auth) => {
  const res = await api.post('/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout')
};

export const getProfile = async () => {
  const { data } = await api.get('/me'); 
  return data;
};
