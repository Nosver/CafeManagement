import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
class TopProduct{


  constructor(productName,percantage){
    this.productName=productName;
    this.percantage=percantage
  }
}

function TopSales() {
    const TopProducts = [];
    TopProducts.push(new TopProduct("Ice Americano",30))
    TopProducts.push(new TopProduct("Latte",15))
    TopProducts.push(new TopProduct("Turkish Coffee",25))
    TopProducts.push(new TopProduct("Other",30))


    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Top Sales',
          data: [],
          backgroundColor: [
            tailwindConfig().theme.colors.indigo[500],
            tailwindConfig().theme.colors.blue[400],
            tailwindConfig().theme.colors.indigo[800],
            tailwindConfig().theme.colors.red[800],
          ],
          hoverBackgroundColor: [
            tailwindConfig().theme.colors.indigo[600],
            tailwindConfig().theme.colors.blue[500],
            tailwindConfig().theme.colors.indigo[900],
            tailwindConfig().theme.colors.red[600],
          ],
          borderWidth: 0,
        },
      ],
    };
    
    TopProducts.forEach((product) => {
      console.log(product.productName);
      chartData.labels.push(product.productName);
      chartData.datasets[0].data.push(product.percantage);
      
    });
    
   
    

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Sales</h2>
      </header>
     
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default TopSales;
