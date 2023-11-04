
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';





function AdsSlider() {

  const [ sliderData , setSliderData ] = useState([]); 

  const params = useParams()
  const { brand_name } = params;
  
  useEffect(()=> {
    fetch(`/${brand_name}_slider.json`)
    .then(res => res.json())
    .then(data => setSliderData(data))
  }, [])



  const settings = {
    dots: true,
    infinite: true, 
    speed: 500, 
    autoplay: true, 
    autoplaySpeed: 1700,
    slidesToShow: 1, 
    slidesToScroll: 1, 
  };

  return (
    <div className="autoplay-slider mb-14 mx-auto" >
      <Slider {...settings}>

       {sliderData.map(banner => {
        return (
           <div key={banner.id} className='bg-gray-100 flex flex-col justify-center items-center gap-3 h-52 md:h-64 lg:h-96'>
         
          <img className='w-full h-full object-cover' src={banner.image}/>
    
        </div>

        )
       })}
        
      </Slider>
    </div>
  );
}

export default AdsSlider;