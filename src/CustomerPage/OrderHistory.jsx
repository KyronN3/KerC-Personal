import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrderHistory() {
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataFetch = await getDocs(collection(db, 'Order'));
        const dataSnap = dataFetch.docs.map((doc) => ({
          docId: doc.id,
          id: doc.id,
          ...doc.data()
        }));

        const filterByUser = dataSnap.filter((doc) =>
          doc.customerID === auth?.currentUser?.uid
        );

        const filterProgress = filterByUser.filter((doc) =>
          doc.status !== "Pending"
        );

        setData(filterProgress);
        setFilteredData(filterProgress);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    getData();
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();

    if (!date) {
      setFilteredData(data);
      return;
    }

    // Filter data based on selected date
    const selectedDate = new Date(date).toDateString();
    const filtered = data.filter((order) => {
      const orderDate = new Date(order.timeDate).toDateString();
      return orderDate === selectedDate;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setDate('');
    setFilteredData(data);
    setCurrentPage(1);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Number of skeleton rows to display when empty
  const skeletonRowCount = 15;

  // Skeleton loader component for empty state
  const SkeletonRow = ({ index }) => (
    <tr className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
      {[6, 12, 16, 14, 10, 5].map((width, colIndex) => (
        <td key={colIndex} className="p-1.5 border-b border-gray-200">
          <div className={`h-4 bg-gray-200 rounded animate-pulse w-${width}`}></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="w-full h-full py-2 px-2 sm:py-4 sm:px-3">
      <div className="bg-[#e3f2fd] rounded-lg shadow-sm overflow-hidden h-full m-0 sm:m-1 flex flex-col">
        {/* Header */}
        <div className="p-2 sm:p-3 md:p-4 bg-gray-50 border-b">
          <h1 className="text-sm sm:text-base font-bold mb-2 sm:mb-3">Order History</h1>

          {/* Simplified Search Bar */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-end">
            <div className="w-full sm:w-64">
              <label className="block text-xs font-medium text-gray-700 mb-1">SEARCH BY DATE</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {date && (
                  <button
                    onClick={() => setDate('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors"
                onClick={handleClear}
              >
                CLEAR
              </button>
              <button
                className="px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                onClick={handleSearch}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {/* Table - Added flex-1 to make it expand */}
        <div className="overflow-auto flex-1 flex flex-col">
          <table className="w-full border-collapse min-w-full table-auto">
            <thead>
              <tr className="bg-blue-200 w-full text-gray-700">
                <th className="p-1.5 text-left font-medium border-b border-gray-200 text-[10px] sm:text-xs sticky top-0">ID</th>
                <th className="p-1.5 text-left font-medium border-b border-gray-200 text-[10px] sm:text-xs sticky top-0">NAME</th>
                <th className="p-1.5 text-left font-medium border-b border-gray-200 text-[10px] sm:text-xs sticky top-0">STATUS</th>
                <th className="p-1.5 text-left font-medium border-b border-gray-200 text-[10px] sm:text-xs sticky top-0">DATE</th>
                <th className="p-1.5 text-left font-medium border-b border-gray-200 text-[10px] sm:text-xs sticky top-0">TOTAL</th>
                <th className="p-1.5 text-left font-medium border-b border-gray-200 text-[10px] sm:text-xs sticky top-0">QTY</th>
              </tr>
            </thead>
            <tbody className="text-[10px] sm:text-[11px]">
              {filteredData.length > 0 ? (
                currentItems.map((order, index) => (
                  <tr
                    key={order.id}
                    className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                  >
                    <td className="p-1.5 border-b border-gray-200 font-medium text-[13px] md:text-[13px] sm:text-xs truncate max-w-[50px]">
                      {order.customerID}
                    </td>
                    <td className="p-1.5 border-b border-gray-200 text-[13px] md:text-[13px] sm:text-xs">
                      {order.name}
                    </td>
                    <td className="p-1.5 border-b border-gray-200 text-[13px] md:text-[13px] sm:text-xs">
                      {order.status}
                    </td>
                    <td className="p-1.5 border-b border-gray-200 text-[13px] md:text-[13px] sm:text-xs">
                      {order.timeDate?.slice(0, 10)}
                    </td>
                    <td className="p-1.5 border-b border-gray-200 text-[13px] md:text-[13px] sm:text-xs">
                      {parseInt(order.price?.slice(1)) * order.quantity}
                    </td>
                    <td className="p-1.5 border-b border-gray-200 text-[13px] md:text-[13px] sm:text-xs">
                      {order.quantity}
                    </td>
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
        <div className="bg-gray-50 px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex items-center justify-between border-t border-gray-200 mt-auto">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-md ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`ml-2 relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-md ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              {filteredData.length > 0 ? (
                <p className="text-xs text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredData.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredData.length}</span> results
                </p>
              ) : (
                <p className="text-xs text-gray-400">
                  No results to display
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xs text-gray-700">Rows:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  disabled={filteredData.length === 0}
                  className="border border-gray-300 rounded px-1.5 py-0.5 text-xs"
                >
                  {[5, 10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>

                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-1.5 py-1 rounded-l-md border border-gray-300 text-xs font-medium ${currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-3 w-3" />
                  </button>

                  <span className="relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700">
                    {filteredData.length > 0 ? `${currentPage}/${totalPages}` : "0/0"}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-1.5 py-1 rounded-r-md border border-gray-300 text-xs font-medium ${currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-3 w-3" />
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