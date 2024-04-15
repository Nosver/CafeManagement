import React, { useState } from 'react';

import ProfitChart from '../../imported-assets/partials/dashboard/ProfitChart';
import ExpenditureIncome from '../../imported-assets/partials/dashboard/ExpenditureIncome';
import RealTimeUsdToTry from '../../imported-assets/partials/dashboard/RealTimeUsdToTry';
import TopSales from '../../imported-assets/partials/dashboard/TopSales';
import DashboardCard08 from '../../imported-assets/partials/dashboard/DashboardCard08';
import DashboardCard09 from '../../imported-assets/partials/dashboard/DashboardCard09';
import RecentReviews from '../../imported-assets/partials/dashboard/RecentReviews';
import DashboardCard12 from '../../imported-assets/partials/dashboard/DashboardCard12';
import DashboardCard13 from '../../imported-assets/partials/dashboard/DashboardCard13';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import LastTransactions from '../../imported-assets/partials/dashboard/LastTransactions';
import TopCustomersList from '../../imported-assets/partials/dashboard/TopCustomersList';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
<ProfitChart />
<ProfitChart />
<ProfitChart />
            <TopCustomersList />

            <RecentReviews />

            <LastTransactions />

            <ProfitChart />

            <ExpenditureIncome />

            <RealTimeUsdToTry />

            <TopSales />

            <DashboardCard08 />

            <DashboardCard09 />

            <DashboardCard12 />

            <DashboardCard13 />

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;