import { useContext, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom"
import { IoMdAdd }  from 'react-icons/io'
import { AiOutlineMinus }  from 'react-icons/ai'
import { BsCart2, BsFacebook, BsLinkedin, BsStar, BsStarFill, BsTwitter }  from 'react-icons/bs'
import { GiSelfLove }  from 'react-icons/gi'
import Rating from "react-rating";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import '../Custom CSS/imageGallery.css'


export default function ProductDetails() {

    const params = useParams();

    const { currentUser } = useContext(AuthContext);
    const email = currentUser.email;

    const { data: productSpec, isLoading } = useQuery({
        queryKey: ['productSpec'],
        queryFn : async () => {
           const data = await axios.get(`http://localhost:5000/details/${params.id}`)
           return data.data;
        }
    })

    if( isLoading ){return  <span className="loading loading-dots text-orange-500 w-9 md:w-10 absolute top-[6%] md:top-[8%] left-2/4"></span>}

    const {_id, name, type, price, rating, brandName, selectedBrand, description, images} = productSpec;

   
    const handleAddToCart = () => {
       
        const image = images[0].original;

        fetch('http://localhost:5000/product',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({ name, price, image , email })
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                toast.success('Added On Your Cart!', { duration: 2500})
            }
        })
        .catch(error => toast.error('Something went wrong!'))
    }


  return (
    <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-14 lg:my-20 mb-10">
       
       <div className="flex flex-col md:flex-row justify-around gap-4 md:gap-12 lg:gap-20">

       <div className=" bg-gray-100 p-6 custom-image-gallery">
       <ImageGallery items={images} showNav={false} showPlayButton={false} showFullscreenButton={false} />
        </div>

        <div className="flex flex-col gap-5">
            <p className="text-red-500 py-1 text-sm px-3 border w-32 border-red-500"> {44} In Stock </p>
            <h2 className="text-[28px] lg:text-4xl font-semibold font-play"> {name} </h2>
            <h4 className=""> {description } </h4>
            <h3 className="text-[25px] font-semibold"> {`$${price}`} </h3>

            <div className="flex items-center justify-around text-lg lg:text-2xl py-1 lg:py-2 px-2 border w-32 lg:w-44">
                <AiOutlineMinus className=""/>
                <p className="border-l border-r py-0 px-3"> 1</p>
                <IoMdAdd/>
            </div>
           <div className="flex gap-3 items-center"> <p>{rating}</p>
           <Rating className="text-orange-600 " initialRating={rating} emptySymbol={<BsStar />} fullSymbol={<BsStarFill />} />
           </div>
            <div className="flex gap-2">
                <button onClick={handleAddToCart} className="bg-orange-600 py-2 px-10 text-white rounded font-semibold transition-all flex items-center gap-2 hover:bg-orange-700 text-sm md:text-base"> <BsCart2 className="text-xl" /> Add to Cart </button>
                <p className="flex items-center justify-center p-4 border rounded "> <GiSelfLove/> </p>
            </div>

            <div className="border-t py-5 mt-5 space-y-2 w-[100%]">
                <h4> <b>Brand Name :</b> {brandName} </h4>
                <h4> <b> Category :</b> {type} </h4>
                <h4 className="flex items-center gap-3 text-xl"> <b className="text-gray-600"> Share :</b> <BsFacebook/> <BsTwitter/> <BsLinkedin/> </h4>
               
            </div>
        </div>
       </div>

    </section>
  )
}
