import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import toast  from "react-hot-toast";


export default function PrivateRoute({children}) {

  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
 
  if(!currentUser){
    toast.error('Please Login!')
    return <Navigate state={location.pathname} to='/login'/>;
  }

  return (
    <>
    {children}
    </>
  )
}


