import React from 'react'

export const ERPTable = () => {
    return (
        <div>

            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="flex h-screen overflow-hidden">

                        {/* Content area */}
                        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                            <main>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-4">
                                                <InsertButton description="Add new product" onClick={openPopup} />
                                            </th>
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
                                                Quantity
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
                                            <AddItemPopup
                                                title="Add New Product"
                                                closePopup={closePopup}
                                                inputs={[
                                                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Type product name' },
                                                    { id: 'price', label: 'Price', type: 'number', placeholder: '$2999' },
                                                    { id: 'category', label: 'Category', type: 'select', placeholder: 'Select category' },
                                                    { id: 'quantity', label: 'Quantity', type: 'number', placeholder: 'Type quantity' },
                                                    { id: 'img_path', label: 'Image Path', type: 'text', placeholder: 'Type image path' },
                                                    { id: 'description', label: 'Product Description', type: 'textarea', placeholder: 'Write product description here' }
                                                ]}
                                            />
                                        }

                                        {products.map((product, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => setSelectedOrder(order)}
                                                class={`
                                            ${product.quantity == 1 ? 'bg-red-400' : product.quantity < 5 ? 'bg-red-300' : product.quantity < 10 ? 'bg-red-200' : product.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                                            >
                                                <td class="w-4 p-4">
                                                    <div class="flex items-center">
                                                        <input id={`checkbox-table-${index}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for={`checkbox-table-${index}`} class="sr-only">checkbox</label>
                                                    </div>
                                                </td>
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
                                                    {product.quantity.toString()}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {product.price.toString()}€
                                                </td>

                                                <td class="px-6 py-4">
                                                    ${product.total_price.toFixed(2)}
                                                </td>
                                                <td class="px-6 py-4">
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
