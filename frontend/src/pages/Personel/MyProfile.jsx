import React, { useState } from 'react'
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


/*
  Employee ifo:
  - Name
  - Surname
  - Email

*/

class Employee {

  constructor(name, surname, email, password, address, role, photo) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.address = address
    this.role = role
    this.photo = photo
  }

  createRandomEmployee() {
    this.name = faker.name.firstName()
    this.surname = faker.name.lastName()
    this.email = faker.internet.email()
    this.password = faker.internet.password()
    this.address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
    this.role = faker.name.jobTitle()
    this.photo = "https://assets-us-01.kc-usercontent.com/b1495851-c47d-0087-29c8-65e1780b1b3b/686e81a5-0a9e-4bfb-9812-c23ac8fca54f/Shutterstock_1296008485%20square.jpg"
  }
}

export const MyProfile = () => {

  const employee = new Employee()
  employee.createRandomEmployee()

  const [isPasswordPopupVisible, setisPasswordPopupVisible] = useState(false)
  const closePopup = () => setisPasswordPopupVisible(false);

  const handleSubmit = (e) => {
    if (window.confirm('Are you sure you want to update your information?')) {
      toast.success('Data updated successfully');
    }
  }

  const [isChangeEmailPopupVisible, setIsChangeEmailPopupVisible] = useState(false)
  const closeEmailPopup = () => setIsChangeEmailPopupVisible(false);

  return (
    <div>

      <Siderbar_1 />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-slate-500 border-dashed rounded-lg dark:border-gray-700">
          <h1 class="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {'Welcome back, ' + employee.name + ' 👋'}
          </h1>
          <div className="border-t border-gray-200 my-4 dark:border-gray-700"></div>

          <div className='flex flex-row ml-10'>

            <div className='flex  mt-10'>

              <div className='min-w-80'>
                <ProfleCard Person={employee} />
              </div>

            </div>

            <div>
              {isPasswordPopupVisible && <>
                <PasswordPopup closePopup={closePopup} />
              </>
              }

            </div>

            <form
              className='min-w-fit w-1/2 mx-auto'
            >

              <div class="mb-6">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={employee.name + ' ' + employee.surname} required
                />
              </div>

              <div class="mb-6">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <textarea type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={employee.address} required
                />
              </div>

              <div class="mb-6 relative">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={employee.email} required
                  readOnly
                   />
                <button onClick={setIsChangeEmailPopupVisible} class="absolute top-0 right-0 mt-8 mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Change Email
                </button>
                {
                  isChangeEmailPopupVisible && <EmailConfirmationPopup  closeEmailPopup={closeEmailPopup} currentEmail={employee.email} />
                }
              </div>

              <div class="mb-6 relative">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={employee.password.replace(/.(?=.{2})/g, '*')}
                  required
                  readOnly
                />
                <button
                  onClick={() => setisPasswordPopupVisible(true)}
                  type='button'
                  className="absolute top-0 right-0 mt-8 mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-orange-700">
                  Change Password
                </button>
              </div>

              <button
                onClick={handleSubmit}
                type="submit" class="w-24 py-2.5 bg-blue-700 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600">Update</button>


            </form>
          </div>

          {/* <Calendar /> */}


        </div>
      </div>

    </div>
  )
}
