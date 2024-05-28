import React, { useEffect } from 'react';
import { RequiredStockInput } from '../../components/personel/RequiredStockInput';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { RequiredStockInput2 } from '../../components/personel/RequiredStockInput2';
import Cookies from 'js-cookie';


export const EditProductPopup = ({ closePopup, selectedProductName }) => {


    const handleDeleteProduct = async () => {

        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) {
            return;
        }

        closePopup();

        const token = Cookies.get('token');

        if (!token) {
            setError('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/employee_and_admin/deleteProductById?productId=' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            toast.success('Product deleted successfully');
            window.location.reload();

        } catch (error) {
            toast.error('An error occurred while deleting the product');
        }
    };

    const handleStockList = (stocksList) => {
        // Convert the current stocks list to a Map for easy lookup
        const currentStocks = new Map(stocksListParent.map(stock => [stock.name, stock]));

        // Only add the new stocks if they don't exist in the current stocks
        const newStocks = stocksList.filter(stock => !currentStocks.has(stock.name));

        setStocksListParent([...stocksList]);
    }

    const [name, setName] = useState("");

    const [price, setPrice] = useState("");

    const [description, setDescription] = useState("");

    const [isMultisized, setIsMultisized] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const [imgPath, setImgPath] = useState("");

    const [category, setCategory] = useState("");

    const [categoryArray, setCategoryArray] = useState([]);

    const [stocksArray, setStocksArray] = useState([]);

    const [stocksListParent, setStocksListParent] = useState([]);

    const [id, setId] = useState('');

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        try {
            const response = await fetch('http://localhost:8080/public/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Upload successful:', result);
                return result.publicUrl;
            } else {
                const errorText = await response.text();
                console.error('Upload failed:', response.status, errorText);
                alert(`Upload failed: ${response.status} - ${errorText}`);
                return null;
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
            return null;
        }
    };
    

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    
    const onSubmitFunction = async (e) => {
        const token = Cookies.get('token');

        if (!token) {
            setError('No token found');
            return;
        }

        if (selectedFile == null) {
            e.preventDefault()

            const productData = {
                id: id,
                name: name,
                price: price,
                description: description,
                requiredStocks: stocksListParent.map(reqStock => ({
                    amount: reqStock.amount,
                    stock: {
                        stockName: reqStock.stock.stockName
                    }
                })),
                isMultisized: isMultisized,
                category: category,
                imagePath: imgPath
            };


            console.log(productData)
            try {
                const response = await fetch('http://localhost:8080/employee_and_admin/updateProduct', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });

                if(response.status==409){
                    toast.warn("Could not change the name to existing product");
                    return;
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }


            } catch (error) {
                console.log(error.message);
            }
            window.location.reload();

        }
        else {
            e.preventDefault()

            const uploadedImageUrl = await handleUpload();
            console.log(uploadedImageUrl)
            if (!uploadedImageUrl) {
                return;
            }

            const productData = {
                id: id,
                name: name,
                price: price,
                description: description,
                requiredStocks: stocksListParent.map(reqStock => ({
                    amount: reqStock.amount,
                    stock: {
                        stockName: reqStock.stock.stockName
                    }
                })),
                isMultisized: isMultisized,
                category: category,
                imagePath: uploadedImageUrl
            };

            console.log(productData);

            try {
                const response = await fetch('http://localhost:8080/employee_and_admin/updateProduct', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

            } catch (error) {
                console.log(error.message);
            }
            window.location.reload();

        }
    };

    const fetchProductByName = async () => {
        const token = Cookies.get('token');

        if (!token) {
            console.log('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/employee_and_admin/getProductByName?name=' + selectedProductName, {
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
            setId(data.id)
            setName(data.name);
            setPrice(data.price);
            setDescription(data.description);
            setImgPath(data.imagePath);
            setCategory(data.category);
            setIsMultisized(data.isMultisized)
            setStocksListParent(prevRequiredStocks => [
                ...prevRequiredStocks,
                ...data.requiredStocks
            ]);
            return data;

        } catch (error) {
            console.log(error.message);
        }
    }


    const fetchCategoriesAndStocks = async () => {
        const token = Cookies.get('token');
        if (!token) {
            setError('No token found');
            return;
        }

        try {
            const [categoryResponse, stockResponse] = await Promise.all([
                fetch('http://localhost:8080/public/getProductCategories', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('http://localhost:8080/employee_and_admin/getAllStocks', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
            ]);

            if (!categoryResponse.ok || !stockResponse.ok) {
                throw new Error(`HTTP error! status: ${categoryResponse.status} ${stockResponse.status}`);
            }

            const [categoryData, stockData] = await Promise.all([
                categoryResponse.json(),
                stockResponse.json()
            ]);

            setCategoryArray(categoryData);
            setStocksArray(stockData);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProductByName();
        fetchCategoriesAndStocks();
        console.log("EditProductPopup useEffect called!!!");
    }, []);

    return (
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800/50">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit Product
                        </h3>
                        <button
                            onClick={closePopup}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5 ">
                        <div className="grid gap-4 mb-4 grid-cols-2 w-96">
                            <div className="col-span-2" >


                                <label className="  block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type='text'
                                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                    placeholder='Type product name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className=" mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Price
                                </label>
                                <input
                                    min='0'
                                    type='number'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder='Enter a price'
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <label className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Category
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categoryArray.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>


                                <RequiredStockInput2 stocks={stocksArray} handleStockList={handleStockList} stocksListParent={stocksListParent} />


                                <label className=" mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Image
                                </label>
                                <div className="flex items-center justify-center w-full">

                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                                            <svg className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-2xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG</p>
                                        </div>
                                        <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" accept=".jpg, .jpeg, .png, .gif" />
                                    </label>
                                </div>
                                {selectedFile && (
                                    <p className="mt-2 text-sm text-green-600 dark:text-green-400">Image selected: {selectedFile.name}</p>
                                )}

                                <div class="flex mt-5">
                                    <input onChange={(event) => { setIsMultisized(event.target.checked) }} checked={isMultisized} type="checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-default-checkbox" />
                                    <label for="hs-default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-white">Is product multisized?</label>
                                </div>

                                <label className=" mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Product Description
                                </label>

                                <textarea
                                    className='w-96'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>


                            </div>

                        </div>
                        <div className='flex flex-row gap-4'>
                            <button
                                onClick={onSubmitFunction}

                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Update Product
                            </button>
                            <button
                                onClick={handleDeleteProduct}

                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Delete Product
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
