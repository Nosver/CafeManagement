import React, { useState } from 'react';
import MenuItem from "../components/MenuItem";
import Popup from "../components/MenuPopup";

export const Menu = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState("");
    const [selectedItemDescription, setSelectedItemDescription] = useState("");
    const [selectedItemPrice, setSelectedItemPrice] = useState("");
    const [selectedImagePath, setSelectedImagePath] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

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

    if(isPopupOpen){
        document.body.classList.add('overflow-hidden')
    }else{
        document.body.classList.remove('overflow-hidden')
    }
         
    const menuItems = [
        {
            itemName: "Ice Americano",
            itemDescription: "A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day.",
            itemPrice: "90.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg"
        },
        {
            itemName: "Latte",
            itemDescription: "A creamy and smooth coffee drink made with espresso and steamed milk.",
            itemPrice: "85.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Cappuccino",
            itemDescription: "A classic Italian coffee drink made with espresso and frothed milk.",
            itemPrice: "80.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Espresso",
            itemDescription: "A strong and bold shot of espresso, perfect for espresso lovers.",
            itemPrice: "70.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Mocha",
            itemDescription: "A delightful blend of espresso, steamed milk, chocolate syrup, and whipped cream.",
            itemPrice: "95.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Macchiato",
            itemDescription: "A shot of espresso with a dollop of foamed milk, creating a deliciously balanced coffee experience.",
            itemPrice: "85.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Flat White",
            itemDescription: "A velvety-smooth coffee drink made with espresso and steamed milk, topped with a thin layer of microfoam.",
            itemPrice: "90.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Affogato",
            itemDescription: "A heavenly dessert consisting of a scoop of vanilla gelato or ice cream topped with a shot of hot espresso.",
            itemPrice: "100.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Cold Brew",
            itemDescription: "A smooth and refreshing coffee brewed with cold water over a longer period, resulting in a low-acid and full-bodied flavor.",
            itemPrice: "85.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Frappuccino",
            itemDescription: "A blended coffee beverage with ice, milk, and flavored syrup, topped with whipped cream.",
            itemPrice: "110.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Affogato",
            itemDescription: "A heavenly dessert consisting of a scoop of vanilla gelato or ice cream topped with a shot of hot espresso.",
            itemPrice: "100.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Cold Brew",
            itemDescription: "A smooth and refreshing coffee brewed with cold water over a longer period, resulting in a low-acid and full-bodied flavor.",
            itemPrice: "85.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        },
        {
            itemName: "Frappuccino",
            itemDescription: "A blended coffee beverage with ice, milk, and flavored syrup, topped with whipped cream.",
            itemPrice: "110.00",
            imagePath: "https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-latte-150x150.jpg"
        }
    ];


    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMenuItems = menuItems.slice(startIndex, endIndex);

    return (
        <>
            {paginatedMenuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    itemName={item.itemName}
                    itemDescription={item.itemDescription}
                    itemPrice={item.itemPrice}
                    imagePath={item.imagePath}
                    onClick={() => openPopup(item)}
                />
            ))}
            {isPopupOpen && (
                <Popup onClose={closePopup} itemName={selectedItemName} itemDescription={selectedItemDescription} itemPrice={selectedItemPrice} imagePath={selectedImagePath} />
            )}

            <nav  className = "bg-center flex justify-center mt-2 mb-2" aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10 ">
                    <li>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                    </li>
                    {Array.from({ length: Math.ceil(menuItems.length / itemsPerPage) }, (_, index) => (
                        <li key={index}>
                            <button onClick={() => handlePageChange(index + 1)} className={`flex items-center justify-center px-4 h-10 leading-tight ${index + 1 === currentPage ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100  hover:text-gray-700'} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(menuItems.length / itemsPerPage)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Menu;
