import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem'; // adjust the path according to your file structure

let tabActiveStatus = {
    dashboard: false,
    orders: false,
    stocks: false,
    products: false
};

function handleActiveTab(tab) {
    // Set all tabActiveStatus to false
    let newTabActiveStatus = { ...tabActiveStatus };
    for (let key in newTabActiveStatus) {
        newTabActiveStatus[key] = false;
    }

    // Set the clicked tab to true
    newTabActiveStatus[tab] = true;

    // Update the state
    setTabActiveStatus(newTabActiveStatus);
}

export const Siderbar_1 = () => {

    const text_color = "text-gray-200";
    const bg_color = "bg-slate-800";
    const hover_color = "hover:bg-purple-700";
    const active_color = "bg-purple-700";

    const navigate = useNavigate();
    const location = useLocation();


    return (

        <div >

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class={`h-full px-3 py-4 overflow-y-auto ${bg_color}`}>
                    <ul class="space-y-2 font-medium">

                        <SidebarItem 
                            path="/dashboard" 
                            handleActiveTab={handleActiveTab}
                        >
                            <span class="flex-1 ms-3 whitespace-nowrap text-white">Dashboard</span>
                        </SidebarItem>
                        
                        <SidebarItem 
                            path="/orders" 
                            handleActiveTab={handleActiveTab}
                        >
                            <span class="flex-1 ms-3 whitespace-nowrap text-white">Orders</span>
                        </SidebarItem>

                        <SidebarItem 
                            path="/stocks" 
                            handleActiveTab={handleActiveTab}
                        >
                            <span class="flex-1 ms-3 whitespace-nowrap text-white">Stocks</span>
                        </SidebarItem>

                        <SidebarItem 
                            path="/products" 
                            handleActiveTab={handleActiveTab}
                        >
                            <span class="flex-1 ms-3 whitespace-nowrap text-white">Products</span>
                        </SidebarItem>

                    </ul>
                </div>
            </aside>

        </div>
    )
}
