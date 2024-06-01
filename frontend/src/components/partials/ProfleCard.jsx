import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const ProfleCard = ({ id, name, surname, email, password, address, role, photo }) => {

    const [isChangePhotoPopupVisible, setIsChangePhotoPopupVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handlePhotoChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile == null) {
            toast.warn("Please upload a file");
            return;
        }
    
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        try {
            const token = Cookies.get('token');
    
            const response = await fetch('http://localhost:8080/public/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                const publicUrl = result.publicUrl;
    
                const body2 = {
                    id: id,
                    avatar: publicUrl
                };
    
                try {
                    const response2 = await fetch('http://localhost:8080/employee_and_admin/updateAvatar', {
                        method: 'POST',
                        body: JSON.stringify(body2),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
    
                    if (response2.ok) {
                        toast.success("Profile picture updated successfully!");
                        window.location.reload()
                    } else {
                        toast.error("Error updating profile picture");
                        console.error('Update failed:', response2.statusText);
                    }
    
                } catch (error) {
                    toast.error("Error updating profile picture");
                    console.error('Error updating profile picture:', error);
                }
    
            } else {
                console.error('Upload failed:', response.statusText);
                alert('Upload failed: ' + response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
            return null;
        }
    };
    

    const MyProfilePhotoUploadPopup = () => {
        return (
            <div class="flex items-center flex-col justify-center w-60 mt-5">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag</p>

                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onChange={(event)=>handlePhotoChange(event)} accept=".jpg, .jpeg, .png"/>
                </label>
                <button
                    class="inline-flex items-center px-4 mt-5 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleUpload}
                >   
                    save
                </button>
            </div>
        )
    }

    return (
        <div>


            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4">

                </div>

                <div class="flex flex-col items-center mb-5 mt-5">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={photo} alt="Person image" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{role}</span>
                    <div class="flex mt-4 md:mt-6">
                        <button
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => setIsChangePhotoPopupVisible(!isChangePhotoPopupVisible)}
                        >
                            Change photo
                        </button>


                    </div>
                    {isChangePhotoPopupVisible && <MyProfilePhotoUploadPopup />}
                </div>
            </div>

        </div>
    )
}
