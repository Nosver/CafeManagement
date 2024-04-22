import React, { useEffect, useState } from 'react';

export const RequiredStockInput = ({selectedProduct}) => { 
    const [selectedStock, setSelectedStock] = useState('');
    const [stocksList, setStocksList] = useState([]);
    const [inputText, setInputText] = useState('');
    const [quantity, setQuantity] = useState('');
  
    // Önceden tanımlanmış öğelerin listesi
    const predefinedStocks = [
      { name: 'Coffee Beans', unit: 'gr' },
      { name: 'Milk', unit: 'ml' },
      { name: 'Sugar', unit: 'gr' },
      { name: 'Flour', unit: 'gr' }
    ];
  
    const handleSelectChange = (e) => {
      setSelectedStock(e.target.value);
    };
  
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };
  
    const handleQuantityChange = (e) => {
      setQuantity(e.target.value);
    };
  
    const handleAddStock = () => {
      if (selectedStock.trim() !== '' && quantity.trim() !== '' && !stocksList.find(stock => stock.name === selectedStock.trim())) {
        setStocksList([...stocksList, { name: selectedStock.trim(), quantity: quantity }]);
        setSelectedStock('');
        setInputText('');
        setQuantity('');
      }
    };
  
    const handleRemoveStock = (stockToRemove) => {
      setStocksList(stocksList.filter(stock => stock.name !== stockToRemove));
    };
  
  
    const filteredStocks = predefinedStocks.filter(stock =>
      stock.name.toLowerCase().includes(inputText.toLowerCase())
    );

    useEffect(() => {
      if (selectedProduct && selectedProduct.stock) {
        selectedProduct.stock.forEach(stockA => {
          const trimmedName = stockA.name.trim();
          // Check if the item already exists in stocksList
          if (!stocksList.some(stock => stock.name === trimmedName)) {
            setStocksList(prevStocksList => [
              ...prevStocksList,
              { name: trimmedName, quantity: stockA.amount }
            ]);
          }
        });
      }
    }, [selectedProduct]);
    

  return (
    <div className='mt-2'>
        {
          console.log(stocksList)
        }
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
                className="mt-1 py-3 px-5 w-full border-2 rounded-lg border-gray-300 outline-none placeholder:text-gray-400 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer dark:bg-gray-500 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-pink-300 dark:border-gray-300"
                type="number"
                placeholder="enter a quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
        </div>
        <div className='px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-blue-200 dark:bg-gray-400 mt-5'>
          {stocksList.map((stock, index) => (
            <span
              key={index}
              className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-blue-500 text-gray-200 hover:bg-blue-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              onClick={() => handleRemoveStock(stock.name)}
            >
              {stock.name} - {stock.quantity} {predefinedStocks.find(item => item.name === stock.name).unit}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 hover:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </span>
          ))}
        </div>
      </div>
  )
}
