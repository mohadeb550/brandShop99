import { Link } from "react-router-dom";


export default function Brand ({company}) {


    const { name, brand_image, brand_name } = company;
 

  return (
   <div className="relative grid h-[30rem] md:h-[35rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded shadow-xl bg-white bg-clip-border text-center text-gray-700" data-aos ='fade-up'>

  <div style={{ backgroundImage: `url(${brand_image})`, backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'
      }} className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none`}>
    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/30"></div>
  </div>
  <div className="relative p-8 lg:py-14 px-6 md:px-12">
    <h2 className="mb-6 block font-sans text-3xl md:text-4xl font-medium leading-[1.5] tracking-normal text-white/90 antialiased font-play">
    {name}
    </h2>

   <div className="flex items-center justify-center gap-4">
  <Link to={`/products/${brand_name}`}> <button className="bg-orange-600 py-2 px-20 text-white/80 rounded font-semibold transition-all hover:bg-orange-700 text-sm md:text-base font-play"> See Products </button></Link>
   </div>

  </div>
</div>
  )
}
