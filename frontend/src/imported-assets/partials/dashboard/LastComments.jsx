import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function LastComments() {
  // Static data array
  const [comments,setComments] = useState([]);

  const fetchComments = async () =>{
    const token = Cookies.get('token')

    try {
      const response = await fetch(`http://localhost:8080/employee_and_admin/getRecentComments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });


      const data = await response.json();

      setComments(data);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    
    fetchComments()
   
  }, [])
  


  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent Comments</h2>
      </header>
      <div className="p-3">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Comment</th>
              <th className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Product</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index} className="border-b">
                
                <td className="px-4 py-2 flex items-center">
                  <div className={`w-9 h-9 rounded-full bg-indigo-500 mr-3`}>

                    <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                      <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                    </svg>
                  </div>
                  <div className=' text-sm font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white'>{comment.comment} 
                  <br />
                  {Array(comment.star).fill('⭐️').join('')}
                  </div>
                </td>
                <td className="text-sm font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white">{comment.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LastComments;
