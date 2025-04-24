import StyleModal from '../HomePage/Modal.module.css'
import { useState, useEffect } from 'react';
import { Edit2, Search, PhilippinePeso } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const EditPrice = () => {

  const [servicesData, setServicesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceInputModalOpen, setPriceInputModalOpen] = useState(false);
  const [targetTable, setTargetTable] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [update, setUpdate] = useState(false);
  const reload = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const ref = collection(db, 'Price');
        const dataFetch = await getDocs(ref);

        const dataScope = dataFetch.docs.map(data => ({
          ...data.data()
        }))
        setServicesData(dataScope);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [update])

  const handleSearch = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const search = async () => {
      try {
        const ref = collection(db, 'Price');
        const dataFetch = await getDocs(ref);

        const filtered = dataFetch.docs.filter(doc => {
          const data = doc.data();
          return data.service.includes(searchQuery)
        });

        const dataScope = filtered.map(doc => ({
          ...doc.data()
        }))

        setServicesData(dataScope);
      } catch (err) {
        console.error(err);
      }
    }
    search()
  }, [searchQuery])


  useEffect(() => {
    const changePrice = async () => {
      try {

        const ref = collection(db, 'Price');
        const dataFetch = await getDocs(ref);

        const filteredOne = dataFetch.docs.filter(doc => {
          const data = doc.data();
          return data.service.includes(targetTable.service)
        })
        const filteredTwo = filteredOne.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        const filteredThree = filteredTwo.filter(doc => {
          return doc.description.includes(targetTable.description)
        })

        const dataScope = filteredThree.filter(doc => {
          return doc.option == targetTable.option
        })

        if (dataScope[0] != undefined) {
          const refWithId = doc(db, 'Price', dataScope[0].id);
          await updateDoc(refWithId, { price: `₱${newPrice}` })
        }

      } catch (err) {
        console.error(err);
      }
    }
    changePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  const onChangePrice = (e) => {
    setNewPrice(e.target.value);
  }

  const handlePrice = (e) => {
    e.preventDefault();
    setPriceInputModalOpen(!priceInputModalOpen);
    reload(0);
    setUpdate(!update);
  }

  const priceEdit = (item) => {
    setPriceInputModalOpen(!priceInputModalOpen);
    setTargetTable(item);
  }

  const closeModal = () => {
    setPriceInputModalOpen(!priceInputModalOpen);
  }


  return (<>
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </form>
    </div>

    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-cyan-300">
              <th className="p-2 border border-[#5D4037] color-white-600 text-left font-bold">SERVICES</th>
              <th className="p-2 border border-[#5D4037] text-left font-bold">OPTIONS</th>
              <th className="p-2 border border-[#5D4037] text-left font-bold">PRICE</th>
              <th className="p-2 border border-[#5D4037] text-left font-bold">DESCRIPTION</th>
              <th className="p-2 border border-[#795548] w-12"></th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#faebd7]" : "bg-[#faebd7]"}>
                <td className="p-2 border border-gray-300">{item.service}</td>
                <td className="p-2 border border-gray-300">{item.option}</td>
                <td className="p-2 border border-gray-300">{item.price}</td>
                <td className="p-2 border border-gray-300">{item.description}</td>
                <td className="p-2 border border-gray-300 flex justify-center">
                  <button className="text-gray-600 cursor-pointer" onClick={() => priceEdit(item)}>
                    <Edit2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {priceInputModalOpen ?
      <div className={StyleModal.modal}>
        <div className={StyleModal.overlay} onClick={closeModal}></div>
        <div className={StyleModal.modalContent}>
          <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
            <form onSubmit={handlePrice}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Set New Price
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhilippinePeso className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  onChange={onChangePrice}
                  placeholder="Enter new price"
                  className="block w-full pl-10 pr-20 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type='submit'
                    className="h-full px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      : null}

  </>);
};

export default EditPrice;