import React, { useState } from 'react'

export const ProfleCard = ({ id, name, surname, email, password, address, role, photo }) => {

    const [isChangePhotoPopupVisible, setIsChangePhotoPopupVisible] = useState(false);

    const handlePhotoChange = () => {

    }

    const MyProfilePhotoUploadPopup = () => {
        return (
            <div class="flex items-center justify-center w-60 mt-5">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag</p>
                        
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onClick={handlePhotoChange} />
                </label>
            </div>
        )
    }

    return (
        <div>


            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4">
                    
                </div>
                
                <div class="flex flex-col items-center pb-10 mt-5">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={photo} alt="Person image" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{role}</span>
                    <div class="flex mt-4 md:mt-6">
                        <a
                            href="#"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => setIsChangePhotoPopupVisible(true)}
                        >
                            Change photo
                        </a>
                        

                    </div>
                    {isChangePhotoPopupVisible && <MyProfilePhotoUploadPopup />}
                </div>
            </div>

        </div>
    )
}
