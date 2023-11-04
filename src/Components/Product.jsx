import Rating from "react-rating";
import { BsStar} from 'react-icons/bs'
import { BsStarFill} from 'react-icons/bs'
import { Link } from "react-router-dom";

export default function Product({product}) {

 const {_id, name, type, price, images, rating, brandName, description} = product;

  return (
    <div className="block rounded-lg w-full bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
   <div className="p-6 flex items-center justify-center">
   <img className="rounded-t-lg p-5 border-b w-72 h-72 object-contain"  src={images[0].original || images[1].original} />
   </div>
  
  <div className="p-6">
    <h5
      className="mb-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
   {name}
    </h5>
    <b className="text-orange-600 border py-1 px-3 text-sm  rounded border-orange-600 "> {brandName} </b>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 my-1 inline ml-5 ">
      Type : <b className="text-gray-500 text-sm"> {type} </b>
    </p>
    <h4 className="text-xl font-semibold my-3 text-gray-500"> Price : <span className="text-orange-600"> {`${price}$`} </span> </h4>

   <div className="flex mb-3">
   <Rating className="text-lime-600 " initialRating={rating} emptySymbol={<BsStar />} fullSymbol={<BsStarFill />} />
   </div>

   <div className="flex gap-3 justify-center flex-grow">

    <Link to={`/details/${brandName}/${_id}`}> <button className="bg-orange-600 py-[5px] px-8 text-white rounded font-semibold transition-all hover:bg-orange-700 text-sm md:text-base"> See Details </button></Link>
  
    <Link to={`/update-product/${brandName}/${_id}`}> <button className="bg-lime-600 py-[5px] px-8 text-white rounded font-semibold transition-all hover:bg-lime-700 text-sm md:text-base"> Update </button></Link>
   </div>
  </div>
</div>
  )
}
