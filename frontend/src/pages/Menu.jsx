import React, { useState } from 'react';
import MenuItem from "../components/MenuItem";
import Popup from "../components/Popup";

export const Menu = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState("");
    const [selectedItemDescription, setSelectedItemDescription] = useState("");
    const [selectedItemPrice, setSelectedItemPrice] = useState("");
    const [selectedImagePath,setSelectedImagePath] = useState("");

    const openPopup = (name, description, price,path) => {
        setSelectedItemName(name);
        setSelectedItemDescription(description);
        setSelectedItemPrice(price);
        setIsPopupOpen(true);
        setSelectedImagePath(path);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <MenuItem
                itemName="Ice americano"
                imagePath="https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg"
                itemDescription="A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day."
                itemPrice="90.00"
                onClick={() => openPopup("Ice americano", "A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day.", "90.00","https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg")}
            />
            <MenuItem
                itemName="Ice americano"
                imagePath="https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg"
                itemDescription="A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day."
                itemPrice="90.00"
                onClick={() => openPopup("Ice americano", "A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day.", "90.00","https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg")}
            />
            <MenuItem
                itemName="Ice americano"
                imagePath="https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg"
                itemDescription="A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day."
                itemPrice="90.00"
                onClick={() => openPopup("Ice americano", "A refreshing blend of bold espresso and chilled water, served over ice. Perfect for a cool pick-me-up on a warm day.", "90.00","https://www.pinoscoffee.com/wp-content/uploads/2022/05/pinos-coffee-ayvalik-iced-americano-150x150.jpg")}
            />
            {isPopupOpen && (
                <Popup onClose={closePopup} itemName={selectedItemName} itemDescription={selectedItemDescription} itemPrice={selectedItemPrice} imagePath={selectedImagePath}/>
            )}
        </>
    );
};

export default Menu;
