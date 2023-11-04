import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import auth from "../firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import useCompanies from "../Hooks/useCompanies";



export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function AuthProvider({children}) {

 
    const [ authLoading , setAuthLoading ] = useState(true);
    const [ currentUser ,setCurrentUser ] = useState(null);
    const [ darkMode, setDarkMode ] = useState(false);
  

 
    const { companies, isLoading } = useCompanies();

     // sign up with email & password 
     const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    }

    // login with google
    const loginWithGoogle = () => {
      return signInWithPopup(auth, googleProvider);
    }

    // login with github
    const loginWithGithub = () => {
      return signInWithPopup(auth, githubProvider);
    }

    // login with email & password
    const loginUser = (email, password ) => {
      return signInWithEmailAndPassword(auth, email, password);
    }

    // logout user 
    const logOut = () => {
     return signOut(auth);
    }

    // firebase observer
    useEffect(()=>{
     
      const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      
        setCurrentUser(currentUser);
        setAuthLoading(false);

        if(currentUser){
          axios.post('http://localhost:5000/generate-token', { email: currentUser.email}, {withCredentials: true})
          .then(data => {
            console.log(data)
          })
        }
        else{
          axios.post('http://localhost:5000/logout', { email: 'none'}, {withCredentials : true})
          .then(data => {
            console.log(data)
          })
        }
      })
      return ()=>{
        unsubscribe();
      }
    },[])



    const authInfo = { companies, createUser , loginWithGoogle, loginWithGithub ,loginUser, logOut ,currentUser,  darkMode, setDarkMode  }

    if( isLoading || authLoading ){return  <Oval
      height={50}
      width={50}
      color="rgba(255, 85, 0, 0.925)"
      wrapperStyle={{}}
      wrapperClass="absolute top-[6%] md:top-[8%] left-2/4"
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="rgba(255, 85, 0, 0.554)"
      strokeWidth={2}
      strokeWidthSecondary={2}
    
    /> }

    // <span className="loading loading-spinner text-black/70 w-9 md:w-10 absolute top-[6%] md:top-[8%] left-2/4"></span>
   

  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
  )
}
