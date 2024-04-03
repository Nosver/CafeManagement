import React, { useState } from 'react'
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { InsertButton } from '../../components/personel/InsertButton';

import { ItemPopup } from '../../components/personel/ItemPopup';

class Customer {
    constructor(id, name, coffePayBalance, moneySpendLastMonth, phone, totalSpendings) {
        this.id = id;
        this.name = name;
        this.coffePayBalance = coffePayBalance;
        this.moneySpendLastMonth = moneySpendLastMonth;
        this.phone = phone;
        this.totalSpendings = totalSpendings;
    }

    static generateRandomPhoneNumber = () => {
        const areaCode = Math.floor(Math.random() * 900) + 100; // generates a random three digit number between 100 and 999
        const prefix = Math.floor(Math.random() * 900) + 100; // generates a random three digit number between 100 and 999
        const lineNumber = Math.floor(Math.random() * 9000) + 1000; // generates a random four digit number between 1000 and 9999

        return `+90 ${areaCode} ${prefix} ${lineNumber}`;
    }

    static generateRandomCustomer() {
        const id = Math.floor(Math.random() * 9000) + 1000;
        const names = ['Kemal Yıldırım', 'Doğukan Yılmaz', 'Masis Aramyan', 'Güney Kırcı', 'Ahmet Demir', 'John Doe', 'Jane Smith', 'Doe Johnson', 'Smith Brown', 'Alice Williams', 'Bob Johnson', 'Charlie Davis', 'David Wilson', 'Eve Taylor', 'Frank Anderson', 'Grace Thomas', 'Heidi Jackson'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCoffePayBalance = Math.floor(Math.random() * 100.0) + 1.0;
        const randomMoneySpendLastMonth = Math.floor(Math.random() * 100.0) + 1.0;
        const randomTotalSpendings = Math.floor(Math.random() * 100.0) + 1.0;
        const phone = this.generateRandomPhoneNumber();

        return new Customer(id, randomName, randomCoffePayBalance, randomMoneySpendLastMonth, phone, randomTotalSpendings);
    }

    static getCustomers(number) {
        let customers = [];
        for (let i = 0; i < number; i++) {
            customers.push(Customer.generateRandomCustomer());
        }
        return customers;
    }

}

export const Customers = () => {

    const [customersArray, setCustomersArray] = useState(Customer.getCustomers(100));

    const [showPopup, setShowPopup] = useState(false)

    const openPopup = () => {
        setShowPopup(true)
    }

    const closePopup = () => {
        setShowPopup(false)
    }


    const [showCouponPopup, setShowCouponPopup] = useState(false)

    const openCouponPopup = () => {
        setShowCouponPopup(true)
    }

    const closeCouponPopup = () => {
        setShowCouponPopup(false)
    }

    return (
        <div>

            <Siderbar_1 />

            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    
                    <div className='flex flex-row w-6/6 justify-end mb-3'>
                        <Button onClick={openCouponPopup}>Send Coupon</Button>
                    </div>

                    <div className="flex h-screen overflow-hidden">
                        {/* Content area */}
                        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                            <main>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-4">
                                                <InsertButton description="Add new product" onClick={openPopup}/>
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Id
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Customer Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                CoffePay Balance
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Money Spend Last Month
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Total Spendings
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Phone
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Action
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


                                        {customersArray.map((customersArray, index) => (
                                            <tr key={index}>
                                                <td class="w-4 p-4">
                                                    <div class="flex items-center">
                                                        <input id={`checkbox-table-${index}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for={`checkbox-table-${index}`} class="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">{customersArray.id}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">{customersArray.name}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-500">
                                                        ${customersArray.coffePayBalance}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-500">${customersArray.moneySpendLastMonth}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-500">${customersArray.totalSpendings}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {customersArray.phone}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
