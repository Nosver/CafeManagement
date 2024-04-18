import React from 'react'
import { Siderbar_1 } from '../../components/personel/Siderbar_1'
import { Calendar } from '../../components/partials/Calendar'
import { Alert } from '../../components/partials/Alert'
import { toast } from 'react-toastify'
import faker from 'faker'
/*
  Employee ifo:
  - Name
  - Surname
  - Email

*/

class Employee {
  constructor(name, surname, email, password, address, phone, role, department, salary, date_of_birth, date_of_employment, date_of_dismissal, is_active, is_deleted, created_at, updated_at) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.address = address
  }

  createRandomEmployee() {
    this.name = faker.name.firstName()
    this.surname = faker.name.lastName()
    this.email = faker.internet.email()
    this.password = faker.internet.password()
   this.address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
  }
}


export const MyProfile = () => {

  const employee = new Employee()
  employee.createRandomEmployee()

  return (
    <div>

      <Siderbar_1 />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-slate-500 border-dashed rounded-lg dark:border-gray-700">
          <h1 class="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
          {'Welcome back, ' + employee.name + ' 👋'}
          </h1>
          <div className="border-t border-gray-200 my-4 dark:border-gray-700"></div>


          <form>

            <div class="mb-6">
              <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={employee.name + ' ' + employee.surname} required
                readOnly />
            </div>

            <div class="mb-6">
              <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={employee.address} required
                />
            </div>

            <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={employee.email} required
                readOnly />
            </div>

            <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={employee.password.replace(/.(?=.{2})/g, '*')}
                required
                readOnly
              />
            </div>

            <button type="submit" class="w-24 py-2.5 bg-blue-700 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600">Update</button>

          </form>


          <div className="border-t border-gray-200 my-4 dark:border-gray-700"></div>
          <Calendar />


        </div>
      </div>

    </div>
  )
}
