import React, { useState } from 'react';

import ProfitChart from '../../imported-assets/partials/dashboard/ProfitChart';
import ExpenditureIncome from '../../imported-assets/partials/dashboard/ExpenditureIncome';
import Currency from '../../imported-assets/partials/dashboard/Currency';
import TopSales from '../../imported-assets/partials/dashboard/TopSales';
import DashboardCard08 from '../../imported-assets/partials/dashboard/DashboardCard08';
import DashboardCard09 from '../../imported-assets/partials/dashboard/DashboardCard09';
import RecentReviews from '../../imported-assets/partials/dashboard/RecentReviews';
import LastComments from '../../imported-assets/partials/dashboard/LastComments';
import CriticalStocks from '../../imported-assets/partials/dashboard/CriticalStocks';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import LastTransactions from '../../imported-assets/partials/dashboard/LastTransactions';
import TopCustomersList from '../../imported-assets/partials/dashboard/TopCustomersList';
import { BStats } from '../../imported-assets/partials/dashboard/BStats';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'js-cookie';
import UnauthorizedPage from '../UnauthorizedPage';
import { useEffect } from 'react';

function Dashboard() {

  const ROLE = Cookies.get('role');
  console.log(ROLE);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);

  const [CustomerCount, setCustomerCount] = useState(0);

  const fetchCompaynData = async () => {
    const token = Cookies.get('token');

    if (!token) {
        setError('No token found');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/employee_and_admin/user-role-count', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        data.forEach(item => {
          if (item.role === 'EMPLOYEE') {
            setEmployeeCount(item.count);
          } else if (item.role === 'CUSTOMER') {
            setCustomerCount(item.count);
          } else if (item.role === 'ADMIN') {

          }
        });


    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    fetchCompaynData()
  }, [])
  


  const userName = "Dan Joe";
  return (
    <div>

      <Siderbar_1 />

      <div class="p-4 sm:ml-64">
        <div class="rounded-sm clgz1 ct1ew clq63 c4ijw c917q ce97l c5mbg">



          <div class="bg-gradient-to-r from-slate-800 via-pink-500 to-purple-500 py-8 px-6 rounded-lg shadow-lg">
            <h1 class="text-white text-3xl font-bold mb-4">Good afternoon, {userName} 👋</h1>
          </div>


        </div>
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">

            {ROLE === "ADMIN" && (
              <>
                <BStats Label={"Customers"} Data={CustomerCount} Icon={faUserTie} />
                <BStats Label={"Monthly Profit"} Data={"95.550₺"} Icon={faMoneyBill1} />
                <BStats Label={"Employees"} Data={employeeCount} Icon={faUsers} />
              </>
            )}

            <TopCustomersList />

            <RecentReviews />

            {ROLE === "ADMIN" && (
              <>
                <LastTransactions />
                <ProfitChart />
                <ExpenditureIncome />
              </>
            )}

            <TopSales />

           

            <LastComments />

            <CriticalStocks />
            <Currency title='USD to TRY Exchange Rate' convertCurrency='TRY' baseCurrency='USD' />
            <Currency title='EUR to TRY Exchange Rate' convertCurrency='TRY' baseCurrency='EUR' />


          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;