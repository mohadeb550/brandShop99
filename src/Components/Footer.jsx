import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Footer() {

  const { darkMode } = useContext(AuthContext); 

  return (
   <footer className={`bg-base-200 ${darkMode && 'bg-slate-700'}`}>
    <div className={`footer p-10 text-base-content max-w-[1300px] mx-auto ${darkMode && 'text-slate-400'}`}>
    <nav>
    <header className="footer-title">Services</header> 
    <a className="link link-hover">Branding</a> 
    <a className="link link-hover">Design</a> 
    <a className="link link-hover">Marketing</a> 
    <a className="link link-hover">Advertisement</a>
  </nav> 
  <nav>
    <header className="footer-title">Company</header> 
    <a className="link link-hover">About us</a> 
    <a className="link link-hover">Contact</a> 
    <a className="link link-hover">Jobs</a> 
    <a className="link link-hover">Press kit</a>
  </nav> 
  <nav>
    <header className="footer-title">Legal</header> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
    <a className="link link-hover">Cookie policy</a>
  </nav> 
  <form>
    <header className="footer-title">Newsletter</header> 
    <fieldset className="form-control w-80">
      <label className="label">
        <span className={`label-text ${darkMode && 'text-orange-600'}`}>Enter your email address</span>
      </label> 
      <div className="relative flex">
        <input type="text" placeholder="username@site.com" className="input  w-full pr-16 rounded-none" /> 
        <button className="bg-orange-600 py-2 px-3 text-white/80 font-semibold transition-all hover:bg-orange-700 text-sm md:text-base"> Subscribe </button>
      </div>
    </fieldset>
  </form>
    </div>
</footer>
  )
}
