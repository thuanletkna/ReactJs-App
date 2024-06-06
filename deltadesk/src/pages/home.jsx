/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/app-header';
import CustomTable from '../components/app-table';

function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      col1: 'whatever',
      col2: 'you want',
    },
  ];
  
  const columns = [
    // {
    //   header: 'Checkbox', // Header for checkbox column
    //   cell: (row) => (
    //     <input type="checkbox" onChange={(e) => e.stopPropagation()} />
    //   ),
    //   // No accessorKey needed for checkbox column
    // },
    {
      header: 'Column 1',
      accessorKey: 'col1',
    },
    {
      header: 'Column 2',
      accessorKey: 'col2',
    },
  ];

  const handleRowSelect = (row) => {
    console.log('Selected row:', row);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
           
            <div>
              <CustomTable 
                columns={columns} 
                data={data} 
                // onRowSelect={handleRowSelect} 
                initialPageIndex={1} // Khởi tạo với trang 2 (pageIndex 1)
                initialPageSize={20} // Khởi tạo với 20 hàng mỗi trang
                includeCheckboxColumn={true} // Include checkbox column
              />
            </div>
          </div>
        </main>

      </div>

    </div>
  );
}

export default Home;
