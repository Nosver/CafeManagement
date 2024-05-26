import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // import styles
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


const CouponPopup = ({ closePopup }) => {

    const [couponExpireTime, setCouponExpireTime] = useState(null);
    const [couponTitle, setCouponTitle] = useState('');
    const [couponDescription, setCouponDescription] = useState('');
    const [couponDiscountRate, setCouponDiscountRate] = useState(0);

    const sendCouponToAllCustomers = async () => {

        const token = Cookies.get('token')

        const coupon = {
            title: couponTitle,
            description: couponDescription,
            expireDate: couponExpireTime,
            discountPercent: couponDiscountRate
        }

        try {
            const response = await fetch('http://localhost:8080/employee_and_admin/sendCouponToEveryone', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(coupon)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            toast.success("Coupon sent successful");
            closePopup()
        } catch (error) {
            console.log(error.message);
            toast.error("Coupon could not be sent consult your system admin");
        }
    };

    const submitCoupon = () => {
        if (couponTitle.length === 0 || couponDescription.length === 0 || couponDiscountRate < 1 || couponDiscountRate > 99) {
            toast.warning('Discount rate must be between 1 and 99 percent!');
            return;
        }

        if (!couponExpireTime) {
            toast.warning('Please select an expiry date for the coupon!');
            return;
        }

        if (couponExpireTime < new Date()) {
            toast.warning('Expiry date must be in the future!');
            return;
        }

        sendCouponToAllCustomers();
    };



    return (
        <div>
            <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800/50 bg-opacity-75">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Send Coupon</h3>
                            <button onClick={closePopup} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form class="p-4 md:p-5">
                            <div class="grid gap-4 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" onChange={(event) => setCouponTitle(event.target.value)} name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
                                </div>
                                <div class="col-span-2">
                                    <label for="discountRate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Rate</label>
                                    <input type="number" onChange={(event) => setCouponDiscountRate(event.target.value)} name="discountRate" id="discountRate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
                                </div>
                                <div class="col-span-2">
                                    <label for="expireTime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expire Time</label>
                                    <DatePicker // Use DatePicker component
                                        selected={couponExpireTime}
                                        onChange={(date) => setCouponExpireTime(date)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholderText="Select date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                                <div class="col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon Description</label>
                                    <textarea id="description" onChange={(event) => setCouponDescription(event.target.value)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center'>
                                <Button className='w-2/6 bg-blue-700' onClick={submitCoupon}>Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export { CouponPopup };
