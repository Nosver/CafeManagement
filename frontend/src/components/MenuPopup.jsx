import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Comment from './Comment';
import TotalStars from './TotalStars';


const Popup = ({ onClose, itemName, itemDescription, itemPrice, imagePath ,produtRating}) => {

  const [quantityValue, setQuantityValue] = useState(0);

  const [priceArr, setPriceArr] = useState([(parseFloat(itemPrice)*0.9).toFixed(2), itemPrice, (parseFloat(itemPrice)*1.1).toFixed(2)]);

  const showToastSuccess = (message) => {

    toast.success(message);
  };
  const showToastWarning = (message) => {

    toast.warn(message);
  };

  const [selectedOption, setSelectedOption] = useState("medium"); 


  

  const comments = [
    {
      ownerName: "John Doe",
      rating: 4,
      heading: "Great product!",
      time: "March 3, 2022",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam non velit lacinia viverra ac non nisi."
    },
    {
      ownerName: "Jane Smith",
      rating: 5,
      heading: "Excellent service",
      time: "April 15, 2022",
      content: "Vivamus tristique odio sit amet ligula vehicula, ac eleifend eros fermentum. Nulla facilisi."
    },
    {
      ownerName: "Jane Smith",
      rating: 5,
      heading: "Excellent service",
      time: "April 15, 2022",
      content: "Vivamus tristique odio sit amet ligula vehicula, ac eleifend eros fermentum. Nulla facilisi."
    },
    {
      ownerName: "Jane Smith",
      rating: 5,
      heading: "Excellent service",
      time: "April 15, 2022",
      content: "Vivamus tristique odio sit amet ligula vehicula, ac eleifend eros fermentum. Nulla facilisi."
    },
    {
      ownerName: "Jane Smith",
      rating: 5,
      heading: "Excellent service",
      time: "April 15, 2022",
      content: "Vivamus tristique odio sit amet ligula vehicula, ac eleifend eros fermentum. Nulla facilisi."
    },
    // Add more comments as needed
  ];

  const handleOptionChange = (event) => {
   
    setSelectedOption(event.target.value);
};


  

  function processAddToCart() {
    if (selectedOption == null) {
      showToastWarning(`Please select size to continue`);
      return;
    }


    if (quantityValue !== 0) {
      //post API Call
      showToastSuccess(`Added ${quantityValue} ${itemName}(s) to cart`);
      onClose();
      return;
    }

    showToastWarning("Please select a quantity greater than 0");


  }

  function decreaseQuantity() {
    setQuantityValue(Math.max(quantityValue - 1, 0));

  }
  const increaseQuantity = () => {
    setQuantityValue(quantityValue + 1);

  };

  return (
    <div className="overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 "  >
      <div className="bg-white rounded-lg p-8 w-auto relative">
        <button className="bg-gray-700 hover:bg-black  text-white px-4 py-2 rounded-md  absolute top-0 right-0 mr-4 mt-4" onClick={onClose}>X</button>

        <h2 className="text-2xl font-bold mb-4">{itemName}</h2>



        <div className='flex flex-row gap-10'>
          <div classname='flex flex-col gap-10'>


            <img src={imagePath} alt="Item Image" className="w-64 h-64 object-cover mb-4" />



            <TotalStars rating={produtRating}/>

          </div>



          <div className='flex flex-col gap-4'>

            <p className="text-lg mb-2 w-15">{itemDescription}</p>


            <div >
              <div className='flex flex-row gap-10'>
                <ul class=" w-7/12 space-y-6 md:grid md:grid-cols-1 md:space-y-0 md:gap-6">
                  <li >
                    <input type="radio" id="hosting-small"  value="small" class="hidden peer" onClick={handleOptionChange} checked={selectedOption === "small"}  />
                    <label for="hosting-small" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <div class="block w-11/12">
                        <div className='flex flex-row fill-inherit'>
                          <div class="w-full text-lg font-semibold">Small</div>
                          <p className="text-xl font-bold text-right ">{priceArr[0]}₺</p>

                        </div>

                        <div class="w-full">Light and flavorful! Perfect for a quick energy boost.</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="hosting-big"  value="medium" class="hidden peer" onClick={handleOptionChange} checked={selectedOption === "medium"}    />
                    <label for="hosting-big" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">

                      <div class="block w-11/12">
                        <div className='flex flex-row fill-inherit'>
                          <div class="w-full text-lg font-semibold">Medium</div>
                          <p className="text-xl font-bold text-right ">{priceArr[1]}₺</p>

                        </div>

                        <div class="w-full">Just right for satisfaction. Enjoy more flavor and fulfillment in every sip or bite.</div>
                      </div>

                    </label>
                  </li>
                  <li>
                    <input type="radio" id="hosting-L"  value="large" class="hidden peer" onClick={handleOptionChange} checked={selectedOption === "large"}  />
                    <label for="hosting-L" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <div class="block w-11/12">
                        <div className='flex flex-row fill-inherit'>
                          <div class="w-full text-lg font-semibold">Large</div>
                          <p className="text-xl font-bold text-right ">{priceArr[2]}₺</p>

                        </div>

                        <div class="w-full">For those craving more, our large size offers the perfect solution.</div>
                      </div>
                    </label>
                  </li>
                </ul>

               




                <div className="max-h-80 max-w-80 overflow-y-auto">
                  {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                  ))}
                </div>
              </div>




              <div className='flex items-center space-x-7 mt-5'>
                <button className="bg-gray-700 hover:bg-black  text-white px-4 py-2 rounded-md " onClick={processAddToCart}>Add to Cart</button>
                <div class="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700" data-hs-input-number>
                  <div class="flex items-center gap-x-1.5">
                    <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={decreaseQuantity}>
                      <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>
                    </button>
                    <input class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white" type="text" value={quantityValue} data-hs-input-number-input />
                    <button type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={increaseQuantity}>
                      <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>




      </div>
    </div>
  );
};

export default Popup;
