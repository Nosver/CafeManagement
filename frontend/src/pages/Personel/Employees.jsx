import React, { useEffect } from 'react'
import { Siderbar_1 } from '../../components/personel/Siderbar_1'
import { useState } from 'react'
import faker from 'faker';
import { ItemPopup } from '../../components/personel/ItemPopup';
import { InsertButton } from '../../components/personel/InsertButton';
import { SearchBar } from '../../components/personel/SearchBar';
import Cookies from 'js-cookie';
import UnauthorizedPage from '../UnauthorizedPage';
import { CreateEmployeePopup } from '../../components/personel/CreateEmployeePopup';
import UpdateEmployeePopup from '../../components/personel/UpdateEmployeePopup';

class Employee {
  constructor(id, fullName, email, phone, address,
    position, salary, start_date, status, lastLogin) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.position = position;
    this.salary = salary;
    this.password = faker.internet.password();
    this.start_date = start_date;
    this.status = status;
    this.lastLogin = lastLogin;
  }
}

export const Employees = () => {  
  const [isLoading, setIsLoading] = useState(false);

  const ROLE = Cookies.get('role');

  if (ROLE !== "ADMIN") {
    return (
      <div>
        <UnauthorizedPage />
      </div>
    );
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = Cookies.get('token');

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:8080/admin_only/getAllEmployees', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setIsLoading(false)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const employeeArray = data.map(employee =>
          new Employee(employee.id, employee.fullName, employee.email, employee.phoneNumber, employee.address,
            employee.position, employee.salary, employee.createdAt, employee.status, employee.lastLogin)
        );

        setEmployees(employeeArray);
        setEmployeesShow(employeeArray);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchEmployees();
  }, []);



  const [employees, setEmployees] = useState([]);
  const [employeesShow, setEmployeesShow] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const [showPopup_edit, setShowPopup_edit] = useState({show: false, employee: null});
  const openPopup_edit = (employee) => setShowPopup_edit({ show: true, employee});
  const closePopup_edit = () => setShowPopup_edit({ show: false, stock: null });

  const searchButtonSubmit = (keyword) => {
    if (keyword == '') {
      if (employeesShow.length != employees.length)
        setEmployeesShow(employees);
      return;
    }
    let newArr = employees.filter(employee => employee.fullName.toLowerCase().includes(keyword.toLowerCase()));
    setEmployeesShow(newArr);
  }


  if (showPopup_edit || showPopup) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }

  const handleEditEmployee = (employee) => {
    console.log(employee);
  }

  return (
    <div>
      <Siderbar_1 />
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class='flex flex-row w-6/6 mb-3'>
            <SearchBar searchButtonSubmit={searchButtonSubmit} class='mr-auto'></SearchBar>
            <InsertButton description="Add new Employee" onClick={openPopup} />
          </div>
          <div className="flex h-screen overflow-hidden">
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

              <main>
                <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" class="px-6 py-3">Id</th>
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
                      <CreateEmployeePopup
                        closePopup={closePopup}
                      />
                    }

                    {showPopup_edit.show && showPopup_edit.employee &&
                      <UpdateEmployeePopup closePopup={() =>  setShowPopup_edit({show:false, employee:null})} employee={showPopup_edit.employee}/>
                    }

                    {employeesShow.map((Employee, index) => (
                      <tr
                        key={index}
                        onClick={() => setSelectedOrder(order)}
                        class={`
                          ${Employee.quantity == 1 ? 'bg-red-400' : Employee.quantity < 5 ? 'bg-red-300' : Employee.quantity < 10 ? 'bg-red-200' : Employee.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                      >
                        <td class="px-6 py-4">{Employee.id || ""}</td>
                        <td class="px-6 py-4">{Employee.fullName || ""}</td>
                        <td class="px-6 py-4">{Employee.email || ""}</td>
                        <td class="px-6 py-4">{Employee.phone || ""}</td>
                        <td class="px-6 py-4">{Employee.address || ""}</td>
                        <td class="px-6 py-4">{Employee.salary || ""} ₺</td>
                        <td class="px-6 py-4">{Employee.position || ""}</td>
                        <td class="px-6 py-4">
                          <div
                            onClick={() => openPopup_edit(Employee)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          >
                            Edit
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>


                </table>
                {isLoading && (
                                    <div className="flex items-center justify-center ">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                        )}
              </main>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}