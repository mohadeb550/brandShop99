import axios from "axios"
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})

export default function useAxiosSecure() {

    const { logOut } = useAuth()
    const navigate = useNavigate();

    useEffect(()=>{
        axiosSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            if(error.response.status === 401 || error.response.status === 403){
                logOut();
                navigate('/login')
            }
        })
    },[])

  return axiosSecure;
}
