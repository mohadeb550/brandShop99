import { useContext } from "react";
import Banner from "../Components/Banner";
import Brands from "../Components/Brands";
import { AuthContext } from "../AuthProvider/AuthProvider";
import HotDeals from "../Components/HotDeals";
import UpcomingProducts from "../Components/UpcomingProducts";
import Timer from "../Components/Timer";


export default function Home() {

    const { companies , darkMode } = useContext(AuthContext)

  return (
    <section className={`max-w-[1300px] mx-auto px-4 ${darkMode && 'bg-slate-800'}`}>

    <Banner/>
    <HotDeals/>
    <Brands companies={companies} />
    <UpcomingProducts/>
    </section>
  )
}
