import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


export default function AddProduct() {

    const [ selectedBrand , setSelectedBrand ] = useState('');

    const { mutateAsync: addRequest } = useMutation({
      mutationKey: ['add-product'],
      mutationFn: async ({brand, product}) => {
        return axios.post(`http://localhost:5000/add-product`, product)
      }
    })

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const type = form.type.value;
        const price = form.price.value;
        const image1 = form.image1.value;
        const image2 = form.image2.value;
        const image3 = form.image3.value;

  const images = [
        {
          original: image1,
          thumbnail:image1,
        },
        {
          original: image2,
          thumbnail:image2,
        },
        {
          original: image3,
          thumbnail:image3,
        },
      ];

        const rating = form.rating.value;
        const brandName = selectedBrand;
        const description = form.description.value;


        addRequest({ brand : selectedBrand,  product : {name, type, price, images, rating, brandName, description}})
        .then(data => {
          if(data.data.insertedId){
            toast.success('Product Added Successfully!')
          }
        }).catch(error => {
          toast.error('Something went wrong!')
        })
    }


    
    const handleSelect = (e) => {
        setSelectedBrand(e.target.value);
    }

    
  return (
    <div className="hero bg-base-200 rounded pb-20 bg-[url('https://i.ibb.co/fDCkK24/luke-chesser-3-POMg-Ljf-Yv0-unsplash.jpg')] max-w-[1300px] mx-auto px-4">
    <div className="hero-content flex-col  w-full gap-0">

    
        <h1 className="text-[27px] lg:text-[32px] text-white/90 font-bold text-center mb-4 font-play "> Add New Product !</h1>

      <div className="rounded-lg flex-shrink-0 w-full  bg-base-100">
        <div className="p-7 lg:p-10">


        <form onSubmit={handleAddProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Product Name </span>
            </label>
            <input type="text" placeholder="product name" className="input input-bordered" name="name" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Type </span>
            </label>
            <input type="text" placeholder="Type" className="input input-bordered" name="type" />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text"> Price </span>
            </label>
            <input type="text" placeholder="price" className="input input-bordered" name="price" />
            <span className="text-red-500 text-sm p-1">  </span>
            </div>
           

            <div className="form-control mb-3">
            <label className="label">
              <span className="label-text"> Product Images URL </span>
            </label>
            <div className="flex flex-col gap-2 border border-red-500/30 rounded-md p-4">
            <input type="text" placeholder="Image 1" className="p-2 outline-none border-b" name="image1" />
            <input type="text" placeholder="Image 2" className="p-2 outline-none border-b" name="image2" />
            <input type="text" placeholder="Image 3" className="p-2 outline-none border-b" name="image3" />
            </div>
          </div>

            <div className="form-control mb-3">
            <label className="label">
              <span className="label-text"> Rating </span>
            </label>
            <input type="text" placeholder="rating" className="input input-bordered" name="rating" />
          </div>


            <div className="form-control mb-3">
            <label className="label">
              <span className="label-text"> Description </span>
            </label>
            <textarea className="border p-2 rounded outline-none" name="description" rows={4} > short description of the product... </textarea>
          </div>

          <select className="select select-error w-full max-w-xs" onChange={handleSelect}>
            <option disabled selected> Brand Selection </option>
             <option value='Apple'> Apple </option>
            <option value='Xiaomi'> Xiaomi </option>
            <option value='Samsung'> Samsung </option>
            <option value='Sony'> Sony</option>
            <option value='Google'> Google </option>
            <option value='Asus'> Asus </option>
            </select>
           
        
          <div className="form-control mt-6 lg:col-span-2">
            <button className="bg-orange-600 py-2 px-3 text-gray-100 rounded font-semibold transition-all hover:bg-orange-700 text-sm md:text-base" type="submit"> Add </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
