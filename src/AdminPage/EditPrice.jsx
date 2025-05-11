import { useState, useEffect, useRef } from 'react';
import { Edit2, Search, PhilippinePeso, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import LoadingScreen from '../LoadingScreen';

const EditPrice = () => {
  const [servicesData, setServicesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceInputModalOpen, setPriceInputModalOpen] = useState(false);
  const [targetTable, setTargetTable] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('service');
  const [sortDirection, setSortDirection] = useState('asc');

  const modalRef = useRef(null);
  const targetRowRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const ref = collection(db, 'Price');
        const dataFetch = await getDocs(ref);
        setTimeout(() => { setLoading(false) }, 600);
        const dataScope = dataFetch.docs.map(data => ({
          ...data.data()
        }));
        setServicesData(dataScope);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  },);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  useEffect(() => {
    const search = async () => {
      try {
        const ref = collection(db, 'Price');
        const dataFetch = await getDocs(ref);

        const filtered = dataFetch.docs.filter(doc => {
          const data = doc.data();
          return data.service.toLowerCase().includes(searchQuery.toLowerCase());
        });

        const dataScope = filtered.map(doc => ({
          ...doc.data()
        }));

        setServicesData(dataScope);
      } catch (err) {
        console.error(err);
      }
    };
    search();
  }, [searchQuery]);

  useEffect(() => {
    const changePrice = async () => {
      try {
        const ref = collection(db, 'Price');
        const dataFetch = await getDocs(ref);

        const filteredOne = dataFetch.docs.filter(doc => {
          const data = doc.data();
          return data.service.includes(targetTable.service);
        });

        const filteredTwo = filteredOne.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const filteredThree = filteredTwo.filter(doc => {
          return doc.description.includes(targetTable.description);
        });

        const dataScope = filteredThree.filter(doc => {
          return doc.option === targetTable.option;
        });

        if (dataScope[0] !== undefined) {
          const refWithId = doc(db, 'Price', dataScope[0].id);
          await updateDoc(refWithId, { price: `₱${newPrice}` });
        }
      } catch (err) {
        console.error(err);
      }
    };
    changePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const onChangePrice = (e) => {
    setNewPrice(e.target.value);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setPriceInputModalOpen(false);
    setUpdate(!update);
  };

  const priceEdit = (item, index) => {
    setTargetTable({ ...item, rowIndex: index });
    setPriceInputModalOpen(true);
    setNewPrice('');
  };

  const closeModal = () => {
    setPriceInputModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Enter') {
      handlePrice(e);
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...servicesData].sort((a, b) => {
    if (sortField === 'price') {
      const priceA = parseFloat(a[sortField].replace('₱', '').replace(',', ''));
      const priceB = parseFloat(b[sortField].replace('₱', '').replace(',', ''));
      return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
    }

    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 opacity-30" />;
    return sortDirection === 'asc' ?
      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" /> :
      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 transform rotate-180" />;
  };

  return (
    <div className="w-full h-full py-4 px-3">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full m-1 flex flex-col">
        {/* Header and Search Bar */}
        <div className="p-3 md:p-4 bg-gray-50 border-b">
          <h1 className="text-base sm:text-lg font-bold mb-3">Price Management</h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-1.5 pl-8 pr-3 text-xs md:text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-1.5 text-xs md:text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
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
                <th
                  className="p-1 sm:p-2 text-left font-medium border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs sticky top-0 cursor-pointer"
                  onClick={() => toggleSort('service')}
                >
                  <div className="flex items-center space-x-1">
                    <span>SERVICE</span>
                    <SortIcon field="service" />
                  </div>
                </th>
                <th
                  className="p-1 sm:p-2 text-left font-medium border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs sticky top-0 cursor-pointer"
                  onClick={() => toggleSort('option')}
                >
                  <div className="flex items-center space-x-1">
                    <span>OPTIONS</span>
                    <SortIcon field="option" />
                  </div>
                </th>
                <th
                  className="p-1 sm:p-2 text-left font-medium border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs sticky top-0 cursor-pointer"
                  onClick={() => toggleSort('price')}
                >
                  <div className="flex items-center space-x-1">
                    <span>PRICE</span>
                    <SortIcon field="price" />
                  </div>
                </th>
                <th
                  className="p-1 sm:p-2 text-left font-medium border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs sticky top-0 cursor-pointer"
                  onClick={() => toggleSort('description')}
                >
                  <div className="flex items-center space-x-1">
                    <span>DESCRIPTION</span>
                    <SortIcon field="description" />
                  </div>
                </th>
                <th className="p-1 sm:p-2 text-center font-medium border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs sticky top-0 w-8 sm:w-12">
                  EDIT
                </th>
              </tr>
            </thead>
            <tbody className="text-[11px] xs:text-xs sm:text-[13px]">
              {currentItems.map((item, index) => {
                // Calculate the actual index in the full dataset
                const actualIndex = indexOfFirstItem + index;

                return (
                  <tr
                    key={index}
                    className={actualIndex % 2 === 0 ? "bg-blue-50" : "bg-white"}
                    ref={targetTable.rowIndex === actualIndex ? targetRowRef : null}
                    style={targetTable.rowIndex === actualIndex && update ? { backgroundColor: '#fff3cd' } : {}}
                  >
                    <td className="p-1 sm:p-2 border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs">{item.service}</td>
                    <td className="p-1 sm:p-2 border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs">
                      <span className={`inline-flex px-1 sm:px-1.5 py-0.5 text-[10px] xs:text-[11px] sm:text-xs font-medium rounded-full ${item.option === 'Premium' ? 'bg-green-100 text-green-800' :
                        item.option === 'Basic' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {item.option}
                      </span>
                    </td>
                    <td className="p-1 sm:p-2 border-b border-gray-200 font-medium text-[11px] xs:text-xs sm:text-xs">{item.price}</td>
                    <td className="p-1 sm:p-2 border-b border-gray-200 text-[11px] xs:text-xs sm:text-xs">
                      <div className="break-words max-w-[100px] sm:max-w-full">{item.description}</div>
                    </td>
                    <td className="p-1 sm:p-2 border-b border-gray-200 text-center">
                      <button
                        className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
                        onClick={() => priceEdit(item, actualIndex)}
                        aria-label={`Edit price for ${item.service} ${item.option}`}
                      >
                        <Edit2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 mt-auto">
          <div className="w-full mb-2 sm:mb-0 sm:hidden">
            <p className="text-[11px] text-gray-700 text-center">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {indexOfLastItem > sortedData.length ? sortedData.length : indexOfLastItem}
              </span>{' '}
              of <span className="font-medium">{sortedData.length}</span> results
            </p>
            <div className="flex items-center justify-center space-x-3 mt-1">
              <span className="text-[11px] text-gray-700">Rows:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-[11px]"
              >
                {[5, 10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-1 border border-gray-300 text-[11px] font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Prev
            </button>
            <span className="text-[11px] font-medium text-gray-700">
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`relative inline-flex items-center px-2 py-1 border border-gray-300 text-[11px] font-medium rounded-md ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {indexOfLastItem > sortedData.length ? sortedData.length : indexOfLastItem}
                </span>{' '}
                of <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-700">Rows:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
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
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 text-xs font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>

                  <span className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-xs font-medium text-gray-700">
                    {currentPage}/{totalPages}
                  </span>

                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 text-xs font-medium ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Edit Modal */}
      {priceInputModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
              aria-label="Close modal"
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              ref={modalRef}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-base sm:text-lg font-medium leading-6 text-gray-900 mb-2">
                      Edit Price: {targetTable.service} - {targetTable.option}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">Current price: {targetTable.price}</p>

                    <form onSubmit={handlePrice}>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Set New Price
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhilippinePeso className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={newPrice}
                          onChange={onChangePrice}
                          placeholder="Enter new price"
                          className="block w-full pl-10 pr-20 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <button
                            type='submit'
                            className="h-full px-4 bg-blue-500 text-white text-xs sm:text-sm rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingScreen />}
    </div>
  );
};

export default EditPrice;