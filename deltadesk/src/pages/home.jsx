/* eslint-disable no-unused-vars */
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/app-header";
import CustomTable from "../components/app-table";
import DeleteButton from "../partials/actions/DeleteButton";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const data = [
    {
      col1: "Hello",
      col2: "World",
    },
    {
      col1: "react-table",
      col2: "rocks",
    },
    {
      col1: "whatever",
      col2: "you want",
    },
  ];

  const columns = [
    {
      header: "Column 1",
      accessorKey: "col1",
    },
    {
      header: "Column 2",
      accessorKey: "col2",
    },
  ];

  const handleRowSelect = (row) => {
    console.log("Selected row:", row);
    const isSelected = selectedItems.some((item) => item.col1 === row.col1); // Check if row is already selected
    if (!isSelected) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, row]);
    } else {
      // If row is already selected, remove it from selectedItems
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.col1 !== row.col1)
      );
    }
  };

  const handleAllRowsSelect = (selected) => {
    if (selected) {
      setSelectedItems(data); // Select all rows
    } else {
      setSelectedItems([]); // Deselect all rows
    }
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
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                  Customers ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />

                {/* Add customer button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Customer</span>
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 mb-8 px-5 py-6 relative">
              <div className="sm:flex sm:justify-between sm:items-center">
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <form className="relative">
                    <div className="flex space-x-4 mb-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="city"
                        >
                          City <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="city"
                          className="form-input w-full"
                          type="text"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="postal-code"
                        >
                          Postal Code <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="postal-code"
                          className="form-input w-full"
                          type="text"
                        />
                      </div>
                      <div className="flex-2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="form-search"
                        >
                          Search <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="form-search"
                          className="form-input w-full pl-9"
                          type="search"
                        />
                      </div>
                    </div>
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white justify-start sm:justify-end">
                      <span className="hidden xs:block ml-2">Search</span>
                    </button>
                  </form>
                  
                </div>
              </div>
            </div>
            <div>
            
              <CustomTable
                columns={columns}
                data={data}
                onRowSelect={handleRowSelect}
                onAllRowsSelect={handleAllRowsSelect} 
                initialPageIndex={0} // Khởi tạo với trang 2 (pageIndex 1)
                initialPageSize={20} // Khởi tạo với 20 hàng mỗi trang
                includeCheckboxColumn={true} // Include checkbox column
                selectedItems={selectedItems}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
