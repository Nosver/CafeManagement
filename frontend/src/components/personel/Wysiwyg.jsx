import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';

const Wysiwyg = ({onContentChange}) => {
    const [content, setContent] = useState('');

    const handleChange = (value) => {
      setContent(value);
    };

    useEffect(() => {
        onContentChange(content); // Call the callback function whenever content changes
    }, [content, onContentChange]); 
  
   
  
    const modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
    };
  
  return (
    <div className='w-auto h-auto'>
      <ReactQuill className='h-40'
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  )
}

export default Wysiwyg