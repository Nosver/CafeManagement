import React, { useState } from 'react';

export const OrderEditPopup = ({ selectedOrder, closePopup }) => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center bg-gray-800/50 z-50">
        {console.log(selectedOrder)}

            <div className="bg-white rounded-lg p-4 w-4/6 h-6/6 overflow-y-auto">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order Details
                    </h3>
                    <button
                        onClick={closePopup}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="crud-modal"
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className='flex flex-col items-center justify-center mt-2 mb-4 border-b dark:border-gray-600'>
                    <div className='flex flex-row w-4/6 my-3 items-center justify-center'>
                        <h3 className='text-black flex flex-row justify-center w-4/12'>Product Name</h3>
                        <h3 className='text-black flex flex-row justify-center w-4/12'>Product Amount</h3>
                        <h3 className='text-black flex flex-row justify-center w-4/12'>Product Size</h3>

                    </div>
                    {
                        selectedOrder.cartItems.map((item, index) => (
                            <div key={index} className='flex flex-row w-4/6 my-3 items-center justify-center'>
                                <div className='flex flex-row justify-center w-4/12'>{item.product.name}</div>
                                <div className='flex flex-row justify-center w-4/12'>{item.amount}</div>
                                <div className='flex flex-row justify-center w-4/12'>{item.size}</div>

                            </div>
                        ))
                        
                    }
                </div>

                <div className='flex flex-row w-6/6 items-center justify-center'>
                    <div className='flex flex-row w-4/6 items-center justify-between'>
                        <h3 className='text-black'>Total Price: {selectedOrder.totalPrice}₺</h3>
                        <h3 className='text-black'>Order Status: {selectedOrder.status}</h3>
                    </div>
                </div>



            </div>
        </div>
    );
};
