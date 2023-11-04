

export default function Banner() {

  return (
    <div className="hero h-[45vh] lg:h-[50vh]" style={{backgroundImage: 'url(https://i.ibb.co/Pgn4xZT/top-view-smartphone-with-keyboard-charger.jpg)'}}>
        
    <div className="hero-overlay bg-black/60"></div>
    <div className="hero-content text-center md:text-justify text-neutral-content">
      <div className="w-[90%] lg:w-[70%]">
        <h1 className="mb-5 text-3xl md:text-4xl lg:text-5xl font-bold font-play">Explore Our Tech Universe.</h1>
        <p className="mb-5 text-white/60 text-[12px] md:text-base font-play">Welcome to <b>BrandShop</b>, where we dive deep into the world of electronics and technology. Join us on a journey of discovery, innovation, and inspiration. Get ready to embrace the future with BrandShop. Our mission is to connect you with the latest trends and breakthroughs in the world of electronics. Stay informed, stay inspired, and stay ahead in the fast-paced world of tech.</p>
        <button className="bg-orange-600 py-2 px-16 md:px-3 text-white/80 rounded font-semibold transition-all hover:bg-orange-700 text-sm md:text-base"> Explore More </button>
      </div>
    </div>
  </div>
  )
}
