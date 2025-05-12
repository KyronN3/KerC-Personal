import { CheckCircle, Clock, Mail, Phone, ShoppingBag, XCircle, AlertTriangle, X, Trash2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { auth, db } from "../config/firebase";
import { getDocs, doc, collection, deleteDoc } from "firebase/firestore";
import OrderStatus from './OrderStatus.jsx'
import StyleModal from '../HomePage/Modal.module.css'
import { OrderStatusCloseContext } from "../context.jsx";

export default function OrdersGrid() {

  const { orderStatusOpen, setOrderStatusOpen } = useContext(OrderStatusCloseContext)
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dataFetch = await getDocs(collection(db, 'Order'));
      const dataSnap = dataFetch.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data()
      }))

      const filter = dataSnap.filter((doc) => {
        return doc.customerID == auth?.currentUser?.uid
      })
      setOrders(filter)
    }

    getData();
  })

  const toggleStatus = async (orderId) => {
    try {
      const getData = getDocs(collection(db, 'Receipt'));
      const dataSnap = (await getData).docs.map((doc) => ({
        docId: doc.id,
        ...doc.data()
      }))
      const filter = dataSnap.filter((doc) => {
        return doc.referencekey == orderId
      })
      const archiveData = getDocs(collection(db, 'ReceiptArchive'));
      const dataSnapArch = (await archiveData).docs.map((doc) => ({
        docId: doc.id,
        ...doc.data()
      }))
      const filterArch = dataSnapArch.filter((doc) => {
        return doc.referencekey == orderId
      })

      if (filterArch.length > 0) await deleteDoc(doc(db, 'ReceiptArchive', filterArch[0].docId));
      if (filter.length > 0) await deleteDoc(doc(db, 'Receipt', filter[0].docId));
      await deleteDoc(doc(db, 'Order', orderId));
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setOrderStatusOpen(false);
    setShowModal(false);
  }

  // Status badge configuration
  const statusConfig = {
    Pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      icon: <Clock className="w-4 h-4" />,
      text: "VIEW STATUS"
    },
    Completed: {
      color: "bg-green-100 text-green-800 border-green-300",
      icon: <CheckCircle className="w-4 h-4" />,
      text: "VIEW STATUS"
    },
    Cancelled: {
      color: "bg-red-100 text-red-800 border-red-300",
      icon: <XCircle className="w-4 h-4" />,
      text: "VIEW STATUS"
    }
  };

  const renderOrderCard = (order) => (

    <div key={order.docId} className="rounded-xl shadow-lg overflow-hidden border border-blue-200 mb-4">
      {/* Header */}
      <div style={{ backgroundColor: '#e3f2fd' }} className="px-4 py-3 md:px-6 md:py-4 border-b border-blue-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center">
          <ShoppingBag className="w-5 h-5 text-blue-600 mr-3" />
          <h2 className="text-md md:text-lg font-semibold text-blue-800 truncate">Order #{order.customerID}</h2>
        </div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[order.status].color}`}>
          {statusConfig[order.status].icon}
          <span className="ml-1 uppercase font-semibold">{order != null && order.status}</span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 bg-[#e3f2fd] md:grid-cols-12">

        {/* Left section: Customer details */}
        <div className="p-4 md:col-span-9 border-b md:border-b-0 md:border-r border-blue-200">
          <div className="grid grid-cols-1 gap-3">
            {/* Name and Email */}
            <div className="border-l-4 border-blue-400 pl-3">
              <h3 className="font-bold text-blue-900">{order.name}</h3>
              <div className="flex items-center text-blue-900 text-sm mt-1">
                <Phone size={14} className="mr-1 flex-shrink-0" />
                <span className="truncate">{order.phone}</span>
              </div>
              <div className="flex items-center text-blue-900 text-sm mt-1">
                <Mail size={14} className="mr-1 flex-shrink-0" />
                <span className="truncate">{order.email}</span>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center bg-blue-50 p-2 rounded-lg">
              <div className="rounded-full bg-blue-200 p-1.5 mr-2 flex-shrink-0">
                <Clock className="w-3 h-3 text-blue-700" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-medium text-blue-600">Due Date:</span>
                <span className="ml-1 text-blue-800 font-medium text-xs">{order.timeDate}</span>
              </div>
            </div>

            {/* Order Description */}
            <div className="p-3 rounded-lg border border-blue-200">
              <h4 className="text-xs font-medium text-blue-600 mb-1">Description:</h4>
              <p className="text-blue-800 text-xs">{order.description}</p>
            </div>
          </div>
        </div>

        {/* Right section: Actions */}
        <div className="p-4 flex flex-row md:flex-col justify-between md:col-span-3" style={{ backgroundColor: '#e3f2fd' }}>
          {/* Action Buttons */}
          <div className="flex flex-row md:flex-col gap-2 w-full">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg text-xs flex-1 md:flex-auto"
              onClick={() => setOrderStatusOpen(true)}
            >
              {statusConfig[order.status].text}
            </button>


            <button
              className="border border-red-500 hover:bg-red-50 text-red-600 py-2 px-3 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200 text-xs flex-1 md:flex-auto"
              onClick={() => { setId(order.docId); setShowModal(true) }}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              CANCEL/DELETE
            </button>

          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {orderStatusOpen && (
        <div className={StyleModal.modal}>
          <div className={StyleModal.overlay} onClick={closeModal}></div>
          <div className={StyleModal.modalContent}><OrderStatus customerID={orders != null && orders[0].docId} /></div>
        </div>
      )}

      <div className="p-2 md:p-4 overflow-auto h-full">
        {/* Title */}
        <h1 className="text-lg md:text-xl font-bold text-blue-900 mb-4">My Orders</h1>

        {/* Orders grid */}
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => renderOrderCard(order))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={closeModal}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden z-10">
            <div className="bg-blue-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-blue-600" size={20} />
                <h3 className="font-medium text-blue-800">Confirm Cancellation</h3>
              </div>
              <button
                onClick={closeModal}
                className="text-blue-600 cursor-pointer hover:text-blue-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <p className="text-gray-700 mb-4">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-blue-200 text-blue-600 cursor-pointer rounded hover:bg-blue-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { toggleStatus(id); setShowModal(false); }}
                  className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600 flex items-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}