import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import image from '../img/Hot-Chocolate.jpg'
import { useEffect, useState } from "react";

const ProductSlider = () => {

  const [productArray, setProductsArray] = useState([]);

  const fetchProducts = async () => {

    try {
      const response = await fetch('http://localhost:8080/public/getAllProductsWithoutRequiredStocksPublic', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProductsArray(data);

    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() =>{
      fetchProducts();
    }, []
  );
    
  return (
    <div className="flex h-[400px] w-full items-center justify-center bg-white my-10">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[100%] lg:max-w-[100%]"
        spaceBetween={15} 
      >
        {productArray.map((product) => (
          <SwiperSlide className="flex flex-col items-center justify-center" key={product.name}>
            <div className="flex flex-col gap-6 mb-10 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[350px] w-[300px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.imagePath})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <h1 className="text-xl lg:text-2xl">{product.name} </h1>
                <p className="lg:text-[15px]">{product.description} </p>
              </div>
              <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;