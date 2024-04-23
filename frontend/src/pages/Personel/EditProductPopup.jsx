import React from 'react';
import { RequiredStockInput } from '../../components/personel/RequiredStockInput';

export const EditProductPopup = ({ closePopup, selectedProduct }) => {
    return (
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800/50">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit Product
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

                    <form className="p-4 md:p-5 ">
                        <div className="grid gap-4 mb-4 grid-cols-2 w-96">
                            <div className="col-span-2" >


                                <label className="  block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type='text'
                                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                    placeholder='Type product name'
                                />
                                <label className=" mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Price
                                </label>
                                <input
                                    min='0'
                                    type='number'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder='Enter a price'
                                    required
                                />
                                <label className=" mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Category
                                </label>
                                <input
                                    type='select'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                    placeholder='Select category'
                                />


                                <RequiredStockInput selectedProduct={selectedProduct} />


                                <label className=" mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Image
                                </label>
                                <div className="flex items-center justify-center w-full">

                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                                            <svg className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-2xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" accept=".jpg, .jpeg, .png, .gif" />
                                    </label>
                                </div>

                                <label className=" mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Product Description
                                </label>

                                <textarea className='w-96'></textarea>


                            </div>

                        </div>
                        <div className='flex flex-row gap-4'>
                            <button
                                onClick={() => onSubmitFunction()}
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Update Product
                            </button>


                            {/*<button
                                type="submit"
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Delete Product
    </button>*/}

                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
