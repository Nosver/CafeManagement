import React, { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function TopCustomersList() {

  const [TopCustomers,setTopCustomers] = useState([]);

  const fetchTopCustomers = async ()=>{

    try {
      const token = Cookies.get("token");

      const response = await fetch('http://localhost:8080/employee_and_admin/getTotalSpendings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
       
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();


      setTopCustomers(data);

    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    fetchTopCustomers()
    
  }, [])
  


  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Customers</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th>

              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                TopCustomers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                         
                          <div className="font-medium text-slate-800 dark:text-slate-100">{customer.fullName}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.totalSpending.toFixed(2)}₺</div>
                      </td>
                     
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default TopCustomersList;
