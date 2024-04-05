import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


// Product card component
export const CartProductItem = ({ product, onDecreaseQuantity, onIncreaseQuantity  }) => {

    const[selectedSize,setSelectedSize] = useState(product.size);
    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const decreaseQuantity = () => {
        if (product.quantity >= 1) {
            onDecreaseQuantity(product);
        }
    }

    const increaseQuantity = () => {
        onIncreaseQuantity(product);
    }   

    

    return (
        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200">
            <div className="w-full md:max-w-[126px]">
                <img src={product.image} alt={product.name} className="mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">{product.name}</h6>

                        <div className="w-72">
                            <select label="Select Version" class="w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             value={selectedSize}
                             onChange={handleSizeChange}
                              >

                                <option value="Small" {...(product.size === 'Small' && { selected: true })}>Small</option>
                                <option value="Medium" {...(product.size === 'Medium' && { selected: true })}>Medium</option>
                                <option value="Large" {...(product.size === 'Large' && { selected: true })}>Large</option>

                            </select>
                        </div>

                        <h6 className="font-semibold text-base leading-7 text-indigo-600">{product.sizes[selectedSize]}₺</h6>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div class="flex items-center h-full">
                        <button onClick={decreaseQuantity} className="group rounded-l-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            {product.quantity === 1 ? (
                                <FontAwesomeIcon icon={faTrashAlt} className="stroke-gray-900 text-lg transition-all duration-500 group-hover:stroke-black" />
                            ) : (
                                <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>


                        <input type="text"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                            placeholder={product.quantity} />
                        <button onClick={increaseQuantity}
                            class="group rounded-r-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                viewBox="0 0 22 22" fill="none">
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                    stroke-width="1.6" stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                    stroke-width="1.6" stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-indigo-600 text-center">{(product.sizes[selectedSize] * product.quantity).toFixed(2)}₺</p>
                </div>
            </div>
        </div>
    );
};