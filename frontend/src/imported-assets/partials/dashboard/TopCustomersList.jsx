import React from 'react';

function TopCustomersList() {

  const TopCustomers = [
    {
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      spent: 2890.66
    },
    {
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      spent: 2767.04
    },
    {
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      spent: 2596.00
    },
    {
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      spent: 1220.66
    },
    {
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      spent: 1190.66
    }
  ];


  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Customers</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th>

              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                TopCustomers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                         
                          <div className="font-medium text-slate-800 dark:text-slate-100">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.spent.toFixed(2)}₺</div>
                      </td>
                     
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default TopCustomersList;
