import React, { useEffect, useState } from 'react'
import { Siderbar_1 } from '../../components/personel/Siderbar_1'
import { Calendar } from '../../components/partials/Calendar'
import { Alert } from '../../components/partials/Alert'
import { toast } from 'react-toastify'
import faker from 'faker'
import { ItemPopup } from '../../components/personel/ItemPopup'
import { ProfleCard } from '../../components/partials/ProfleCard'
import { ToastToggle } from 'flowbite-react'
import { PasswordPopup } from '../../components/partials/PasswordPopup'
import { EmailConfirmationPopup } from '../../components/partials/EmailConfirmationPopup'
import Cookies from 'js-cookie'


export const MyProfile = () => {

  const token = Cookies.get('token');

  const [id, setId] = useState(-1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [salary, setSalary] = useState('')
  const [position, setPosition] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')
  const [photo, setPhoto] = useState('')

  const [showName, setShowName] = useState('')

  const updateEmployee = async () => {


    const token = Cookies.get('token');

    if (!token) {
      setMessage('No token found. Please login.');
      return;
    }

    const employeeData = {
      id: id,
      fullName: name,
      email: email,
      password: password,
      phoneNumber: phone || null,
      salary: salary || null,
      position: position ? position.toUpperCase() : null,
      address: address,
      role: role
    };


    try {
      const response = await fetch('http://localhost:8080/employee_and_admin/updateEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employeeData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('Success:', result);

    } catch (error) {
      console.log('Error:', error);
    }

    window.location.reload();
  }

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
      setPassword(result.password);
      setAddress(result.address);
      setRole(result.role);
      setPhoto(result.photo);
      setPhone(result.phoneNumber);
      setSalary(result.salary);
      setPosition(result.position);

      setShowName(result.fullName);

    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    whoAmI()
  }, []);

  const [isPasswordPopupVisible, setisPasswordPopupVisible] = useState(false)
  const closePopup = () => setisPasswordPopupVisible(false);

  const handleUpdateButton = () => {
    if (window.confirm('Are you sure you want to update your information?')) {
      try {
        updateEmployee()
        toast.success('Data updated successfully');
      } catch (error) {
        toast.error('Error updating data');
      }
    }
  }

  const [isChangeEmailPopupVisible, setIsChangeEmailPopupVisible] = useState(false)
  const closeEmailPopup = () => setIsChangeEmailPopupVisible(false);

  return (
    <div>

      <Siderbar_1 />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-slate-500 border-dashed rounded-lg dark:border-gray-700">
          <h1 class="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {'Welcome back, ' + showName + ' 👋'}
          </h1>
          <div className="border-t border-gray-200 my-4 dark:border-gray-700"></div>

          <div className='flex flex-row ml-10'>

            <div className='flex  mt-10'>

              <div className='min-w-80'>
                <ProfleCard
                  id={id}
                  name={showName}
                  email={email}
                  password={password}
                  address={address}
                  role={role}
                  photo={photo}
                />
              </div>

            </div>

            <div>
              {isPasswordPopupVisible && <>
                <PasswordPopup closePopup={closePopup} />
              </>
              }

            </div>

            <div
              className='min-w-fit w-1/2 mx-auto'
            >

              <div class="mb-6">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={showName} required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class="mb-6">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <textarea type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={address} required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div class="mb-6 relative">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={email} required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  disabled
                  title="Disabled"
                  onClick={setIsChangeEmailPopupVisible}
                  class="absolute top-0 right-0 mt-8 mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Change Email
                </button>
                {
                  isChangeEmailPopupVisible && <EmailConfirmationPopup closeEmailPopup={closeEmailPopup} currentEmail={email} />
                }
              </div>

              <div class="mb-6 relative">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={"*********"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  disabled
                  onClick={() => setisPasswordPopupVisible(true)}
                  type='button'
                  className="absolute top-0 right-0 mt-8 mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-orange-700">
                  Change Password
                </button>
              </div>

              <button
                onClick={handleUpdateButton}
                type="submit" class="w-24 py-2.5 bg-blue-700 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600">
                Update</button>
            </div>
          </div>

          {/* <Calendar /> */}


        </div>
      </div>

    </div>
  )
}
