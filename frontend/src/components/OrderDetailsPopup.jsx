import React from 'react'
import OrderDetailsItem from './OrderDetailsItem'

export const OrderDetailsPopup = ({orderItems, closePopup}) => {

    const bg_color = "bg-slate-300"

    const handleRenderItems = () => {
        console.log(orderItems)
      };
    

    return (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center">
            <div class="relative p-4 w-full max-w-md max-h-full">
            <div className={`relative ${bg_color} rounded-lg shadow dark:bg-gray-700`}>
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Order Details
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

                    <div className='flex flex-col items-center justify-center'>
                        {handleRenderItems()}
                    </div>                   

                
                </div>
            </div>
        </div>
    )
}