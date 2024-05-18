import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const RequiredStockInput2 = ({ handleStockList, stocks, stocksListParent }) => {

  const [selectedStock, setSelectedStock] = useState('');
  const [stocksList, setStocksList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [quantity, setQuantity] = useState('');
  const [predefinedStocks, setPredefinedStocks] = useState([]);
  console.log("Child is");
  console.log(stocksList);
  const sendDataToParent = (updatedStocksList) => {
    handleStockList(updatedStocksList);
  };

  useEffect(() => {
    setStocksList([...stocksListParent]);
  }, [stocksListParent]);

  useEffect(() => {
    const predefinedStocksConvert = () => {
      const predefined = stocks.map(stock => ({
        name: stock.stockName,
        unit: stock.stockUnit
      }));
      setPredefinedStocks(predefined);
    };
    predefinedStocksConvert();
    console.log("requiredStocks2 useEffect Called!")
  }, [stocks]);

  const handleSelectChange = (e) => {
    setSelectedStock(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddStock = (e) => {
    e.preventDefault();

    if (quantity.trim() <= 0) {
      toast.warning('Quantity must be greater than 0');
      return;
    }

    if (!selectedStock.trim()) {
      toast.warning('Please select a stock');
      return;
    }

    const existingStock = stocksList.find(stock => stock.stock.stockName === selectedStock.trim());

    if (existingStock) {
      // Update existing stock quantity
      setStocksList(prevStocksList => {
        const updatedStocks = prevStocksList.map(stock => {
          if (stock.stock.stockName === selectedStock.trim()) {
            return {...stock, amount: quantity };
          }
          return stock;
        });
        sendDataToParent(updatedStocks);
        return updatedStocks;
      });
      toast.success('Stock quantity updated successfully');
    } else {
      // Add new stock
      const selectedStockObject = predefinedStocks.find(stock => stock.name === selectedStock.trim());

      const newStock = {
        amount: parseFloat(quantity),
        stock: {
          stockName: selectedStockObject.name,
          stockUnit: selectedStockObject.unit
        }
      };

      const updatedStocksList = [...stocksList, newStock];
      setStocksList(updatedStocksList);
      sendDataToParent(updatedStocksList);
      toast.success('Stock added successfully');
    }
  }
  const handleRemoveStock = (stockToRemove) => {
    setStocksList(prevStocksList => {
      const updatedStocks = prevStocksList.filter(stock => stock.stock.stockName !== stockToRemove);
      sendDataToParent(updatedStocks);  // Send the updated list to the parent
      return updatedStocks;
    });
  };

  const filteredStocks = predefinedStocks.filter(stock =>
    stock.name.toLowerCase().includes(inputText.toLowerCase())
  );

  /*
  useEffect(() => {
    if (selectedProduct && selectedProduct.stock) {
      setStocksList(selectedProduct.stock.map(stock => ({ name: stock.name.trim(), quantity: stock.amount })));
      sendDataToParent(selectedProduct.stock.map(stock => ({ name: stock.name.trim(), quantity: stock.amount })));
    }
  }, [selectedProduct]);
  */
  //console.log(stocksListParent)

  return (
    <div className='mt-2'>
      <div className='flex w-full flex-row mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        <h3>Stocks</h3>
      </div>

      <div className="flex items-center justify-center">
        <div className='flex flex-row gap-10'>
          <div className='flex flex-col'>
            <input
              id="input1"
              className="mt-1 py-3 px-5 w-full border-2 rounded-lg border-gray-300 outline-none placeholder:text-gray-400 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer dark:bg-gray-500 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-pink-300 dark:border-gray-400"
              type="text"
              placeholder="Type to filter stocks"
              value={inputText}
              onChange={handleInputChange}
            />
            <select
              className="mt-1 py-3 px-5 w-full border-2 rounded-lg border-gray-300 outline-none placeholder:text-gray-400 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer dark:bg-gray-500 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-pink-300 dark:border-gray-400"
              value={selectedStock}
              onChange={handleSelectChange}
            >
              <option value="" disabled hidden>Select stock</option>
              {filteredStocks.map((stock, index) => (
                <option key={index} value={stock.name}>{stock.name}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            <button
              className="mt-1 py-3 px-5 w-full border-2 rounded-lg bg-blue-500 text-gray-100 cursor-pointer hover:bg-blue-700 hover:text-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              onClick={handleAddStock}
            >
              Add
            </button>
            <input
              min='0'
              className="mt-1 py-3 px-5 w-full border-2 rounded-lg border-gray-300 outline-none placeholder:text-gray-400 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer dark:bg-gray-500 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-pink-300 dark:border-gray-300"
              type="number"
              placeholder="Enter a quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
      <div className='px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-blue-200 dark:bg-gray-400 mt-5'>
        {stocksList.map((reqStock, index) => (
          <span
            key={index}
            className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-blue-500 text-gray-200 hover:bg-blue-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            onClick={() => handleRemoveStock(reqStock.stock.stockName)}
          >
            {reqStock.stock.stockName}: {reqStock.amount} {reqStock.stock.stockUnit}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 hover:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 7.586 7.707 5.293a1 1 0 10-1.414 1.414L8.586 9 6.293 11.293a1 1 0 001.414 1.414L10 10.414l2.293 2.293a1 1 0 001.414-1.414L11.414 9l2.293-2.293z" clipRule="evenodd" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
};
