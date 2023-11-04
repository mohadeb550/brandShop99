
import { Link, NavLink, useLocation, useNavigate, } from "react-router-dom";
// 
import toast from "react-hot-toast"
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { MdBrightness2 } from "react-icons/md";
import useAuth from "../Hooks/useAuth";



export default function Navbar() {
  
  // const { currentUser , logOut,  darkMode, setDarkMode  } = useContext(AuthContext);
  const { currentUser , logOut,  darkMode, setDarkMode  } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();


  const navLinks = <>
   <li ><NavLink className={({isActive})=> isActive? ' font-semibold bg-orange-600 text-white/95 px-3 py-[3px] rounded ': '' } to='/'> Home </NavLink></li>
   <li ><NavLink className={({isActive})=> isActive? ' font-semibold bg-orange-600 text-white/95 px-3 py-[3px] rounded ': '' } to='/add-product'> Add Product </NavLink></li>
   <li ><NavLink className={({isActive})=> isActive? ' font-semibold bg-orange-600 text-white/95 px-3 py-[3px] rounded ': '' } to='/my-cart'> My Cart </NavLink></li>
   <li ><NavLink className={({isActive})=> isActive? ' font-semibold bg-orange-600 text-white/95 px-3 py-[3px] rounded ': '' } to='/login'> Login </NavLink></li>
  
  </>

    const signOut = () => {
      logOut()
      .then(result => {
        toast.success('Logged Out !')
        navigate('/');
      })
      .catch(error => {
        toast.error('Something went wrong')

      })
    }

    const handleDarkMode = () => {
     setDarkMode(!darkMode);
    }

  return (
    <div className={`navbar bg-base-100 max-w-[1300px] mx-auto flex justify-between ${darkMode && 'bg-slate-800 text-slate-400'}`}>
  <div className="navbar-start z-50" data-aos="fade-right">
    <div className="dropdown z-50">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className={`menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded w-52 font-play ${darkMode && 'bg-slate-800'}`}>
        {navLinks}
      </ul>


    </div>
    <div className="flex items-center gap-1">
    <img src='/pngwing.com (3).png' className="w-9 md:w-12 lg:w-16"/>
    <p className="text-base  md:text-xl lg:text-2xl font-semibold text-red-600 font-play"> Brand<span className="text-orange-500">Shop</span> </p>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="flex items-center gap-10 menu-horizontal px-1 font-play ">
      {navLinks}
    </ul>
  </div>


    {pathname === '/' &&   <div onClick={handleDarkMode} className={`cursor-pointer border py-[2px] px-2 rounded-full space-x-2 ${darkMode && 'border-slate-500'}`}>

{darkMode? <p className={`text-sm font-semibold text-gray-500 ${darkMode && 'text-slate-400'}`}> Light </p> : <p className="text-sm font-semibold text-gray-500"> Dark </p>}
<button className={`text-xl outline-none`}> {darkMode? <BsFillBrightnessHighFill className="text-orange-600" /> : <MdBrightness2/> } </button>
</div>
}

  <div className="dropdown dropdown-end flex items-center justify-center gap-2 z-50" data-aos ="fade-left">
    
        {!currentUser && <Link to='/login'><button className={`font-semibold  text-sm md:text-[16px] p-1 px-3 rounded bg-gray-50 hover:bg-gray-100 ${darkMode && 'bg-slate-700 hover:bg-slate-700/75'}`}> Login </button></Link>}
        
        <div className="z-30 lg:w-10 rounded-full p-[2px] border border-gray-500 mr-2">
          <img tabIndex={0} src={currentUser?.photoURL || '/user-black.png' } className="dropdown w-7 md:w-9 cursor-pointer rounded-full" />

          {currentUser && 
         <ul tabIndex={0} className={`dropdown-content p-2 shadow bg-base-100 rounded w-52  ${darkMode && 'bg-slate-800'}`}>
          {currentUser && <li className="font-semibold text-sm border p-2 rounded text-orange-500 flex items-center gap-2"> {currentUser?.displayName || 'User'}  <img tabIndex={0} src={currentUser?.photoURL || '/user-black.png' } className="w-7 md:w-8 rounded-full" /></li>}

         <li className="cursor-pointer transition-all p-1 rounded " onClick={()=> signOut() }> Log out</li> 

        </ul>}
        </div>
     
    </div>

</div>
  )
}
