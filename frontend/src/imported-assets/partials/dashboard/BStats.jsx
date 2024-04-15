import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon


export const BStats = ({Label,Data,Icon}) => {
  console.log(Icon);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-slate-200 dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <div className="px-5 h-full mt-4 mb-4">
      <header className="flex justify-between items-start mb-2 ">
        {/* Icon */}
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{Label}</h2>
        <FontAwesomeIcon className=' w-8 h-8' icon={Icon} />
      </header>
      
      <div className="flex items-start">
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{Data}</div>
      </div>
    </div>
    {/* Chart built with Chart.js 3 */}
    <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
      {/* Change the height attribute to adjust the chart height */}
    </div>
  </div>
  )
}
