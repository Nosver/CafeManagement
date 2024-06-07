import React, { useState, useEffect } from 'react'
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { InsertButton } from '../../components/personel/InsertButton';
import { Button } from 'flowbite-react';
import { CouponPopup } from '../../components/personel/CouponPopup';

import { ItemPopup } from '../../components/personel/ItemPopup';
import { SearchBar } from '../../components/personel/SearchBar';
import { EmailPopup } from '../../components/personel/EmailPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import Cookies from 'js-cookie';


class Customer {
    constructor(id, name, email,phone, totalSpendings) {
        this.id = id;
        this.name = name;
        this.email=email;
        this.phone = phone;
        this.totalSpendings = totalSpendings;
    }
}

export const Customers = () => {

    const [isLoading, setIsLoading] = useState(false);
    const fetchCustomers = async () => {
        const token = Cookies.get('token');

        if (!token) {
            console.log('No token found');
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/employee_and_admin/getAllCustomers', {
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

            console.log(data);

            // set to the class
            const newCustomersArray = data.map(customer =>
                new Customer(customer.id, customer.fullName, customer.email,customer.phoneNumber, 0)
            );

            
            return newCustomersArray;

        } catch (error) {
            console.log(error.message);
            return [];
        }

    };

    const [customersArray, setCustomersArray] = useState([]);
    const [customersShow, setCustomersShow] = useState(customersArray);
    const [showPopup, setShowPopup] = useState(false)
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [showCouponPopup, setShowCouponPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchCustomers();
            setCustomersArray(result);
            setCustomersShow(result);
            console.log(result);
        };

        fetchData();
    }, []);

    const openPopup = () => {
        setShowPopup(true)
    }

    const closePopup = () => {
        setShowPopup(false)
    }

    const openCouponPopup = () => {
        setShowCouponPopup(true)
    }

    const closeCouponPopup = () => {
        setShowCouponPopup(false)
    }

    const openEmailPopup = () => {
        setShowEmailPopup(true)
    }

    const closeEmailPopup = () => {
        setShowEmailPopup(false)
    }
    if (showEmailPopup || showCouponPopup || showPopup) {
        document.body.classList.add('overflow-hidden')
    } else {
        document.body.classList.remove('overflow-hidden')
    }

    const searchButtonSubmit = (keyword) => {
        if (keyword == '') {
            if (customersShow.length != customersArray.length)
                setCustomersShow(customersArray);
            return;
        }

        let newArr = customersArray.filter(customer =>
            customer.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setCustomersShow(newArr);
    }

    return (
        <div>
            <Siderbar_1 />
            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                    <div class='flex flex-row w-6/6 mb-3'>
                        <SearchBar searchButtonSubmit={searchButtonSubmit} class='mr-auto'></SearchBar>
                        <div class='flex items-center space-x-4'>
                            <Button className='bg-blue-700 text-white' onClick={openEmailPopup}>Send E-Mail</Button>
                            <Button className='bg-blue-700 text-white' onClick={openCouponPopup}>Send Coupon</Button>
                        </div>
                    </div>

                    <div className="flex h-screen overflow-hidden">
                        {/* Content area */}
                        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                            <main>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Id
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Customer Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Customer E-mail
                                            </th>
                                           {/* <th scope="col" class="px-6 py-3">
                                                Total Spendings
                                            </th> */}
                                            <th scope="col" class="px-6 py-3">
                                                Phone
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

                                        {showPopup &&
                                            <ItemPopup
                                                title="Add new customer"
                                                inputs={[
                                                    {
                                                        type: "text",
                                                        name: "name",
                                                        id: "name",
                                                        label: "Name",
                                                        placeholder: "Enter customer name"
                                                    },
                                                    {
                                                        type: "text",
                                                        name: "phone",
                                                        id: "phone",
                                                        label: "Phone",
                                                        placeholder: "Enter phone number"
                                                    }
                                                ]}
                                                closePopup={closePopup}
                                            />
                                        }

                                        {showCouponPopup &&
                                            <CouponPopup
                                                closePopup={closeCouponPopup}
                                            />
                                        }
                                        {showEmailPopup &&
                                            <EmailPopup
                                                closePopup={closeEmailPopup}

                                            />

                                        }


                                        {customersShow.map((customersArray, index) => (
                                            <tr key={index}>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">{customersArray.id}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">{customersArray.name}</div>
                                                </td>

                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">{customersArray.email}</div>
                                                </td>

                                                {/*<td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-500">${customersArray.totalSpendings}</div>
                                                </td> */}
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {customersArray.phone}
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
