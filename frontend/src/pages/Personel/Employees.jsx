import React from 'react'
import { Siderbar_1 } from '../../components/personel/Siderbar_1'
import { useState } from 'react'
import faker from 'faker';
import { ItemPopup } from '../../components/personel/ItemPopup';
import { InsertButton } from '../../components/personel/InsertButton';
import { SearchBar } from '../../components/personel/SearchBar';

class Employee {
  constructor(id, fullName, email, phone, address, city, country, postal_code
    , department, position, salary, password, start_date, end_date, status) {
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
    this.password = faker.internet.password();
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
    let password = faker.internet.password();
    let start_date = faker.date.past();
    let end_date = faker.date.future();
    let status = faker.random.boolean();

    return new Employee(id, fullName, email, phone, address, city, country, postal_code
      , department, position, salary, password, start_date, end_date, status);
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

  const [employees, setEmployees] = useState(employeeArray);
  const [employeesShow, setEmployeesShow] = useState(employeeArray);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const [showPopup_edit, setShowPopup_edit] = useState(false);
  const openPopup_edit = () => setShowPopup_edit(true);
  const closePopup_edit = () => setShowPopup_edit(false);

  const searchButtonSubmit = (keyword) => {
    if(keyword == ''){
        if(employeesShow.length != employees.length)
          setEmployeesShow(employees);
        return;
    }
    let newArr = employees.filter( employee => employee.fullName.toLowerCase().includes(keyword.toLowerCase()));   
    setEmployeesShow(newArr);
}


  if (showPopup_edit || showPopup) {
    document.body.classList.add('overflow-hidden')
} else {
    document.body.classList.remove('overflow-hidden')
}


  return (
    <div>

      <Siderbar_1 />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class='flex flex-row w-6/6 mb-3'>
            <SearchBar searchButtonSubmit = {searchButtonSubmit} class='mr-auto'></SearchBar>
            <InsertButton description="Add new Employee" onClick={openPopup} />
          </div>
          <div className="flex h-screen overflow-hidden">
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

              <main>
                <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">Full Name</th>
                      <th scope="col" class="px-6 py-3">Email</th>
                      <th scope="col" class="px-6 py-3">Phone</th>
                      <th scope="col" class="px-6 py-3">Address</th>
                      <th scope="col" class="px-6 py-3">Salary</th>
                      <th scope="col" class="px-6 py-3">Position</th>
                      <th scope="col" class="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

                    {showPopup &&
                      <ItemPopup
                        title="Add New Employee"
                        closePopup={closePopup}
                        inputs={[
                          { id: 'id', label: 'Id', type: 'text', hint: 'Type employee id' },
                          { id: 'fullName', label: 'Full Name', type: 'text', hint: 'Type employee full name' },
                          { id: 'email', label: 'Email', type: 'text', hint: 'Type employee email' },
                          { id: 'phone', label: 'Phone', type: 'text', hint: 'Type employee phone' },
                          { id: 'address', label: 'Address', type: 'text', hint: 'Type employee address' },
                        ]}
                      />
                    }

                    {showPopup_edit &&
                      <ItemPopup
                        title="Edit Employee"
                        submitButtonDescription='Edit Employee'
                        closePopup={closePopup_edit}
                        inputs={[
                          { id: 'id', label: 'Id', type: 'text', placeholder: 'Type employee id' },
                          { id: 'email', label: 'Email', type: 'text', placeholder: 'Type employee email' },
                          { id: 'salary', label: 'salary', type: 'number', placeholder: 'Type employee salary' },
                          { id: 'position', label: 'position', type: 'text', placeholder: 'Type employee position' },

                        ]}
                      />
                    }

                    {employeesShow.map((Employee, index) => (
                      <tr
                        key={index}
                        onClick={() => setSelectedOrder(order)}
                        class={`
                          ${Employee.quantity == 1 ? 'bg-red-400' : Employee.quantity < 5 ? 'bg-red-300' : Employee.quantity < 10 ? 'bg-red-200' : Employee.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                      >
                        <td class="px-6 py-4">{Employee.fullName.toString()}</td>
                        <td class="px-6 py-4">{Employee.email.toString()}</td>
                        <td class="px-6 py-4">{Employee.phone.toString()}</td>
                        <td class="px-6 py-4">{Employee.address.toString()}</td>
                        <td class="px-6 py-4">${Employee.salary.toString()}</td>
                        
                        <td class="px-6 py-4">{Employee.position.toString()}</td>
                        <td class="px-6 py-4">
                          <div
                            onClick={() => setShowPopup_edit(true)}
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