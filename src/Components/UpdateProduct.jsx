import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData} from "react-router-dom";


export default function UpdateProduct () {

  const [ render , setRender ]  = useState();

  const {_id, name, type, price, images, rating} = useLoaderData();


    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const type = form.type.value;
        const price = form.price.value;
        const rating = form.rating.value;

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
 

        fetch(`http://localhost:5000/update-product/${_id}`,{
            method: "PATCH",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({name, type, price, images, rating})
        })
        .then(res => res.json())
        .then(data => {
         if(data.modifiedCount){
          setRender(render + 1)
          toast.success('Updated Successfully!')
         }
        })
        .catch(error => {
          console.log(error)
          toast.error('Something went wrong!')
        })
    }


    
    
  return (
    <div className="hero bg-base-200 rounded pb-20 bg-[url('https://images.unsplash.com/photo-1604339454409-701c5278c546?auto=format&fit=crop&q=80&w=2127&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] max-w-[1300px] mx-auto px-4">
    <div className="hero-content flex-col  w-full gap-0">

    
        <h1 className="text-[27px] lg:text-[32px] text-white/90 font-bold text-center mb-4 font-play "> Update Product ! !</h1>

      <div className="rounded-lg flex-shrink-0 w-full  bg-base-100">
        <div className="p-7 lg:p-10">


        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Product Name </span>
            </label>
            <input type="text" placeholder="product name" className="input input-bordered" name="name" defaultValue={name} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Type </span>
            </label>
            <input type="text" placeholder="Type" className="input input-bordered" name="type" defaultValue={type} />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text"> Price </span>
            </label>
            <input type="text" placeholder="price" className="input input-bordered" name="price" defaultValue={price} />
            <span className="text-red-500 text-sm p-1">  </span>
          </div>
           

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text"> Product Images URL </span>
            </label>
            <div className="flex flex-col gap-2 border border-red-500/30 rounded-md p-4">
            <input type="text" placeholder="Image 1" className="p-2 outline-none border-b" name="image1" defaultValue={images[0].original} />
            <input type="text" placeholder="Image 2" className="p-2 outline-none border-b" name="image2" defaultValue={images[1].original} />
            <input type="text" placeholder="Image 3" className="p-2 outline-none border-b" name="image3" defaultValue={images[2].original} />
            </div>
          </div>

            <div className="form-control mb-3">
            <label className="label">
              <span className="label-text"> Rating </span>
            </label>
            <input type="text" placeholder="rating" className="input input-bordered" name="rating" defaultValue={rating} />
          </div>
        
          <div className="form-control mt-6 lg:col-span-2">
            <button className="bg-orange-600 py-2 px-3 text-gray-100 rounded font-semibold transition-all hover:bg-orange-700 text-sm md:text-base" type="submit"> Update Changes </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
