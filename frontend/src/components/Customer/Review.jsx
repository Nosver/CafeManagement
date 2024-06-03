import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const Review = ({ productId, close, title }) => {
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");

  const handleStarClick = (starValue) => {
    setStars(starValue);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendComment = async () => {
    const token = Cookies.get("token");

    if (!token) {
      setMessage("No token found. Please login.");
      return;
    }

    const commentData = {
      description: message,
      star: stars,
      product: {
        id: productId,
      }
    };

    try {
      const response = await fetch(
        "http://localhost:8080/customer_only/addComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  const handleSubmit = (event) => {
    if (stars < 1) {
      toast.warn("review must have at least one star");
      return;
    }
    if (!message) {
      toast.warn("Message field shouln't be empty");
      return;
    }

    sendComment(event);
    toast.success("Comment added");
    console.log("Stars:", stars);
    console.log("Message:", message);

    setStars(0);
    setMessage("");
    close();
  };

  return (
    <div className="overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800/50 bg-opacity-75 z-50 ">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-custom-coffe-brown min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5 flex flex-row gap-8">
            <h2 className="text-white text-center text-3xl font-semibold">
              Your opinion matters to us!
            </h2>
            <button
              className="bg-gray-700 hover:bg-black  text-white px-4 py-2 rounded-md  "
              onClick={() => close()}
            >
              X
            </button>
          </div>
          <div className="bg-gray-200 w-full flex flex-col items-center">
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-lg text-gray-800">
                How was quality of {title}?
              </span>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    className={`w-12 h-12 cursor-pointer ${
                      value <= stars ? "text-yellow-300" : "text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleStarClick(value)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-3/4 flex flex-col">
              <textarea
                rows="3"
                className="p-4 text-gray-500 rounded-xl resize-none"
                value={message}
                onChange={handleMessageChange}
                placeholder="Leave a message"
              />
              <button
                className="py-3 my-8 text-lg bg-custom-coffe-brown  rounded-xl text-white"
                onClick={handleSubmit}
              >
                Rate now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
