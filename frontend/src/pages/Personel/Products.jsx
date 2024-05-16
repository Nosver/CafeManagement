import React, { useEffect, useState } from 'react';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { InsertButton } from '../../components/personel/InsertButton';
import { ItemPopup } from '../../components/personel/ItemPopup';
import { SearchBar } from '../../components/personel/SearchBar';
import { AddProductPopup } from './AddProductPopup';
import { EditProductPopup } from './EditProductPopup';
import Cookies from 'js-cookie';


const predefinedStocks = [
    { name: 'Coffee Beans', unit: 'gr' },
    { name: 'Milk', unit: 'ml' },
    { name: 'Sugar', unit: 'gr' },
    { name: 'Flour', unit: 'gr' }
];



export const Products = () => {


    useEffect(() => {
        const fetchProducts = async () => {
          const token = Cookies.get('token');
          
          if (!token) {
            setError('No token found');
            return;
          }
    
          try {
            const response = await fetch('http://localhost:8080/employee_and_admin/getAllProducts', {
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

            setProductsArray(data);
            setProductsShow(data);

          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchProducts();
      }, []);


    const [productsArray, setProductsArray] = useState([]);
    const [productsShow, setProductsShow] = useState([]);

    const [categoryArray, setCategoriesArray] = useState([]);


    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    const [showPopup_edit, setShowPopup_edit] = useState(false);
    const openPopup_edit = () => setShowPopup_edit(true);
    const closePopup_edit = () => setShowPopup_edit(false);

    const [selectedProduct, setSelectedProduct]= useState();

    const searchButtonSubmit = (keyword) => {
        if(keyword == ''){
            if(productsShow.length != productsArray.length)
                setProductsShow(productsArray);
            return;
        }

        let newArr = productsArray.filter( product =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
        );   
        setProductsShow(newArr);
    }

    if (showPopup || showPopup_edit) {
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
                        <InsertButton description="Add new product" onClick={openPopup} />
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
                                                Product Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Predicted Quantity
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

                                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

                                        {showPopup &&
                                            <AddProductPopup
                                            closePopup={closePopup}
                                            />
                                        }

                                        {showPopup_edit &&
                                            <EditProductPopup selectedProduct={selectedProduct} closePopup={closePopup_edit}/>
                                        }

                                        {productsShow.map((product, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => setSelectedProduct(product)}
                                                class={`
                                            ${product.quantity == 1 ? 'bg-red-400' : product.quantity < 5 ? 'bg-red-300' : product.quantity < 10 ? 'bg-red-200' : product.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                                            >
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {product.id}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {product.name.toString()}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {product.category.toString()}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {5}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {product.price.toString()}₺
                                                </td>

                                                <td class="px-6 py-4">
                                                    {product.price * 5}₺
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div
                                                        onClick={() => setShowPopup_edit(true)}
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
