import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';



export const TestPage = () => {


  
    useEffect(() => {
        const options = {
          chart: {
            height: 230,
            width: 230,
            type: 'donut',
            zoom: {
              enabled: false
            }
          },
          plotOptions: {
            pie: {
              donut: {
                size: '76%'
              }
            }
          },
          series: [47, 23, 30],
          labels: ['Tailwind CSS', 'Preline UI', 'Others'],
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 5
          },
          grid: {
            padding: {
              top: -12,
              bottom: -11,
              left: -12,
              right: -12
            }
          },
          states: {
            hover: {
              filter: {
                type: 'none'
              }
            }
          },
          colors: ['#3b82f6', '#22d3ee', '#e5e7eb'],
          
        };
    
        const chart = new ApexCharts(document.getElementById('hs-doughnut-chart'), options);
        chart.render();
      }, []);
    
      return (
        <div className="flex flex-col justify-center items-center">
          <div id="hs-doughnut-chart"></div>
    
          <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
              <span className="text-[13px] text-gray-600">Income</span>
            </div>
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
              <span className="text-[13px] text-gray-600">Outcome</span>
            </div>
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2"></span>
              <span className="text-[13px] text-gray-600">Others</span>
            </div>
          </div>
        </div>
      );
    
}


