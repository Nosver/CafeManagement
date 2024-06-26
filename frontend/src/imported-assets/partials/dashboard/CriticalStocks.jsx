import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function CriticalStocks() {
  // Static data array
  const [stocks,setStocks] = useState([]);



  const fetchCriticalStocks = async ()=>{
    const token = Cookies.get('token')


        try {
            const response = await fetch(`http://localhost:8080/employee_and_admin/getCriticalStocks`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
           
            const data= await response.json();

            setStocks(data)

        } catch (error) {
            console.log(error.message);
        }
  }
  useEffect(() => {
   
    fetchCriticalStocks();

  }, [])
  
    

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-red-600 dark:text-slate-100">Critical Stocks</h2>
      </header>
      <div className="p-3">
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Products
          </header>
          <ul className="my-1  border-b">
            {stocks.map((stock, index) => (
              <li key={index} className="flex px-2 border-black ">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-800 my-2 mr-3">
                  <FontAwesomeIcon icon={faBoxes} className="w-5 h-5 fill-current text-white" />
                </div>
                <div className="grow flex items-center border-b border-slate-200 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">
                      <span className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white">{stock.stockName}</span>
                    </div>
                    <div className="shrink-0 self-start ml-2">
                      <span className="font-medium text-red-600 dark:text-slate-100">{stock.quantity} {stock.stockUnit}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CriticalStocks;
