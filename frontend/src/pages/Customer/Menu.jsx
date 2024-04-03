import React, { useState, useEffect } from 'react';
import MenuItem from "../../components/MenuItem";
import Popup from "../../components/MenuPopup";
import ProductCategorySelector from '../../components/ProductCategorySelector';
import { useRef } from 'react';

export const Menu = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState("");
    const [selectedItemDescription, setSelectedItemDescription] = useState("");
    const [selectedItemPrice, setSelectedItemPrice] = useState("");
    const [selectedImagePath, setSelectedImagePath] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('Hot Beverage');
    const itemsPerPage = 5; 
    const productCategorySelectorRef = useRef(null); // Define a ref for ProductCategorySelector

    const openPopup = (item) => {
        setSelectedItemName(item.itemName);
        setSelectedItemDescription(item.itemDescription);
        setSelectedItemPrice(item.itemPrice);
        setSelectedImagePath(item.imagePath);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleTabSelect = (selectedTab) => {
        setSelectedCategory(selectedTab.id);
        setCurrentPage(1); // Reset page number when changing category
    };

    const menuItems = [
        {
            itemName: "Ice Americano",
            itemDescription: "A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day.",
            itemPrice: "90.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg",
            category: "Cold Beverage"
        },
        {
            itemName: "Latte",
            itemDescription: "A creamy and smooth coffee drink made with espresso and steamed milk.",
            itemPrice: "85.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Hot Beverage"
        },
        {
            itemName: "Cappuccino",
            itemDescription: "A classic Italian coffee drink made with espresso and frothed milk.",
            itemPrice: "80.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Hot Beverage"
        },
        {
            itemName: "Espresso",
            itemDescription: "A strong and bold shot of espresso, perfect for espresso lovers.",
            itemPrice: "70.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Hot Beverage"
        },
        {
            itemName: "Mocha",
            itemDescription: "A delightful blend of espresso, steamed milk, chocolate syrup, and whipped cream.",
            itemPrice: "95.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Hot Beverage"
        },
        {
            itemName: "Macchiato",
            itemDescription: "A shot of espresso with a dollop of foamed milk, creating a deliciously balanced coffee experience.",
            itemPrice: "85.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Hot Beverage"
        },
        {
            itemName: "Flat White",
            itemDescription: "A velvety-smooth coffee drink made with espresso and steamed milk, topped with a thin layer of microfoam.",
            itemPrice: "90.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Hot Beverage"
        },
        {
            itemName: "Affogato",
            itemDescription: "A heavenly dessert consisting of a scoop of vanilla gelato or ice cream topped with a shot of hot espresso.",
            itemPrice: "100.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Dessert"
        },
        {
            itemName: "Cold Brew",
            itemDescription: "A smooth and refreshing coffee brewed with cold water over a longer period, resulting in a low-acid and full-bodied flavor.",
            itemPrice: "85.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Cold Beverage"
        },
        {
            itemName: "Frappuccino",
            itemDescription: "A blended coffee beverage with ice, milk, and flavored syrup, topped with whipped cream.",
            itemPrice: "110.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg",
            category: "Cold Beverage"
        },
        {
            itemName: "Tiramisu",
            itemDescription: "An Italian dessert made with ladyfingers, coffee, mascarpone cheese, and cocoa powder.",
            itemPrice: "120.00",
            imagePath: "https://www.example.com/tiramisu.jpg",
            category: "Dessert"
        },
        {
            itemName: "Croissant",
            itemDescription: "A buttery and flaky pastry made with layers of dough.",
            itemPrice: "60.00",
            imagePath: "https://www.example.com/croissant.jpg",
            category: "Pastry"
        },
        {
            itemName: "Club Sandwich",
            itemDescription: "A classic sandwich with layers of ham, turkey, bacon, lettuce, tomato, and mayonnaise.",
            itemPrice: "150.00",
            imagePath: "https://www.example.com/club-sandwich.jpg",
            category: "Sandwich"
        },
        {
            itemName: "Banana Smoothie",
            itemDescription: "A creamy and refreshing smoothie made with ripe bananas and yogurt.",
            itemPrice: "80.00",
            imagePath: "https://www.example.com/banana-smoothie.jpg",
            category: "Smoothie"
        }
    ];

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
                itemName={item.itemName}
                itemDescription={item.itemDescription}
                itemPrice={item.itemPrice}
                imagePath={item.imagePath}
                onClick={() => openPopup(item)}
            />
        ));
    };

    useEffect(() => {
        handleRenderItems();
    }, [selectedCategory, currentPage]);

    return (
        <>
            <div className='mt-2 mb-2 flex justify-center '>
                <ProductCategorySelector ref={productCategorySelectorRef} onTabSelect={handleTabSelect}></ProductCategorySelector>
            </div>
            {handleRenderItems()}
            {isPopupOpen && (
                <Popup onClose={closePopup} itemName={selectedItemName} itemDescription={selectedItemDescription} itemPrice={selectedItemPrice} imagePath={selectedImagePath} />
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
