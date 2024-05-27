import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// Product card component
export const CartProductItem = ({ cartItem }) => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const [isLoading,setIsLoading]= useState(false);


    const updateCartItem = async (cartItem) => {
        const token = Cookies.get('token')

        console.log("Update cart item: ", cartItem)

        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:8080/customer_only/updateCartItem`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            });
            setIsLoading(false)
           
            if (!response.ok) {
                toast.error("Not enough stock for this product.")
                await sleep(1000)
                window.location.reload();
            }

            window.location.reload();

        } catch (error) {
            console.log(error.message);
        }

    }

    async function removeItem(item) {
        const token = Cookies.get('token')

        console.log("Remove item: ", item)

        const response = await fetch(`http://localhost:8080/customer_only/deleteCartItem/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok) {
            toast.error("An error occurred while removing item from cart")
            return;
        }

        toast.success("Item removed from cart")
        window.location.reload();
    }


    const [selectedSize, setSelectedSize] = useState(cartItem.size);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleSizeChange = (e) => {
        // Change size
        cartItem.size = e.target.value;
        updateCartItem(cartItem);
    }

    const decreaseQuantity = () => {
        // Decrease amount
        if (cartItem.amount > 1) {
            cartItem.amount -= 1;
            updateCartItem(cartItem);
        }

        // If amount is 1, remove item
        else {
            removeItem(cartItem);
        }
    }

    const increaseQuantity = () => {
        // Increase amount
        cartItem.amount += 1;
        updateCartItem(cartItem);
    }

    useEffect(() => {
        let sizeConstant = 1.0;
        if(cartItem.size == 'SMALL')
            sizeConstant = 0.9;
        else if(cartItem.size == 'MEDIUM')
            sizeConstant = 1.0;
        else if(cartItem.size == 'LARGE')
            sizeConstant = 1.1;

        setTotalPrice((cartItem.product.price * cartItem.amount * sizeConstant).toFixed(2));
    }, [cartItem.amount, cartItem.product.price]);

    return (
        <div className="flex flex-row items-center gap-5 py-6  border-b border-gray-200">

            <div className="flex flex-col max-[500px]:items-center gap-3">
                <h6 className="font-semibold text-base leading-7 text-black">{cartItem.product.name}</h6>

                <div>
                    <select label="Select Version" class="w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedSize}
                        onChange={handleSizeChange}
                    >

                        <option value="SMALL" {...(cartItem.size === 'SMALL' && { selected: true })}>Small</option>
                        <option value="MEDIUM" {...(cartItem.size === 'MEDIUM' && { selected: true })}>Medium</option>
                        <option value="LARGE" {...(cartItem.size === 'LARGE' && { selected: true })}>Large</option>

                    </select>
                </div>

                <h6 className="font-semibold text-base leading-7 text-indigo-600">{totalPrice / cartItem.amount}₺</h6>
            </div>

            <div className="flex items-center justify-center w-full">
                <div className="items-center justify-center max-w-[100px]">
                    <img src={cartItem.product.imagePath} alt={cartItem.product.name} />
                </div>
            </div>

            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                <div class="flex items-center h-full">
                    <button
                        onClick={decreaseQuantity} className="group rounded-l-full px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                        {cartItem.amount === 1 ? (
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
                        placeholder={cartItem.amount} />
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
                <p className="font-bold text-lg leading-8 text-indigo-600 text-center">{totalPrice}₺</p>
            </div>
        </div>
    );
};