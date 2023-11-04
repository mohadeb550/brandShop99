import { useParams } from "react-router-dom";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Products() {

  const params  = useParams();

    // const products = useLoaderData();
    const { data: products, isLoading } = useQuery({
      queryKey:['products'],
      queryFn: async () => {
       const data = await axios.get(`http://localhost:5000/products/${params.brand_name}`)
        return data.data;
      }
    })


  return (
    

    <section className="my-8 md:my-16 lg:my-24 px-1 lg:px-0" >
        <h1 className="text-[26px] md:text-3xl lg:text-[40px] text-orange-600 font-bold text-center font-play " > Featured Products </h1>
        <p className="text-center text-sm md:text-lg text-gray-500 mt-0 md:mt-2 mb-10 md:mb-16 lg:mb-20 font-play" >Get ready to embrace the future with BrandShop. Our mission is to connect you with the latest trends and breakthroughs in the world of electronics</p>
      
        {isLoading &&  <span className="loading loading-dots text-orange-600/80 w-10 md:w-14 relative left-2/4"></span> }

      { products && <section>

      {
        products.length? 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center  gap-7">
            {products.map(product => <Product key={product._id} product={product} />)}
        </div> 
        :
       <div className="flex items-center justify-center">
         <img className="w-72 md:w-fit" src="/coming.jpg" />
       </div>
      }
        </section>}

    </section>
  )
}
