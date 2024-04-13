import React, { useState } from 'react';

import DashboardCard01 from '../../imported-assets/partials/dashboard/DashboardCard01';
import DashboardCard02 from '../../imported-assets/partials/dashboard/DashboardCard02';
import DashboardCard03 from '../../imported-assets/partials/dashboard/DashboardCard03';
import DashboardCard04 from '../../imported-assets/partials/dashboard/DashboardCard04';
import DashboardCard05 from '../../imported-assets/partials/dashboard/DashboardCard05';
import DashboardCard06 from '../../imported-assets/partials/dashboard/DashboardCard06';
import DashboardCard08 from '../../imported-assets/partials/dashboard/DashboardCard08';
import DashboardCard09 from '../../imported-assets/partials/dashboard/DashboardCard09';
import DashboardCard11 from '../../imported-assets/partials/dashboard/DashboardCard11';
import DashboardCard12 from '../../imported-assets/partials/dashboard/DashboardCard12';
import DashboardCard13 from '../../imported-assets/partials/dashboard/DashboardCard13';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import LastTransactions from '../../imported-assets/partials/dashboard/LastTransactions';
import TopCustomersList from '../../imported-assets/partials/dashboard/TopCustomersList';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Siderbar_1 />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">

            {/* Line chart (Acme Plus) */}
            <DashboardCard01 />
            {/* Line chart (Acme Advanced) */}
            <DashboardCard02 />
            {/* Line chart (Acme Professional) */}
            <DashboardCard03 />
            {/* Bar chart (Direct vs Indirect) */}
            <DashboardCard04 />
            {/* Line chart (Real Time Value) */}
            <DashboardCard05 />
            {/* Doughnut chart (Top Countries) */}
            <DashboardCard06 />
            {/* Table (Top Channels) */}
            <LastTransactions />
            {/* Line chart (Sales Over Time) */}
            <DashboardCard08 />
            {/* Stacked bar chart (Sales VS Refunds) */}
            <DashboardCard09 />
            {/* Card (Customers) */}
            <TopCustomersList />
            {/* Card (Reasons for Refunds) */}
            <DashboardCard11 />
            {/* Card (Recent Activity) */}
            <DashboardCard12 />
            {/* Card (Income/Expenses) */}
            <DashboardCard13 />

          </div>

        </div>

      </div>
    </div>
      );
}

      export default Dashboard;