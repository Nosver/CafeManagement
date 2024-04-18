import React from 'react';

function LastComments() {
  // Static data array
  const comments = [
    {
      userid: 1,
      username: 'CoffeeLover22',
      comment: 'Enjoyed the cozy atmosphere and the aroma of freshly brewed coffee!',
      productKey: 'Cappuccino',
      stars: 5
    },
    {
      userid: 2,
      username: 'TeaEnthusiast',
      comment: 'The selection of teas here is impressive, had a delightful cup of chamomile tea.',
      productKey: 'Chamomile Tea',
      stars: 4
    },
    {
      userid: 3,
      username: 'PastryFanatic',
      comment: 'The pastries are always so delicious and fresh!',
      productKey: 'Croissant',
      stars: 5
    },
    {
      userid: 4,
      username: 'HealthyEater',
      comment: 'Appreciate the healthy options on the menu, the avocado toast was fantastic.',
      productKey: 'Avocado Toast',
      stars: 3
    },
    {
      userid: 5,
      username: 'SmoothieAddict',
      comment: 'Loved the variety of smoothies available, the berry blast smoothie was so refreshing.',
      productKey: 'Berry Blast Smoothie',
      stars: 2
    },
    {
      userid: 5,
      username: 'SmoothieAddict',
      comment: 'Awful taste',
      productKey: 'Ice Mocha',
      stars: 2
    },
  ];


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
                  {Array(comment.stars).fill('⭐️').join('')}
                  </div>
                </td>
                <td className="text-sm font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white">{comment.productKey}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LastComments;
