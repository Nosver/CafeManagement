import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';

const CouponPopup = ({closePopup}) => {

    const [couponTitle, setCouponTitle] = useState('');

    const [couponDescription, setCouponDescription] = useState('');

    const [couponDiscountRate, setCouponDiscountRate] = useState(0);

    const [couponExpireTime, setCouponExpireTime] = useState(0);

    const showToastSuccess = (message) => {
        toast.success(message);
    };

    const showToastWarning = (message) =>{
        toast.warn(message);
    };

    const submitCoupon = () => {
      if(couponTitle.length != 0 && couponDescription.length != 0 && couponExpireTime != 0 && couponDiscountRate != 0){
        toast.success('You successfully sent coupon!');
        closePopup();
      }
      else{
        toast.warning('Fields cannot be empty !')
      }
    }
    

    return (
      <div>
          <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-end items-center">                
          
            <div class="relative p-4 w-full max-w-md max-h-full">

              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          Send Coupon
                      </h3>
                      <button
                          onClick={closePopup}
                          type="button"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-toggle="crud-modal"
                      >
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
                              <input type="number" onChange={(event) => setCouponExpireTime(event.target.value)} name="expireTime" id="expireTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
                          </div>
                          <div class="col-span-2">
                              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon Description</label>
                              <textarea id="description" onChange={(event) => setCouponDescription(event.target.value)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                          </div>
                      </div>
                      
                      <div className='flex flex-row justify-center'>
                        <Button className='w-2/6' onClick={submitCoupon}>Submit</Button>
                      </div>

                  </form>

              </div>
          </div>
          </div>

      </div>
  )

};

export {CouponPopup};