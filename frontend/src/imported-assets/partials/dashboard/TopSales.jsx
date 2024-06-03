import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import Cookies from 'js-cookie';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

class TopProduct {
  constructor(amount, name) {
    this.amount = amount;
    this.name = name;
  }
}

function TopSales() {
  const [chartData, setChartData] = useState({
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
  });
  const fetchTopSales = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch("http://localhost:8080/employee_and_admin/top-products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let labels = [];
      let dataPoints = [];

      data.forEach((item) => {
        labels.push(item.name);
        dataPoints.push(item.amount);
      });

      setChartData({
        ...chartData,
        labels: labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: dataPoints,
          },
        ],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    

    fetchTopSales();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">

      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Sales</h2>
      </header>
     
      {chartData.labels.length > 0 ? (
      <DoughnutChart data={chartData} width={389} height={260} />
    ) : (
      <p>Loading...</p>
    )}
    </div>
  );
}

export default TopSales;
