import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const EmailConfirmationPopup = ({ closeEmailPopup, currentEmail }) => {

    const [isConfirmationCodeSent, setIsConfirmationCodeSent] = useState(false)
    const [confirmationCode, setConfirmationCode] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleConfirmationCodeChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    const handleNewEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    const handleSendConfirmationCodeButton = (event) => {
        event.preventDefault();

        if (!newEmail.includes('@' && '.com')) {
            toast.error('Make sure the email is in the correct format! (e.g. example@gmail.com)')
            return
        }

        if (newEmail === '') {
            toast.error('Please enter the new email!')
            return
        }

        setIsConfirmationCodeSent(true)

        // API CALL HERE ...
        
        toast.success('Confirmation code sent to your email address!')
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if confirmation code is sent
        if (!isConfirmationCodeSent) {
            toast.error('Please send the confirmation code first!')
            return
        }

        // Check if the new email is written
        if (confirmationCode === '') {
            toast.error('Please enter the confirmation code!')
            return
        }

        // Check if the new email is different from the current email
        if (newEmail === currentEmail) {
            toast.error('The new email cannot be the same as the current email!')
            return
        }

        // Check if the confirmation code is correct
        if (confirmationCode !== '1234') {
            toast.error('The confirmation code is incorrect!')
            return
        }

        // API CALL HERE ...

        // If all the conditions are met, update the email
        toast.success('Email changed successfully!') && closeEmailPopup()
    }

    return (
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800/50">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>

                        <button
                            onClick={closeEmailPopup}
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal"
                        >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>


                        <div className="p-4 md:p-5">

                            <div>

                                <div class="mb-6">
                                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">Current Email</label>
                                    <input
                                        readOnly
                                        placeholder={currentEmail}
                                        data-popover-target="popover-text" data-popover-placement="bottom" type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    <div data-popover id="popover-text" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">


                                    </div>
                                </div>

                                <div class="mb-6">
                                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Email</label>
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={handleNewEmailChange}
                                        data-popover-target="popover-text"
                                        data-popover-placement="bottom"
                                        id="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />

                                    <div data-popover id="popover-text" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">

                                        <div data-popper-arrow></div>
                                    </div>
                                </div>

                                <div class="mb-6 relative group">
                                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmation Code</label>
                                    <input
                                        value={confirmationCode}
                                        onChange={handleConfirmationCodeChange}
                                        data-popover-target="popover-text"
                                        data-popover-placement="bottom"
                                        type="text"
                                        id="text"
                                        class="bg-pink-200 border-2 border-transparent text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                        required
                                        placeholder='Enter the confirmation code sent to your email address.'
                                    />

                                </div>

                                <button
                                    onClick={handleSendConfirmationCodeButton}
                                    type="submit" class="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Send Confirmation Code
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    type="submit" class="ml-4 text-white bg-pink-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Submit
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
