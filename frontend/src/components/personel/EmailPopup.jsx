import React from 'react'
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import Wysiwyg from './Wysiwyg';
import { useState } from 'react';


export const EmailPopup = ({ closePopup }) => {

    const [title, setTitle] = useState('');

  // Handler function to update the title state when input changes
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

    function sendEmail() {
        if (editorContent.trim() === '' || title.trim() === '') {
            toast.warn("Both Fields must be filled");
            return;
        }

        console.log(editorContent)
        //API post call
        if (true) { // successfull sent
            toast.success("email sent successfull");
            closePopup()
        }else{
            toast.error("email could not be sent consult your system admin");

        }

    }

    const [editorContent, setEditorContent] = useState('');

    const handleEditorContentChange = (content) => {
        setEditorContent(content);
    };

    return (
<div>
  <div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
    <div class="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-700">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Send E-mail
          </h3>
          <button
            onClick={closePopup}
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
          >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only"></span>
          </button>
        </div>
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4">
            <div >
              <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input type="text"  value={title} onChange={handleTitleChange} name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  />
            </div>
            <div className='col-span-2 h-72'>
              <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
              <Wysiwyg onContentChange={handleEditorContentChange} />
            </div>
          </div>
          <div className='flex flex-row justify-center mb-0'>
            <Button className='w-2/6' onClick={sendEmail}>Send</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    )
}
