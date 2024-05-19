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
    constructor(id, name, phone, totalSpendings) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.totalSpendings = totalSpendings;
    }
}

export const Customers = () => {

    const fetchCustomers = async () => {
        const token = Cookies.get('token');

        if (!token) {
            console.log('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/employee_and_admin/getAllCustomers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);

            // set to the class
            const newCustomersArray = data.map(customer =>
                new Customer(customer.id, customer.fullName, customer.phoneNumber, 0)
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
                                                Total Spendings
                                            </th>
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
                                                    <div class="text-sm text-gray-500">${customersArray.totalSpendings}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {customersArray.phone}
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
