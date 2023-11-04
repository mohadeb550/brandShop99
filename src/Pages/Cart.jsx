import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2} from "react-icons/rx";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";



export default function Cart() {

  const [ total , setTotal ] = useState(0);
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { data: items , isLoading , refetch } = useQuery({
    queryKey: ['items'],
    queryFn : async () => {
      const data = await axiosSecure.get(`/cart?email=${currentUser.email}`);
      return data.data;
    }
  })

  const { mutateAsync: removeItem } = useMutation({
    mutationKey : ['removeItem'],
    mutationFn : async (id) => {
     return axios.delete(`http://localhost:5000/item/${id}`);
    }
  })

   
    useEffect(()=> {
      const totalPrice = items?.reduce((prevValue, currentValue) => prevValue + parseFloat(currentValue.price), 0);
      setTotal(totalPrice);
    },[items])




    const handleDeleteItem = (id) => {

        removeItem(id)
       .then(axData => {
        if(axData.data.deletedCount > 0){
          toast.success('Item Removed!')
          refetch();
        }
       }).catch(error => toast.error('Something went wrong!')) 

    }

  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 

   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-extrabold text-red-500 "> Your Cart </h2>
   <img src="/pngwing.com (5).png" className="w-14 md:w-24"/>
   </div>

   {isLoading && <span className="loading loading-dots text-orange-600/80 w-10 md:w-14 relative left-2/4"></span> }

<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr className="bg-orange-500 text-white/95 text-[12px] md:text-base">
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
                Images
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
                Product
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-0 lg:py-4"> Remove </th>
            </tr>
          </thead>
          <tbody>
          
          {items?.map(item =>  <tr key={item._id} className="border-b dark:border-neutral-500">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 flex items-center justify-center">
                <img src={item.image} className="w-[52px] h-[52px] md:w-24 md:h-24 object-contain" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-gray-600 text-start md:text-center px-6 py-4 dark:border-neutral-500">
                {item.name}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {`${item.price}$`}
              </td>
              <td className="whitespace-nowrap px-6 py-4"> <button onClick={()=> handleDeleteItem(item._id)} className="bg-red-500 p-1 md:py-3 md:px-4 text-white rounded font-semibold transition-all hover:bg-red-600 text-sm md:text-base"> 
              <RxCross2 className="text-xl"/> </button> </td>
            </tr>)}
         
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<h2 className="mt-7 text-2xl font-extrabold text-gray-500 my-3"> Cart Totals </h2>
<div className="border max-w-[600px]">
  <div className="border-b flex items-center justify-between gap-3 py-3 px-6">
    <h3 className="font-semibold text-gray-700 "> Subtotal </h3>
    <p className="text-gray-600"> {`$${total}`} </p>
  </div>
  <div className="flex items-center justify-between gap-3 p-3 px-6">
  <h3 className="font-semibold text-gray-700"> Total </h3>
    <p className="text-gray-600"> {`$${total}`} </p>
  </div>
</div>

<button className="bg-red-500 py-4 px-10 my-4 text-white font-semibold transition-all hover:bg-red-600 text-sm md:text-base"> Pay Now  </button>
   </section>
  )
}
