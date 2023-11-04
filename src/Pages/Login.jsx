
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import axios from "axios";
import useAuth from "../Hooks/useAuth";



export default function Login() {

  // const { loginUser , loginWithGoogle , loginWithGithub, currentUser } = useContext(AuthContext);
  const { loginUser , loginWithGoogle , loginWithGithub, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();

        const form  = new FormData(e.target);
        const email = form.get('email')
        const password = form.get('password')

        loginUser(email, password)
        .then(result => {

            e.target.reset();
            toast.success('Login Successful !',{duration:3000});
            navigate(location.state? location.state : '/');
        
        })
        .catch(error =>  toast.error(error.message))
    }

    const socialLogin = (platform) => {
      platform()
      .then(result => {
          toast.success('Login Successful!')

          axios.post('http://localhost:5000/generate-token', { email: currentUser.email}, {withCredentials: true})
          .then(data => {

            navigate(location.state? location.state : '/');
          })
      })
      .catch(error => {
          toast.error(error.message)
      })
  }



  return(
    <div className="hero h-[600px] pb-32 md:pb-0 md:h-[700px] max-w-[1300px] mx-auto px-4 bg-base-200 bg-[url('/codioful-formerly-gradienta-n2XqPm7Bqhk-unsplash.jpg')]">
    <div className="hero-content flex-col w-full">

      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-[32px] text-white/90  px-24 py-3 font-bold text-center font-play">Login now!</h1>
      </div>

      <div className="rounded-md flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="p-5">


        <form onSubmit={handleLogin}>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input input-bordered" name="email" />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="text" placeholder="Password" className="input input-bordered" name="password" />
          

            <div className="mt-3">
                <h4 className="text-sm font-semibold"> Don't Have An Account? <Link to='/sign-up'> <span className="text-orange-600  hover:underline"> Sign Up </span></Link> </h4>
            </div>

            <div className="flex flex-col justify-evenly gap-3 mt-4 ">
                <div onClick={()=> socialLogin(loginWithGoogle)} className="py-1 px-2 border rounded flex gap-1 items-center justify-center hover:bg-gray-50 cursor-pointer" > <FcGoogle className="text-2xl"/> <p className="text-sm font-semibold text-slate-600">Sign In Google</p> </div>

                <div onClick={()=> socialLogin(loginWithGithub)} className="py-1 px-2 border rounded flex gap-1 items-center justify-center hover:bg-gray-50 cursor-pointer"  > <FaGithub className="text-2xl"/> <p className="text-sm font-semibold text-slate-600">Sign In Github</p> </div>
            </div>

          </div>
          <div className="form-control mt-6">
            <button className="bg-red-600 py-2 px-3 text-gray-100 rounded font-semibold transition-all hover:bg-red-700 text-sm md:text-base" type="submit"> Login </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
