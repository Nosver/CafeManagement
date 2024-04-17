import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';


function Currency({title, baseCurrency,convertCurrency}) {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        console.log(today);

        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(today.getDate() - 2);
        
        const startDate = twoDaysAgo.toISOString().split('T')[0];
        const endDate = today.toISOString().split('T')[0];
        const url=`https://api.fxratesapi.com/timeseries?start_date=${startDate}&end_date=${endDate}&accuracy=hour&currencies=${convertCurrency}&base=${baseCurrency}&places=3`;
        const response = await fetch(url);
                if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const convertedData = {
          ...data,
          rates: Object.fromEntries(
            Object.entries(data.rates).map(([timestamp, rates]) => {
              const date = new Date(timestamp);
              date.setHours(date.getHours() + 3);
              return [date.toISOString(), rates];
            })
          )
        };

        setExchangeRates(convertedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!exchangeRates || isLoading) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
        </header>
        <div className="p-5">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const timestamps = Object.keys(exchangeRates.rates || {});
  const formattedLabels = timestamps.map(timestamp => new Date(timestamp).toLocaleString('en-US'));

  const rates = timestamps.map(timestamp => exchangeRates.rates[timestamp].TRY);

  // Reverse the data arrays
  const reversedLabels = formattedLabels.reverse();
  const reversedRates = rates.reverse();

  const chartData = {
    labels: reversedLabels,
    datasets: [{
      label: 'Exchange Rate (TRY)',
      data: reversedRates,
      fill: false,
      borderColor: '#4CAF50', // Green color for the line
      pointBackgroundColor: '#ffffff', // White color for points
      pointBorderColor: '#4CAF50', // Green color for point borders
      borderWidth: 3, // Increase line width
      pointHoverRadius: 2, // Increase point hover radius
      tension: 0.3 // Adjust line tension for smoother curve
    }]
  };

  const options = {
    scales: {
      x: {
        ticks: {
          display: false // Hide X-axis labels
        },
        grid: {
          display: false // Hide X-axis grid lines
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light gray color for Y-axis grid lines
        },
        
      }
    },
    plugins: {
      legend: {
        display: true,  
       
      }
    }
  };


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
      </header>
      <div className="p-5">
        <Line data={chartData} options={options}/>
      </div>
    </div>
  );
}

export default Currency;
