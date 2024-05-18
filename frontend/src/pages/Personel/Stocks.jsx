import React from 'react'
import { useState } from 'react';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { InsertButton } from '../../components/personel/InsertButton';
import { ItemPopup } from '../../components/personel/ItemPopup';
import { SearchBar } from '../../components/personel/SearchBar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import AddStockPopup from './AddStockPopup';
import EditStockPopup from './EditStockPopup';


export const Stocks = () => {
    const [stocksArray, setStocksArray] = useState([]);
    // Create random stocks for cafe
    useEffect(() => {
        const fetchStocks = async () => {
          const token = Cookies.get('token');
          
          if (!token) {
            setError('No token found');
            return;
          }
    
          try {
            const response = await fetch('http://localhost:8080/employee_and_admin/getAllStocks', {
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
            setStocksArray(data);
            setStocksShow(data);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchStocks();
      }, []);
    

    
    const [stocksShow, setStocksShow] = useState(stocksArray);

    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    //const [quantity, setQuantity] = useState(stock.quantity);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    const [showPopup_edit, setShowPopup_edit] = useState({ show: false, stock: null });
    const openPopup_edit = (stock) => setShowPopup_edit({ show: true, stock });
    const closePopup_edit = () => setShowPopup_edit({ show: false, stock: null });

    const searchButtonSubmit = (keyword) => {
        if(keyword == ''){
            if(stocksShow.length != stocksArray.length)
                setStocksShow(stocksArray);
            return;
        }

        let newArr = stocksArray.filter( stock =>
            stock.stockName.toLowerCase().includes(keyword.toLowerCase())
        );   
        setStocksShow(newArr);
    }

    
    if (showPopup_edit.show || showPopup ) {
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
                        <InsertButton description="Add new stock" onClick={openPopup} />
                    </div>
                    <main>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Unit Type
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Unit Price
                                    </th>
                                    
                                    <th scope="col" class="px-6 py-3">
                                        Total Price
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {showPopup &&
                                    <AddStockPopup
                                        
                                        closePopup={closePopup}
                                        
                                    />
                                }

                                {showPopup_edit.show && showPopup_edit.stock &&
                                    <EditStockPopup closePopup={() => setShowPopup_edit({ show: false, stock: null })}
                                        stock={showPopup_edit.stock}
                                    />
                                }


                                {stocksShow.map((stock, index) => (
                                    <tr key={index}  
                                            class={`${stock.quantity == 1 ? 'bg-red-400' : stock.quantity < 5 ? 'bg-red-300' : stock.quantity < 10 ? 'bg-red-200' : stock.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{stock.id}</th>
                                        <td class="px-6 py-4">{stock.stockName}</td>
                                        <td class="px-6 py-4">{stock.quantity}</td>
                                        <td class="px-6 py-4">{stock.stockUnit ? stock.stockUnit.toLowerCase() : ''}</td>
                                        <td class="px-6 py-4">{stock.unitPrice}₺</td>
                                        <td class="px-6 py-4">{(stock.quantity * stock.unitPrice).toFixed(2)}₺</td>
                                        <td class="px-6 py-4">
                                            <div onClick={() => openPopup_edit(stock)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>

        </div>
    )
}
