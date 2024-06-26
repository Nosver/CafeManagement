import React from 'react'
import { CartProductItem } from '../../components/Customer/CartProductItem'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import UnauthorizedPage from '../UnauthorizedPage';

export const CartPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [appliedCoupon, setAppliedCoupon] = useState(0.0);

    console.log(cart)

    const handleCouponClick = (coupon) => async (event) => {

        event.preventDefault(); // Prevent default form submission behavior
        if (cart.totalPrice == 0) {
            return toast.error("No items in the cart")
        }

        if (cart.discountPercent != 0 && cart.discountPercent != null) {
            return toast.error("You have already applied a coupon")
        }

        if (coupon.discountPercent == 0 || coupon.discountPercent == null || coupon.discountPercent >= 100) {
            return toast.error("Coupon is not valid")
        }


        console.log("Applied Coupon", coupon.id)

        try {

            const token = Cookies.get('token')

            const response = await fetch('http://localhost:8080/customer_only/expendCoupon/' + coupon.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                toast.error("Failed to apply coupon")
                return;
            }

            // set coupon to total price
            setAppliedCoupon(coupon.discountPercent / 100);

            window.location.reload();

        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    if (Cookies.get("role") != "CUSTOMER" || Cookies.get("role") === undefined) {

        return <UnauthorizedPage />
    }
    else {

        const fetchCart = async () => {

            const token = Cookies.get('token')

            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:8080/customer_only/getActiveCartByToken`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setIsLoading(false)
                const data = await response.json();

                setCart(data);

                console.log("-----> Your Cart: ", data)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        const gradientColors = [
            "from-purple-800 via-pink-700 to-red-600",
            "from-blue-600 to-green-600",
            "from-red-500 to-yellow-500",
            "from-green-400 to-blue-500",
            "from-pink-500 to-purple-600",
            "from-yellow-400 to-orange-500",
            "from-red-500 to-pink-500",
            "from-purple-400 to-blue-500",
            "from-yellow-600 to-green-500",
            "from-orange-400 to-red-500"
        ];

        const fetchCoupons = async () => {

            const token = Cookies.get('token')

            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:8080/customer_only/getMyCoupons`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setIsLoading(false)
                const data = await response.json();

                setCoupons(data);

                console.log("Your Coupons", data)

                if (!response.ok) {
                    toast.error("Failed to get coupons")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        const sizeModifiers = {
            small: 0.9,  // Decrease price by 10%
            large: 1.1   // Increase price by 10%
        };

        useEffect(() => {

            fetchCart();
            fetchCoupons();
            // console.log(updatedProductsArray);
        }, []); // Include sizeModifiers and products in the dependencies array



        const handleCheckoutClick = (event) => {
            event.preventDefault(); // Prevent default form submission behavior
            if (cart.totalPrice > 0)
                createOrder(); // Call the createOrder function
            else
                toast.warn("No items in the cart")
        };

        const createOrder = async () => {

            try {

                const token = Cookies.get('token')

                const cartData = {
                    id: cart.id,
                    totalPrice: cart.totalPrice,
                    cartItems: cart.cartItems.map(item => ({
                        product: {
                            id: item.product.id,
                            predictedStock: item.product.predictedStock
                        },
                        amount: item.amount
                    }))
                };

                const response = await fetch('http://localhost:8080/customer_only/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,

                    },
                    body: JSON.stringify(cartData)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    const paymentUrl = responseData.payment_url;
                    console.log('Payment URL:', paymentUrl);
                    // Redirect the user to the payment URL
                    window.location.href = paymentUrl;
                } else if (response.status === 400) {
                    toast.error("Not enough stock")
                    console.error('Failed to create order');
                }
            } catch (error) {
                console.error('Error creating order:', error);
            }
        };


        return (<section
            class=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div class="grid grid-cols-12">
                    <div
                        class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                            <h2 class="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                            {cart && cart.cartItems ? <h2 class="font-manrope font-bold text-3xl leading-10 text-black">{cart.cartItems.length} Item(s)</h2> :
                                <h2 class="font-manrope font-bold text-3xl leading-10 text-black">0 Item(s)</h2>}
                        </div>
                        {cart && cart.cartItems ?
                            cart.cartItems.length > 0 ? <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
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
                            </div> : <p class="font-normal text-lg leading-8 text-gray-400 mt-5">No items in the cart</p>
                            : <p class="font-normal text-lg leading-8 text-gray-400 mt-5">No items in the cart</p>
                        }
                        {isLoading && (
                            <div className="flex items-center justify-center">
                                <svg
                                    aria-hidden="true"
                                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}



                        <div>
                            {cart && cart.cartItems ? cart.cartItems.map(item => (
                                <CartProductItem
                                    key={item.id}
                                    cartItem={item}
                                    totalPriceData={item.totalPrice}

                                />
                            )) : <p> No items in the cart</p>
                            }
                        </div>



                    </div>
                    <div
                        class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                        <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            Order Summary</h2>
                        <div class="mt-8">
                            <div class="flex items-center justify-between pb-6">
                                {cart && cart.cartItems ? <p class="font-normal text-lg leading-8 text-black">{cart.cartItems.length} Item(s)</p> : <p class="font-normal text-lg leading-8 text-black">0 Item(s)</p>}
                                <p class="font-medium text-lg leading-8 text-black">{cart.totalPrice && cart.totalPrice.toFixed(2)}₺</p>
                            </div>
                            <p>{
                                cart && cart.cartItems ? cart.cartItems.map(item => (
                                    <span key={item.id}>
                                        {item.product.name} x{item.amount}<br />
                                    </span>
                                ))
                                    : <p> No items in the cart</p>

                            }
                            </p>
                            <br></br>
                            <form>


                                <div>
                                    <h2 className="mb-4 font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">Your Coupons</h2>
                                    {coupons && coupons.length > 0 ? (
    <div className="h-80 overflow-y-auto">
        {coupons.map(coupon => (
            <div className="mb-4 bg-gradient-to-r from-purple-800 via-pink-700 to-red-600 p-5 rounded shadow-lg text-white">
                <div className="flex items-center justify-between pb-6 border-b-2 border-white">
                    <p className="font-bold text-xl leading-8">{coupon.title}</p>
                    <p className="font-medium text-lg leading-8">{coupon.expireDate}</p>
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-green-600 rounded shadow-lg">
                        <p className="font-bold text-2xl leading-9 text-white">{coupon.discountPercent}%</p>
                    </div>
                </div>
                <div>
                    <p className="font-medium text-lg leading-8">{coupon.description}</p>
                    <div className="text-right">
                        <button onClick={handleCouponClick(coupon)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
) : (
    <div className="h-80 overflow-y-auto">
        <p>No coupons available.</p>
    </div>
)}

                                </div>
                                <div class="flex items-center justify-between py-8 bg-blue-50 rounded-lg shadow-lg p-6 m-4">
                                    {cart && cart.cartItems ?
                                        <p class="font-medium text-xl leading-8 text-black">{cart.cartItems.length} Item(s)</p>
                                        :
                                        <p class="font-medium text-xl leading-8 text-black">0 Item(s)</p>
                                    }
                                    <p class="font-semibold text-xl leading-8 text-green-700">{cart.totalPrice && cart.totalPrice.toFixed(2)}₺</p>
                                    {cart && cart.discountPercent ?
                                        <p class="font-medium text-xl leading-8 text-red-600"> -{cart.discountPercent}%</p>
                                        :
                                        <p class="font-medium text-xl leading-8 text-red-600"> </p>
                                    }
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
}
