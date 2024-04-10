import React from 'react'
import { CartProductItem } from '../../components/CartProductItem'
import { useState } from 'react';
import { useEffect } from 'react';

export const CartPage = () => {

    

     const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Mocha',
            size: 'Small',
            quantity: 2,
            price: 90.00,
            image: "https://cdn.dsmcdn.com/mrktng/seo/22ekim6/evde-mocha-yapimi-1.jpg",
            sizes: {} // Initialize sizes property with an empty object

        },
        {
            id: 2,
            name: 'Ice Americano',
            size: 'Medium',
            quantity: 1,
            price: 120.00,
            image: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg",
            
            sizes: {} // Initialize sizes property with an empty object

        },
        {
            id: 3,
            name: 'Turkish coffe',
            size: 'Large',
            quantity: 2,
            price: 80.00,
            image: 'https://www.hazerbaba.com/1219-home_default/turkish-coffee-.jpg',
            
            sizes: {} // Initialize sizes property with an empty object
        }
    ]);

    const sizeModifiers = {
        small: 0.9,  // Decrease price by 10%
        large: 1.1   // Increase price by 10%
    };

    useEffect(() => {
        const updatedProductsArray = products.map(product => ({
            ...product,
            sizes: {
                Small: (product.price * sizeModifiers.small).toFixed(2),
                Medium: (product.price).toFixed(2),
                Large: (product.price * sizeModifiers.large).toFixed(2)
            }
        }));
        setProducts(updatedProductsArray);
        console.log(updatedProductsArray);
    }, []); // Include sizeModifiers and products in the dependencies array
    
    

    

   
    
    


    const totalPrice = products.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0).toFixed(2);

    const handleCheckoutClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        createOrder(); // Call the createOrder function
    };

    const createOrder = async () => {
        try {
            const order = {
                id: 999, //Change here!!
                totalPrice: parseFloat(totalPrice) //Change here!!
            };
    
            const response = await fetch('http://localhost:8080/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order) // Send order data as JSON in the request body
            });
            if (response.ok) {
                const responseData = await response.json(); 
                const paymentUrl = responseData.payment_url; 
                console.log('Payment URL:', paymentUrl);
                // Redirect the user to the payment URL
                window.location.href = paymentUrl;
            } else {
                console.error('Failed to create order');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    

    
    const handleDecreaseQuantity = (product) => {
        const updatedProducts = products.map(p => {
            if (p.id === product.id) {
                if (p.quantity > 1) {
                    //api put call
                    return { ...p, quantity: p.quantity - 1 };
                } else {
                    //api delete call
                    return null; // Remove the product if the quantity is 1
                }
            }
            return p;
        }).filter(Boolean); // Filter out null values (removed products)
        setProducts(updatedProducts);
    };
    

    const handleIncreaseQuantity = (product) => {
        const updatedProducts = products.map(p => {
            if (p.id === product.id) {

                //api put call
                return { ...p, quantity: p.quantity + 1 };
            }
            return p;
        });
        setProducts(updatedProducts);
    };


    return (<section
        class=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
            <div class="grid grid-cols-12">
                <div
                    class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                    <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                        <h2 class="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                        <h2 class="font-manrope font-bold text-3xl leading-10 text-black">{products.length} Item(s)</h2>
                    </div>{
                        products.length>0 ? <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                        <div class="col-span-12 md:col-span-7">
                            <p class="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                        </div>
                        <div class="col-span-12 md:col-span-5">
                            <div class="grid grid-cols-5">
                                <div class="col-span-3">
                                    <p class="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                                </div>
                                <div class="col-span-2">
                                    <p class="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                </div>
                            </div>
                        </div>
                    </div>: <p class="font-normal text-lg leading-8 text-gray-400 mt-5">No items in the cart</p>
                    }
                    



                    <div>
                    {products.map(product => (
                <CartProductItem
                    key={product.id}
                    product={product}
                    onDecreaseQuantity={() => handleDecreaseQuantity(product)}
                    onIncreaseQuantity={() => handleIncreaseQuantity(product)}


                />
            ))}
                    </div>


                   
                </div>
                <div
                    class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                    <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                        Order Summary</h2>
                    <div class="mt-8">
                        <div class="flex items-center justify-between pb-6">
                            <p class="font-normal text-lg leading-8 text-black">{products.length} Item(s)</p>
                            <p class="font-medium text-lg leading-8 text-black">{totalPrice}₺</p>
                        </div>
                        <p>{
                            products.map(product => (
                                <span key={product.id}>
                                  {product.name} x{product.quantity}<br />
                                </span>
                              ))
                            
                            }
                        </p>
                        <br></br>
                        <form>
                           
                            
                            <label class="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo Code
                            </label>
                            <div class="flex pb-4 w-full">
                                <div class="relative w-full ">
                                    <div class=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">

                                    </div>
                                    <input type="text"
                                        class="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                                        placeholder="xxxx xxxx xxxx" />
                                    <button id="dropdown-button" data-target="dropdown"
                                        class="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                                        type="button"><svg class="ml-2 my-auto" width="12" height="7" viewBox="0 0 12 7"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                                stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <div id="dropdown"
                                        class="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">

                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center border-b border-gray-200">
                                <button
                                    class="rounded-full w-full bg-black py-3 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">Apply</button>
                            </div>
                            <div class="flex items-center justify-between py-8">
                                <p class="font-medium text-xl leading-8 text-black">{products.length} Item(s)</p>
                                <p class="font-semibold text-xl leading-8 text-green-700">{totalPrice}₺</p>
                            </div>
                            <button
                                class="w-full text-center bg-green-700 rounded-full py-4 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-green-900" onClick={handleCheckoutClick}>Checkout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
