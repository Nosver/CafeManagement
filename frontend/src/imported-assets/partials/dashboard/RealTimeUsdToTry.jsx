import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RealtimeChart from '../../charts/RealtimeChart';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function RealTimeUsdToTry() {
  const [currencyData, setCurrencyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.exchangeratesapi.io/latest?base=USD&symbols=TRY');
        setCurrencyData(response.data.rates);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // Fetch data every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const labels = currencyData ? Object.keys(currencyData) : [];
  const dataValues = currencyData ? Object.values(currencyData) : [];
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'USD to TRY',
        data: dataValues,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };
  

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Real Time USD to TRY Currency Conversion</h2>
      </header>
      <div className="p-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <RealtimeChart data={chartData} width={595} height={248} />
        )}
      </div>
    </div>
  );
}

export default RealTimeUsdToTry;
