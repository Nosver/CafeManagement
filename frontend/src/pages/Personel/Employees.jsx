import React from 'react'
import { Siderbar_1 } from '../../components/personel/Siderbar_1'
import { useState } from 'react'
import faker from 'faker';
import { AddItemPopup } from '../../components/personel/AddItemPopup';
import { InsertButton } from '../../components/personel/InsertButton';

class Employee {
  constructor(id, fullName, email, phone, address, city, country, postal_code
    , department, position, salary, start_date, end_date, status) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.postal_code = postal_code;
    this.department = department;
    this.position = position;
    this.salary = salary;
    this.start_date = start_date;
    this.end_date = end_date;
    this.status = status;
  }

  static generateRandomEmployee() {
    let id = faker.random.uuid();
    let fullName = faker.name.findName();
    let email = faker.internet.email();
    let phone = faker.phone.phoneNumber();
    let address = faker.address.streetAddress();
    let city = faker.address.city();
    let country = faker.address.country();
    let postal_code = faker.address.zipCode();
    let department = faker.commerce.department();
    let position = faker.name.jobTitle();
    let salary = faker.finance.amount();
    let start_date = faker.date.past();
    let end_date = faker.date.future();
    let status = faker.random.boolean();

    return new Employee(id, fullName, email, phone, address, city, country, postal_code
      , department, position, salary, start_date, end_date, status);
  }

  static generateRandomEmployees(num) {
    let employees = [];
    for (let i = 0; i < num; i++) {
      employees.push(this.generateRandomEmployee());
    }
    return employees;
  }

}

export const Employees = () => {

  const employeeArray = Employee.generateRandomEmployees(50);

  const [employees, setEmployees] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false)
}

  return (
    <div>

      <Siderbar_1 />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex h-screen overflow-hidden">

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

              <main>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <InsertButton description="Add new Employee" onClick={openPopup} />
                      </th>
                      <th scope="col" class="px-6 py-3">Full Name</th>
                      <th scope="col" class="px-6 py-3">Email</th>
                      <th scope="col" class="px-6 py-3">Phone</th>
                      <th scope="col" class="px-6 py-3">Address</th>
                      <th scope="col" class="px-6 py-3">Position</th>
                      <th scope="col" class="px-6 py-3">Salary</th>
                      <th scope="col" class="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

                    {showPopup &&
                      <AddItemPopup
                        title="Add New Employee"
                        closePopup={closePopup}
                        inputs={[
                          { id: 'id', label: 'Id', type: 'text', placeholder: 'Type employee id'},
                          { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Type employee full name' },
                          { id: 'email', label: 'Email', type: 'text', placeholder: 'Type employee email' },
                          { id: 'phone', label: 'Phone', type: 'text', placeholder: 'Type employee phone' },
                          { id: 'address', label: 'Address', type: 'text', placeholder: 'Type employee address' },
                        ]}
                      />
                    }

                    {employeeArray.map((Employee, index) => (
                      <tr
                        key={index}
                        onClick={() => setSelectedOrder(order)}
                        class={`
                          ${Employee.quantity == 1 ? 'bg-red-400' : Employee.quantity < 5 ? 'bg-red-300' : Employee.quantity < 10 ? 'bg-red-200' : Employee.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                      >
                        <td class="w-4 p-4">
                          <div class="flex items-center">
                            <input id={`checkbox-table-${index}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for={`checkbox-table-${index}`} class="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td class="px-6 py-4">{Employee.fullName.toString()}</td>
                        <td class="px-6 py-4">{Employee.email.toString()}</td>
                        <td class="px-6 py-4">{Employee.phone.toString()}</td>
                        <td class="px-6 py-4">{Employee.address.toString()}</td>
                        <td class="px-6 py-4">{Employee.position.toString()}</td>
                        <td class="px-6 py-4">${Employee.salary.toString()}</td>
                        <td class="px-6 py-4">
                          <div
                            onClick={() => setIsPopupOpen(true)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          >
                            Edit
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>


                </table>
              </main>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}