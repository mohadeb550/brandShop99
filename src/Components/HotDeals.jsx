
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import Rating from 'react-rating';
import { BsCart2, BsStar, BsStarFill } from 'react-icons/bs';
import Timer from './Timer';
import { AuthContext } from '../AuthProvider/AuthProvider';
import '../Custom CSS/HotDeals.css'





function HotDeals() {

    const [ deals , setDeals ] = useState([]);
    const { darkMode } = useContext(AuthContext); 
    
    useEffect(()=> {
      fetch(`/hot_deals.json`)
      .then(res => res.json())
      .then(data => setDeals(data))
    }, [])
  


  const responsiveSettings = [
    {
      breakpoint: 1024, 
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 930,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 1,
      },
    },
  ];


  const settings = {
    infinite: true, 
    speed: 500, 
    autoplay: true, 
    autoplaySpeed: 2000,
    slidesToShow: 2, 
    slidesToScroll: 1, 
    responsive: responsiveSettings,
  };

  return (
    <div className={`autoplay-slider my-6 lg:my-32  mx-auto bg-gray-100 px-4 py-5 ${darkMode && 'bg-slate-700 text-slate-300'}`}>
        <h1 className={`text-[20px]  text-orange-500 font-bold border-b py-2 font-play ${darkMode && 'border-b-slate-500'}`}> DEALS OF THE DAY</h1>
        <Timer/>
      <Slider {...settings}>

       {deals.map(deal => {
        return (
          <>
           <div className={`flex flex-col justify-center items-center gap-3 mx-2 h-[670px] md:h-[350px] ${darkMode? 'bg-slate-700 lg:bg-slate-800' : 'bg-gray-100 lg:bg-white '}`}>
          
            
       <div className="flex flex-col md:flex-row justify-around gap-4 md:gap-12 lg:gap-8">

<div className="flex-1 flex items-center justify-center">
     <img className="p-4" src={deal.image}/>
 </div>

 <div className="flex flex-col gap-2 flex-1 p-4">
     <p className="text-red-500 py-[3px] mb-2 text-xs px-3 border w-24 border-red-500"> {22} In Stock </p>
     <div className="flex gap-3 items-center">
    <Rating className="text-orange-600 " initialRating={deal.rating} emptySymbol={<BsStar />} fullSymbol={<BsStarFill />} />
    </div>
     <h2 className="text-[18px] font-semibold"> {deal.name} </h2>
     <h3 className="text-[20px] text-orange-500 font-semibold"> {`$${deal.price}`} </h3>

     <div className={`flex items-center justify-around text-lg lg:text-2xl py-1 px-2 border w-32 lg:w-44 ${darkMode && 'border-slate-500'}`}>
         <AiOutlineMinus className=""/>
         <p className="border-l border-r py-0 px-3"> 1</p>
         <IoMdAdd/>
     </div>
    
     <div className="flex gap-2">
         <button className="bg-orange-600 py-2 px-6 text-white rounded font-semibold transition-all flex items-center gap-2 hover:bg-black/80 text-sm md:text-base"> <BsCart2 className="text-xl" /> Add to Cart </button>
     </div>

 </div>
</div>

        </div>
          </>
        )
       })}
        
      </Slider>
    </div>
  );
}

export default HotDeals;