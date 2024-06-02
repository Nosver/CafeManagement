import React, { useState } from 'react';
import BarChart from '../../charts/BarChart03';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { tailwindConfig } from '../../utils/Utils';

function RecentReviews() {
  const [starCount, setStarCount] = useState(null);

  const fetchReviews = async () => {
    const token = Cookies.get('token');

    try {
      const response = await fetch('http://localhost:8080/employee_and_admin/starCount', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStarCount(data);

    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!starCount) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: ['Ratings'],
    datasets: [
      {
        label: 'Five Stars',
        data: [starCount.fiveStar],
        backgroundColor: tailwindConfig().theme.colors.green[800],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Four Stars',
        data: [starCount.fourStar],
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[200],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Three Stars',
        data: [starCount.threeStar],
        backgroundColor: tailwindConfig().theme.colors.yellow[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[200],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Two Stars',
        data: [starCount.twoStar],
        backgroundColor: tailwindConfig().theme.colors.orange[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[200],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'One Star',
        data: [starCount.oneStar],
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
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Reviews</h2>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{starCount.fiveStar + starCount.fourStar +starCount.threeStar +starCount.twoStar +starCount.oneStar}</div>
        </div>
      </div>
      <div className="grow">
        <BarChart data={chartData}  />
      </div>
    </div>
  );
}

export default RecentReviews;
