import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Root() {
  const { darkMode } = useContext(AuthContext);

  return (
    <section className={`${darkMode && 'bg-slate-800'}`}>
   <Toaster/>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </section>
  )
}
