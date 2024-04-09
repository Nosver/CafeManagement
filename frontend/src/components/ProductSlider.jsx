import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";

import image from '../img/Hot-Chocolate.jpg'

const ProductSlider = () => {

    const products = [
        { name: 'Premium Arabic Coffee', description: 'Rich and aromatic Arabic coffee blend.', image: '' },
        { name: 'Premium Italian Latte', description: 'Smooth and creamy latte with a hint of Italian roast.', image: '' },
        { name: 'Standard Espresso', description: 'Classic espresso shot with bold flavor.', image: '' },
        { name: 'Strawberry Milkshake', description: 'Refreshing milkshake with fresh strawberries.', image: '' },
        { name: 'Caramel Frappuccino', description: 'Indulgent frappuccino with caramel swirls.', image: '' },
        { name: 'Vanilla Ice Cream', description: 'Creamy vanilla ice cream made with real vanilla beans.', image: '' },
        { name: 'Black Coffee', description: 'Simple and strong black coffee.', image: '' },
        { name: 'Green Tea', description: 'Healthy and soothing green tea.', image: '' },
        { name: 'Blueberry Muffin', description: 'Delicious muffin packed with juicy blueberries.', image: '' },
        { name: 'Chocolate Chip Cookie', description: 'Classic cookie with chocolate chips.', image: '' },
        { name: 'Cinnamon Roll', description: 'Sweet and gooey cinnamon roll.', image: '' },
        { name: 'Apple Pie', description: 'Homemade apple pie with flaky crust.', image: '' },
        { name: 'Cheese Cake', description: 'Creamy cheesecake with a graham cracker crust.', image: '' },
        { name: 'Brownie', description: 'Rich and fudgy brownie.', image: '' },
        { name: 'Mocha', description: 'Decadent mocha made with espresso and chocolate.', image: '' },
        { name: 'Cappuccino', description: 'Smooth cappuccino topped with frothy milk foam.', image: '' },
        { name: 'Hot Chocolate', description: 'Comforting hot chocolate topped with whipped cream.', image: '' },
        { name: 'Iced Tea', description: 'Refreshing iced tea with lemon slices.', image: '' },
        { name: 'Lemonade', description: 'Cool and tangy lemonade.', image: '' },
        { name: 'Orange Juice', description: 'Freshly squeezed orange juice.', image: '' }
    ];
    
    
  return (
    <div className="flex items-center justify-center flex-col h-[500px] bg-white mt-3">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[85%]"
        spaceBetween={35} 
      >
        {products.map((product) => (
          <SwiperSlide key={product.name}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[380px] lg:w-[330px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
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