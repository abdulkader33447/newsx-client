import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://newsx-server-g4oq.onrender.com",
  //   timeout: 1000,
  //   headers: {'X-Custom-Header': 'foobar'}
});

const useAxios = () => {
  // const { user } = useAuth();

  // axiosInstance.interceptors.request.use((config) => {
  //   config.headers.authorization = `Bearer${user.accessToken}`;
  //   return config;
  // });
  return axiosInstance;
};

export default useAxios;
