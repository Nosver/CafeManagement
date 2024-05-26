import React, { useState, useEffect } from 'react';
import ProductCategorySelector from '../../components/Customer/ProductCategorySelector';
import MenuItem from '../../components/Customer/MenuItem';
import MenuPopup from '../../components/Customer/MenuPopup';


export const Menu = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState("");
    const [selectedItemDescription, setSelectedItemDescription] = useState("");
    const [selectedItemPrice, setSelectedItemPrice] = useState("");
    const [selectedImagePath, setSelectedImagePath] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('HOTBEVERAGE');
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedId, setSelectedId]=useState(0);
    const [isMultisized, setIsMultisized]=useState(false);

    const itemsPerPage = 5; 

    const openPopup = (item) => {
        setSelectedItemName(item.name);
        setSelectedItemDescription(item.description);
        setSelectedItemPrice(item.price);
        setSelectedImagePath(item.imagePath);
        setSelectedRating(item.rating);
        setSelectedId(item.id)
        setIsMultisized(item.isMultisized);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleTabSelect = (selectedTab) => {
        setSelectedCategory(selectedTab);
        setCurrentPage(1); 
    };

    const [menuItems, setMenuItems] = useState([]);

    const [categories, setCategories] = useState([]);

    if(isPopupOpen){
        document.body.classList.add('overflow-hidden')
    }else{
        document.body.classList.remove('overflow-hidden')
    }


    const handleRenderItems = () => {
        const filteredItems = menuItems.filter(item => item.category === selectedCategory);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex).map((item, index) => (
            <MenuItem
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                imagePath={item.imagePath}
                onClick={() => openPopup(item)}
            />
        ));
    };

    const fetchProducts = async () => {
  
        try {
          const response = await fetch('http://localhost:8080/public/getAllProducts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });

  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();

          setMenuItems(data);

        } catch (error) {
          console.log(error.message);
        }
      };

      const fetchCategories = async () => {

        try {
            const response = await fetch('http://localhost:8080/public/getProductCategories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setCategories(data);

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() =>
        {
            fetchCategories();
            fetchProducts();
        },
        []
    );

    useEffect(() => {
        handleRenderItems();
    }, [selectedCategory, currentPage]);

    return (
        <>
            <div className='mt-2 mb-2 flex justify-center '>
                <ProductCategorySelector selectedCategory = {selectedCategory} categories = {categories} onTabSelect={handleTabSelect}></ProductCategorySelector>
            </div>
            {handleRenderItems()}
            {isPopupOpen && (
                <MenuPopup onClose={closePopup} name={selectedItemName} description={selectedItemDescription} price={selectedItemPrice} imagePath={selectedImagePath} rating={selectedRating} id={selectedId} isMultisized = {isMultisized}/>
            )}

            <nav  className="bg-center flex justify-center mt-2 mb-2" aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    <li>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                    </li>
                    {Array.from({ length: Math.ceil(menuItems.filter(item => item.category === selectedCategory).length / itemsPerPage) }, (_, index) => (
                        <li key={index}>
                            <button onClick={() => handlePageChange(index + 1)} className={`flex items-center justify-center px-4 h-10 leading-tight ${index + 1 === currentPage ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100  hover:text-gray-700'} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(menuItems.filter(item => item.category === selectedCategory).length / itemsPerPage)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Menu;
