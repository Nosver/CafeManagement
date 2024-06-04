import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';

const StyledSelect = styled.select`
  appearance: none; 
  borders: none;
`;
export const CreateEmployeePopup = ({ closePopup }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(true);
    const [salary, setSalary] = useState('');
    const [position, setPosition] = useState('CASHIER');
    const [address, setAddress] = useState('');


    const addEmployee = async (event) => {
        
        const token = Cookies.get('token');
        
        if (!token) {
          setMessage('No token found. Please login.');
          return;
        }
    
        const employeeData = {
          fullName: name,
          email: email,
          password:password,
          phoneNumber:phone,
          salary: salary,
          position: position.toUpperCase(),
          address: address,
          role: "EMPLOYEE"
        };
    
        try {
          const response = await fetch('http://localhost:8080/admin_only/registerAdminAndEmployee', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' ,
          
            },
            body: JSON.stringify(employeeData)
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log('Success:', result);
        } catch (error) {
            event.preventDefault();
          console.error('Error:', error);
        }
    }

    const handleChange = (value) => {
        setPhone(value);
        setValidPhone(validatePhoneNumber(value));
      };
    
      const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    
        return phoneNumberPattern.test(phoneNumber);
      };

    const onSubmitFunction = (event) => {

        const token = Cookies.get('token');

        if (!token) {
            setError('No token found');
            return;
        }

        if (salary <= 0) {
            toast.warn("Invalid argument! Salary can not be zero or negative")
            return;
        }

        if(!validPhone){
            toast.warn("Invalid argument! Phone number must have 10 characters!")
            return;
        }

        if (email.length < 5) {
            toast.warn("Invalid argument! Email must be at least 5 characters")
            return;
        }

        if (name.length < 3) {
            toast.warn("Invalid argument! Name must be at least 3 characters")
            return;
        }

        if (address.length < 5) {
            toast.warn("Invalid argument! Address must be at least 5 characters")
            return;
        }
        
        try {
            addEmployee();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const [positionsList, setPositionsList] = useState([]);

    const fetchPositions = async () => {
        const token = Cookies.get('token');

        if (!token) {
            setError('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/public/getAllPositions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setPositionsList(data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    const token = Cookies.get('token');

    return (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800/50">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>

                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Create Employee
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

                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 ">
                            <label>
                                Employee Name
                            </label>
                            <input
                                type='text'
                                name="name"

                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter the employee name"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />

                        </div>

                        <div className="grid gap-4 mb-4 ">
                            <label>
                                Email
                            </label>
                            <input
                                type='email'

                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter the email"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />

                        </div>

                        <div className="grid gap-4 mb-4 ">
                            <label>
                                Password
                            </label>
                            <input
                                type='password'

                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter the password"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />

                        </div>

                        <div className="grid gap-4 mb-4 ">
                            <label>
                                Phone Number
                            </label>
                            <PhoneInput
                                country={'tr'}
                                value={phone}
                                onChange={handleChange}
                                inputStyle={{ width: '100%' }}
                                />

                        </div>

                        <div className="grid gap-4 mb-4 ">
                            <label>
                                Salary
                            </label>
                            <input
                                type='number'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter the salary"
                                onChange={(event) => setSalary(event.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="grid gap-4 mb-4 ">
                            <label>
                                Position
                            </label>
                            <StyledSelect value={position} onChange={(event) => setPosition(event.target.value)}>
                                {positionsList.map((position) => (
                                    <option value={position.toLowerCase()}>{position.toLowerCase()}</option>
                                )
                                )}
                            </StyledSelect>

                        </div>
                        <div className="grid gap-4 mb-4 ">
                            <label>
                                Address
                            </label>
                            <textarea
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-20 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter the Address"
                                onChange={(event) => setAddress(event.target.value)}
                                required
                            />
                        </div>
                        <button
                            onClick={(event) => onSubmitFunction(event)}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Create Employee
                        </button>
                    </form>

                </div>
            </div >
        </div >
    )
}
