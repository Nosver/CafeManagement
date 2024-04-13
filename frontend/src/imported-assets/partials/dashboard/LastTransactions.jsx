import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function LastTransactions() {
  // Static data for each row
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8080/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Last Transactions</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Total amount</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Currency</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Customer name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Customer Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Payment Method</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {transactions.map((data, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">{(parseInt(data.amountTotal) / 100).toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{data.currency.toUpperCase()}</div>
                  </td>
                  <td className="p-2">
                    {<div className="text-center text-slate-800">{data.customerDetails ? data.customerDetails.name : '-'}</div>
                    }
                  </td>
                  <td className="p-2">
                    {<div className="text-center text-slate-800">{data.customerDetails ? data.customerDetails.email : '-'}</div>
                    }
                  </td>
                  <td className="p-2">
                    <div className="text-center text-sky-500">{data.paymentMethodTypes[0].charAt(0).toUpperCase() + data.paymentMethodTypes[0].slice(1)}</div>
                  </td>
                  <div className={`text-center ${data.status === 'complete' ? 'text-green-500' : 'text-red-500'}`}>
                    {data.status === 'complete' ? 'Complete' : data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LastTransactions;
