import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { PasswordPopup } from '../../components/partials/PasswordPopup';
import { PasswordPopupCustomer } from '../../components/partials/PasswordPopupCustomer';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';


const CustomerProfile2 = () => {
    const token = Cookies.get('token');
    const [isChangePhotoPopupVisible, setIsChangePhotoPopupVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [openPasswordPopup,setOpenPasswordPopup] = useState(false);

    const closePopup = ()=>{
        setOpenPasswordPopup(false);
    }

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
                    const response2 = await fetch('http://localhost:8080/customer_only/updateAvatar', {
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

    const [id,setId]= useState();
    const [name,setName]= useState();
    const [email,setEmail]= useState();
    const [photo,setPhoto]= useState();
    const [phone,setPhone]= useState();
    const [provider,setProvider] =useState("");
    const [validPhone, setValidPhone] = useState(true);

    
    const whoAmI = async () => {
        try {
          const response = await fetch('http://localhost:8080/public/whoami', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`

            }
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const result = await response.json();
    
          setId(result.id);
          setName(result.fullName);
          setEmail(result.email);
          setPhoto(result.avatar);
          setPhone(result.phoneNumber);
          setProvider(result.provider);
    
        } catch (error) {
          console.log('Error:', error);
        }
      }

    useEffect(() => {
    
        whoAmI()
     
    }, [])

    const handleChange = (value) => {
        setPhone(value);
        setValidPhone(validatePhoneNumber(value));
      };
    
      const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    
        return phoneNumberPattern.test(phoneNumber);
      };

      const changeFullName =  (event) => {
        setName(event.target.value)
      }
      const changeEmail = (event) => {
        setEmail(event.target.value)
      }

      const setPasswordPopupState = () =>{

        if(provider == 'GOOGLE'){
            toast.error("Can not change password if signed with google")
            return;
        }
        setOpenPasswordPopup(true)
      }

      const updateUserInfo = async () => {

        const body={
            id:id,
            fullName:name,
            email:email,
            phoneNumber: phone,
        }

        console.log(body)
        
        
        try {
            const response = await fetch('http://localhost:8080/customer_only/updateUserProfile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
  
              },
              body: JSON.stringify(body)
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const result = await response.json();
            toast.success("profile info updated successfully")

            setName(result.fullName);
            setEmail(result.email);
            setPhone(result.phoneNumber);
            
      
          } catch (error) {
            console.log('Error:', error);
          }
    

      }
      
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
        <div class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">

            <main class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 grid justify-items-center">
                <div class="p-2 md:p-4 ">
                    <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg ">

                        <div class="grid max-w-2xl mx-auto mt-8 ">
                            <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                                <img class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src={photo}
                                    alt="Bordered avatar" />

                                <div class="flex flex-col space-y-5 sm:ml-8">
                                    <button type="button"
                                        onClick={() => setIsChangePhotoPopupVisible(!isChangePhotoPopupVisible)}

                                        class="py-3.5 px-7 text-base font-medium text-white rounded-lg bg-yellow-700 focus:to-black hover:bg-custom-light-orange">
                                        Change picture
                                    </button>

                                    {isChangePhotoPopupVisible && <MyProfilePhotoUploadPopup />}


                                </div>
                            </div>

                            <div class="items-center mt-8 sm:mt-14 text-[#202142]">

                                <div
                                    class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div class="w-full">
                                        <label for="first_name"
                                            class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                            Full name</label>
                                        <input type="text" id="first_name"
                                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                            placeholder="Your first name" value={name} onChange={(event)=> changeFullName(event)} required />
                                    </div>



                                </div>

                                {provider == 'LOCAL' && <div class="mb-2 sm:mb-6">
                                    <label for="email"
                                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        email</label>
                                    <input type="email" id="email"
                                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                        placeholder={email} onChange={(event)=> changeEmail(event)} required />
                                </div>}


                                <div class="mb-2 sm:mb-6">
                                    <label
                                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        phone</label>
                                    <PhoneInput
                                        value={phone}
                                        onChange={handleChange}

                                        inputStyle={{ width: '100%' }}
                                    />

                                </div>
                                <div className='flex flex-row justify-between'>
                                    {provider == 'LOCAL' && <div class="flex justify-start">
                                        <button type="submit" onClick={()=>setPasswordPopupState()}
                                            class="text-white bg-yellow-700  hover:bg-custom-brown focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Change Password</button>
                                    </div>}

                                    <div class="flex justify-end">
                                        <button type="submit" onClick={updateUserInfo}
                                            class="text-white bg-yellow-700  hover:bg-custom-brown focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Update</button>
                                    </div>
                                </div>

                                {openPasswordPopup && <PasswordPopupCustomer  closePopup={closePopup}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CustomerProfile2
