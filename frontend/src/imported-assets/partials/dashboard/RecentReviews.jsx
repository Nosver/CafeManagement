import React from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

class Review{



  constructor(){

  }
}

function RecentReviews() {

  const chartData = {
    labels: ['Reasons'],
    datasets: [
      {
        label: 'Five Stars',
        data: [200],
        backgroundColor: tailwindConfig().theme.colors.green[800],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Four Stars',
        data: [100],
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[200],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Three Stars',
        data: [81],
        backgroundColor: tailwindConfig().theme.colors.yellow[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[200],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Two Stars',
        data: [65],
        backgroundColor: tailwindConfig().theme.colors.orange[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[200],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'One Star',
        data: [72],
        backgroundColor: tailwindConfig().theme.colors.red[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[300],
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent Reviews</h2>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">449</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default RecentReviews;
