import Brand from "./Brand";


export default function Brands({companies}) {



  return (
   <section className="my-8 md:my-16 lg:my-24" >
        <h1 className="text-[26px] md:text-3xl lg:text-[40px] text-orange-600 font-bold text-center font-play " > Our Brands </h1>
        <p className="text-center text-sm md:text-lg text-gray-500 mt-0 md:mt-2 mb-10 md:mb-16 lg:mb-20 font-play" >Get ready to embrace the future with BrandShop. Our mission is to connect you with the latest trends and breakthroughs in the world of electronics</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center  gap-5">
            {companies.map(company => <Brand key={company._id} company={company} />)}
        </div>
    </section>
  )
}
