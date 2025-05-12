import { useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase.jsx';
import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { ClipboardCheck, AlertTriangle, Trash2, X, Clock, Mail, Phone, CheckCircle } from 'lucide-react';
import { ReceiptContext, ViewReceiptOpenContext, PostCloseContext } from '../context.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen.jsx';
import StatusUpdate from './StatusUpdate.jsx';
import StyleModal from '../HomePage/Modal.module.css'

const CustomerOrder = () => {

  const { postClose, setPostClose } = useContext(PostCloseContext);
  const { setReceiptId } = useContext(ReceiptContext);
  const { setViewReceiptOpen } = useContext(ViewReceiptOpenContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [targetTableDeleteConfirm, setTargetTableDeleteConfirm] = useState('');
  const [targetTableDelete, setTargetTableDelete] = useState('');
  const [targetTable, setTargetTable] = useState('');
  const [targetTableReceipt, setTargetReceipt] = useState('');
  const [uid, setUid] = useState('');
  const reload = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const ref = collection(db, 'Order');
        const dataFetch = await getDocs(ref);
        setTimeout(() => { setLoading(false) }, 600);
        const dataReceive = dataFetch.docs.map(doc => ({
          docId: doc.id,
          ...doc.data()
        }));

        const filter = dataReceive.filter((doc) => {
          return doc.status != "Cancelled"
        })
        setData(filter);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  });

  useEffect(() => {
    const del = async () => {
      const ref = collection(db, 'Order');
      const dataFetch = await getDocs(ref);

      const filteredOne = dataFetch.docs.filter(doc => {
        const data = doc.data();
        return data.service.includes(targetTableDelete.service);
      });
      const filteredTwo = filteredOne.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filteredThree = filteredTwo.filter(doc => {
        return doc.description.includes(targetTableDelete.description);
      });

      const dataScope = filteredThree.filter(doc => {
        return doc.customerID == targetTableDelete.customerID;
      });

      if (dataScope[0] != undefined) {
        const refWithId = doc(db, 'Order', dataScope[0].id);
        await deleteDoc(refWithId);

        const refWithReceipt = collection(db, 'Receipt');
        const receiptFetch = await getDocs(refWithReceipt);
        const referencekey = receiptFetch.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (dataScope[0] != undefined) {
          const filtered = referencekey.filter(doc => {
            return doc.referencekey == dataScope[0].id;
          });
          await deleteDoc(doc(db, 'Receipt', filtered[0].id));
          setViewReceiptOpen(false);
          reload('/createtask');
        }
      }
    };
    del();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetTableDeleteConfirm]);

  useEffect(() => {
    const select = async () => {
      const ref = collection(db, 'Order');
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
        return doc.customerID == targetTable.customerID;
      });
      if (dataScope[0] != undefined) {
        setUid(dataScope[0].id);
      }
    };
    select();
  }, [targetTable]);

  const createdReceipt = async (docData) => {
    try {
      const ref = collection(db, 'Receipt');
      if (!docData.isReceipt) {
        await addDoc(ref, {
          referencekey: docData.referencekey,
          quantity: docData.quantity,
          price: docData.price,
          service: docData.service,
        });

        await addDoc(collection(db, 'ReceiptArchive'), {
          referencekey: docData.referencekey,
          quantity: docData.quantity,
          price: docData.price,
          service: docData.service,
        });

      }

      const refWithId = doc(db, 'Order', docData.referencekey);
      await updateDoc(refWithId, { isReceipt: true });

      const getData = await getDocs(collection(db, 'Archive'));
      const archiveData = getData.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data()
      }));
      const id = archiveData.filter(doc => {
        return doc.referencekey == docData.referencekey;
      });
      if (id[0] != undefined) await updateDoc(doc(db, 'Archive', id[0].docId), { isReceipt: true });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const selectReceipt = async () => {
      const ref = collection(db, 'Order');
      const dataFetch = await getDocs(ref);

      const filteredOne = dataFetch.docs.filter(doc => {
        const data = doc.data();
        return data.service.includes(targetTableReceipt.service);
      });

      const filteredTwo = filteredOne.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filteredThree = filteredTwo.filter(doc => {
        return doc.description.includes(targetTableReceipt.description);
      });

      const dataScope = filteredThree.filter(doc => {
        return doc.customerID == targetTableReceipt.customerID;
      });

      const refWithReceipt = collection(db, 'Receipt');
      const receiptFetch = await getDocs(refWithReceipt);
      const referencekey = receiptFetch.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (dataScope[0] != undefined) {
        const filtered = referencekey.filter(doc => {
          return doc.referencekey == dataScope[0].id;
        });
        setReceiptId(filtered[0].id);
      }
    };
    selectReceipt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetTableReceipt]);

  const toDelete = (item) => {
    setShowModal(true);
    setTargetTableDelete(item);
  };

  useEffect(() => {
    if (isDelete) {
      setTargetTableDeleteConfirm(targetTableDelete);
      setIsDelete(false);
      setShowModal(false);
    } else return;
  }, [targetTableDelete, isDelete]);

  const clipboardCheck = async (item) => {
    setTargetTable(item);
    setPostClose(true)
  };

  const closeModal = () => {
    setPostClose(false)
    setShowModal(false);
    setViewReceiptOpen(false);
  };

  const viewReceipt = (item) => {
    setTargetReceipt(item);
    setViewReceiptOpen(true);
  };

  const handleDelete = () => {
    setIsDelete(true);
  };

  const getStatusTag = (status) => {
    if (status === "COMPLETED") {
      return <div className="flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
        <CheckCircle size={12} className="mr-1" />
        <span>COMPLETED</span>
      </div>;
    } else if (status === "CANCELLED") {
      return <div className="flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
        <X size={12} className="mr-1" />
        <span>CANCELLED</span>
      </div>;
    } else {
      return <div className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
        <Clock size={12} className="mr-1" />
        <span>PENDING</span>
      </div>;
    }
  };

  // Mock order ID generator (replace with your actual logic)
  const getOrderId = (index) => {
    return String(index)
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-800">Customer Orders</h2>
      </div>

      <div className="space-y-4 overflow-auto max-h-[38vh] pr-2">
        {data.map((doc, index) => {

          return (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-blue-100">
              <div className="flex items-center justify-between p-4 bg-blue-50 border-b border-blue-100">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">{index + 1}</span>
                  </div>
                  <h3 className="font-medium text-[10px] md:text-[16px] text-blue-800">Order# ({getOrderId(doc.customerID)})</h3>
                </div>
                {getStatusTag(doc.status.toUpperCase())}
              </div>

              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-start">
                  {/* Customer Info */}
                  <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <h4 className="font-medium text-gray-700">{doc.name}</h4>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Phone size={14} className="mr-1" />
                      <span>{doc.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Mail size={14} className="mr-1" />
                      <span className="truncate">{doc.email}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <Clock size={14} className="mr-1" />
                      <span>Due: {doc.timeDate}</span>
                    </div>
                    <button
                      onClick={() => clipboardCheck(doc)}
                      className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ClipboardCheck size={16} className="mr-1" />
                      <span>Update Status</span>
                    </button>
                  </div>

                  {/* Order Description */}
                  <div className="w-full md:w-2/4 mb-4 md:mb-0 md:px-4">
                    <h4 className="font-medium text-gray-700 mb-1">Description</h4>
                    <p className="text-gray-600 text-sm">{doc.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full md:w-1/4 flex flex-col space-y-2">
                    {!doc.isReceipt ? (
                      <button
                        onClick={() => createdReceipt(doc)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
                      >
                        CREATE RECEIPT
                      </button>
                    ) : (
                      <button
                        onClick={() => viewReceipt(doc)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
                      >
                        VIEW RECEIPT
                      </button>
                    )}

                    <button
                      onClick={() => toDelete(doc)}
                      className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2 rounded-md text-sm font-medium"
                    >
                      CANCEL/DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Status Update Modal */}
      {postClose && (
        <div className={StyleModal.modal}>
          <div className={StyleModal.overlay} onClick={closeModal}></div>
          <div className={StyleModal.modalContent}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden z-10">
              <div className="bg-blue-50 px-4 py-3 flex items-center justify-between border-b border-blue-100">
                <h3 className="font-medium text-blue-800">Order Status</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <StatusUpdate value={uid} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className={StyleModal.modal}>
          <div className={StyleModal.overlay} onClick={closeModal}></div>
          <div className={StyleModal.modalContent}>

            <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden z-10">
              <div className="bg-blue-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-blue-600" size={20} />
                  <h3 className="font-medium text-blue-800">Confirm Cancellation</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-blue-600 hover:text-blue-800"
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
                    className="px-4 py-2 border border-blue-200 text-blue-600 rounded hover:bg-blue-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-1"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
      {loading && <LoadingScreen />}
    </>
  );
};

export default CustomerOrder;