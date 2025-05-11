import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrderHistory() {
  // Component designed to fit within:
  // <div className="flex flex-1 flex-row justify-center gap-4 p-4 pt-0 overflow-hidden">
  //   <div className="min-h-[100vh] text-[13px] flex-1 w-1 rounded-xl bg-muted/50 md:min-h-min inset-shadow-sm overflow-hidden">{toRender()}</div>
  // </div>

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Sample order data
  const orders = [
    {
      id: 42,
      date: '11/03/2022 09:26',
      deliveryDate: '11/18/2022',
      total: '$210.50',
      quantity: 11,
      status: 'SUBMITTED',
    },
    {
      id: 36,
      date: '11/01/2022 12:51',
      deliveryDate: '12/10/2022',
      total: '$65.00',
      quantity: 5,
      status: 'INVOICED',
    },
    {
      id: 35,
      date: '11/01/2022 12:40',
      deliveryDate: '12/07/2022',
      total: '$65.00',
      quantity: 5,
      status: 'SUBMITTED',
    },
    {
      id: 24,
      date: '11/02/2022 08:15',
      deliveryDate: '11/04/2022',
      total: '$82.50',
      quantity: 10,
      status: 'SUBMITTED',
    }
  ];

  // Uncomment the following line to test the empty state
  // const orders = [];

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log('Searching with date filters:', { fromDate, toDate });
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
  };

  // Pagination 
  const currentPage = 1;
  const totalPages = 1;
  const rowsPerPage = 10;
  const indexOfFirstItem = 0;
  const indexOfLastItem = orders.length;

  // Number of skeleton rows to display when empty - increased to fill space
  const skeletonRowCount = 15;

  // Skeleton loader component for empty state
  const SkeletonRow = ({ index }) => (
    <tr className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
      <td className="p-2 border-b border-gray-200">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-8"></div>
      </td>
      <td className="p-2 border-b border-gray-200">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
      </td>
      <td className="p-2 border-b border-gray-200">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
      </td>
      <td className="p-2 border-b border-gray-200">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
      </td>
      <td className="p-2 border-b border-gray-200">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-12"></div>
      </td>
      <td className="p-2 border-b border-gray-200">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-6"></div>
      </td>
    </tr>
  );

  return (
    <div className="w-full h-full py-4 px-3">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full m-1 flex flex-col">
        {/* Header */}
        <div className="p-3 md:p-4 bg-gray-50 border-b">
          <h1 className="text-base sm:text-lg font-bold mb-3">Order History</h1>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-1">
            <div className="sm:w-1/2">
              <label className="block text-xs font-medium text-gray-700 mb-1">FROM DATE</label>
              <select
                className="w-full border border-gray-300 rounded p-1.5 text-xs md:text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              >
                <option value="">Select Date</option>
                <option value="2022-11-01">Nov 1, 2022</option>
                <option value="2022-11-02">Nov 2, 2022</option>
                <option value="2022-11-03">Nov 3, 2022</option>
              </select>
            </div>

            <div className="sm:w-1/2">
              <label className="block text-xs font-medium text-gray-700 mb-1">TO DATE</label>
              <select
                className="w-full border border-gray-300 rounded p-1.5 text-xs md:text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              >
                <option value="">Select Date</option>
                <option value="2022-11-03">Nov 3, 2022</option>
                <option value="2022-11-10">Nov 10, 2022</option>
                <option value="2022-11-17">Nov 17, 2022</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-3 mb-1 gap-3">
            <button
              className="px-4 py-1.5 text-xs md:text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-opacity-50"
              onClick={handleClear}
            >
              CLEAR
            </button>
            <button
              className="px-4 py-1.5 text-xs md:text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSearch}
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* Table - Added flex-1 to make it expand */}
        <div className="overflow-auto flex-1 flex flex-col">
          <table className="w-full border-collapse min-w-full table-auto">
            <thead>
              <tr className="bg-blue-200 w-full text-gray-700">
                <th className="p-2 text-left font-medium border-b border-gray-200 text-xs sticky top-0">ID</th>
                <th className="p-2 text-left font-medium border-b border-gray-200 text-xs sticky top-0">NAME</th>
                <th className="p-2 text-left font-medium border-b border-gray-200 text-xs sticky top-0">DATE</th>
                <th className="p-2 text-left font-medium border-b border-gray-200 text-xs sticky top-0">DUE DATE</th>
                <th className="p-2 text-left font-medium border-b border-gray-200 text-xs sticky top-0">TOTAL</th>
                <th className="p-2 text-left font-medium border-b border-gray-200 text-xs sticky top-0">QTY</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                  >
                    <td className="p-2 border-b border-gray-200 font-medium text-xs">{order.id}</td>
                    <td className="p-2 border-b border-gray-200 text-xs">CAAMPED</td>
                    <td className="p-2 border-b border-gray-200 text-xs">{order.date}</td>
                    <td className="p-2 border-b border-gray-200 text-xs">{order.deliveryDate}</td>
                    <td className="p-2 border-b border-gray-200 text-xs">{order.total}</td>
                    <td className="p-2 border-b border-gray-200 text-xs">{order.quantity}</td>
                  </tr>
                ))
              ) : (
                // Skeleton loading state - many more rows to fill space
                Array.from({ length: skeletonRowCount }).map((_, index) => (
                  <SkeletonRow key={index} index={index} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - show with skeleton state when empty */}
        <div className="bg-gray-50 px-3 md:px-4 py-3 flex items-center justify-between border-t border-gray-200 mt-auto">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Prev
            </button>
            <button
              disabled={true}
              className="ml-3 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              {orders.length > 0 ? (
                <p className="text-xs text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > orders.length ? orders.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{orders.length}</span> results
                </p>
              ) : (
                <p className="text-xs text-gray-400">
                  No results to display
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-700">Rows:</span>
                <select
                  value={rowsPerPage}
                  disabled={orders.length === 0}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {[5, 10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>

                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    disabled={true}
                    className="relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 text-xs font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <span className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-xs font-medium text-gray-700">
                    {orders.length > 0 ? `${currentPage}/${totalPages}` : "0/0"}
                  </span>

                  <button
                    disabled={true}
                    className="relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 text-xs font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}