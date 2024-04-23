import { Button } from "flowbite-react";
import { Link, NavLink, Navigate } from "react-router-dom";

const AdvertiseBox = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col mx-4 my-4">
      <img src={image} alt={title} className="w-full h-60 object-cover" />

      <div className="p-4 flex flex-row">
        
        <div className="flex flex-col w-4/6 justify-center">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="">{description}</p>
        </div>

        <div className = "flex flex-col w-2/6 justify-center">
          <Link className = "flex justify-center" to = "/menu">
            <Button className='bg-gray-800'>Order Now</Button>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default AdvertiseBox;
 