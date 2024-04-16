import React from 'react'
import { Button } from 'flowbite-react';

export const ItemPopup = ({ title, inputs, closePopup, submitButtonDescription="Add new item" }) => {

    const bg_color = "bg-slate-300"

    return (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
            <div class="relative p-4 w-full max-w-md max-h-full">
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
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
                            {inputs.map(input => (
                                <div class="col-span-2">
                                    <label for={input.id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{input.label}</label>
                                    <input type={input.type} name={input.name} id={input.id} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    defaultValue={input.placeholder} required="" />
                                    </div>
                            ))}
                        </div>
                        <Button type="submit"  >
                            {submitButtonDescription}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}