import { useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase.jsx'
import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'
import { ClipboardCheck, AlertTriangle, Trash2, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { ReceiptContext, ViewReceiptOpenContext } from '../context.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen.jsx';
import StatusUpdate from './StatusUpdate.jsx';
import StyleModal from '../HomePage/Modal.module.css'
import styles from './CustomerOrder.module.css';



const CustomerOrder = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setReceiptId } = useContext(ReceiptContext);
  const { viewReceiptOpen } = useContext(ViewReceiptOpenContext)
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [targetTableDeleteConfirm, setTargetTableDeleteConfirm] = useState('');
  const [targetTableDelete, setTargetTableDelete] = useState('');
  const [targetTable, setTargetTable] = useState('');
  const [targetTableReceipt, setTargetReceipt] = useState('');
  const [clipboardCheckOpen, setClipboardCheckOpen] = useState(false);
  const [uid, setUid] = useState('');
  const reload = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {

        const ref = collection(db, 'Order');
        const dataFetch = await getDocs(ref);
        setTimeout(() => { setLoading(false) }, 600)
        const dataReceive = dataFetch.docs.map(doc => ({
          ...doc.data()
        }))
        setData(dataReceive);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  })

  useEffect(() => {

    const del = async () => {
      const ref = collection(db, 'Order');
      const dataFetch = await getDocs(ref);

      const filteredOne = dataFetch.docs.filter(doc => {
        const data = doc.data();
        return data.service.includes(targetTableDelete.service)
      })
      const filteredTwo = filteredOne.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      const filteredThree = filteredTwo.filter(doc => {
        return doc.description.includes(targetTableDelete.description)
      })

      const dataScope = filteredThree.filter(doc => {
        return doc.customerID == targetTableDelete.customerID
      })

      if (dataScope[0] != undefined) {

        const refWithId = doc(db, 'Order', dataScope[0].id);
        await deleteDoc(refWithId);

        const refWithReceipt = collection(db, 'Receipt');
        const receiptFetch = await getDocs(refWithReceipt);
        const referencekey = receiptFetch.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (dataScope[0] != undefined) {
          const filtered = referencekey.filter(doc => {
            return doc.referencekey == dataScope[0].id;
          })
          await deleteDoc(doc(db, 'Receipt', filtered[0].id));
          viewReceiptOpen.current = false;
          reload('/createtask');
        }
      }
    }
    del();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetTableDeleteConfirm])

  useEffect(() => {

    const select = async () => {
      const ref = collection(db, 'Order');
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
        return doc.customerID == targetTable.customerID
      })
      if (dataScope[0] != undefined) {
        setUid(dataScope[0].id);

      }
    }
    select();
  }, [targetTable])


  const createdReceipt = async (docData) => {
    try {
      const ref = collection(db, 'Receipt');
      if (!docData.isReceipt) {
        await addDoc(ref, {
          referencekey: docData.referencekey,
          price: docData.price,
          service: docData.service,
        })
        await addDoc(collection(db, 'ReceiptArchive'), {
          referencekey: docData.referencekey,
          price: docData.price,
          service: docData.service,
        })
      }

      const refWithId = doc(db, 'Order', docData.referencekey);
      await updateDoc(refWithId, { isReceipt: true });

      const getData = await getDocs(collection(db, 'Archive'));
      const archiveData = getData.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data()
      }
      ))
      const id = archiveData.filter(doc => {
        return doc.referencekey == docData.referencekey;
      })
      if (id[0] != undefined) await updateDoc(doc(db, 'Archive', id[0].docId), { isReceipt: true });


      toast.success("Receipt Created", {
        position: 'top-right'
      })

    } catch (err) {
      toast.error("Try Again", {
        position: 'top-right'
      })
      console.error(err);
    }
  }


  useEffect(() => {
    const selectReceipt = async () => {
      const ref = collection(db, 'Order');
      const dataFetch = await getDocs(ref);

      const filteredOne = dataFetch.docs.filter(doc => {
        const data = doc.data();
        return data.service.includes(targetTableReceipt.service)
      })

      const filteredTwo = filteredOne.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      const filteredThree = filteredTwo.filter(doc => {
        return doc.description.includes(targetTableReceipt.description)
      })

      const dataScope = filteredThree.filter(doc => {
        return doc.customerID == targetTableReceipt.customerID
      })

      const refWithReceipt = collection(db, 'Receipt');
      const receiptFetch = await getDocs(refWithReceipt);
      const referencekey = receiptFetch.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      if (dataScope[0] != undefined) {
        const filtered = referencekey.filter(doc => {
          return doc.referencekey == dataScope[0].id;
        })
        setReceiptId(filtered[0].id);
      }
    }
    selectReceipt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetTableReceipt])

  const toDelete = (item) => {
    setShowModal(true);
    setTargetTableDelete(item);
  }

  useEffect(() => {
    if (isDelete) {
      setTargetTableDeleteConfirm(targetTableDelete)
      setIsDelete(false);
      setShowModal(false);
    } else return
  }, [targetTableDelete, isDelete])

  const clipboardCheck = async (item) => {
    setTargetTable(item);
    setClipboardCheckOpen(!clipboardCheckOpen);
  }


  const closeModal = () => {
    setClipboardCheckOpen(false)
    setShowModal(false);
    viewReceiptOpen.current = false;
  }

  const viewReceipt = (item) => {
    setTargetReceipt(item);
    viewReceiptOpen.current = true;
  }

  const handleDelete = () => {
    setIsDelete(true)
  };

  return (
    <>

      {data.map((doc, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.orderCard}>
            <div className={styles.leftSection}>
              <div className={styles.iconContainer}>
                <ClipboardCheck className={styles.icon} onClick={() => clipboardCheck(doc)} size={24} />
              </div>
              <div className={styles.orderDetails}>
                <div className={styles.customerName}>{doc.name}</div>
                <div className={styles.customerEmail}>{doc.phone} {doc.email} </div>
                <div className={styles.dueDateLabel}>Due Date:</div>
                <div className={styles.dueDate}> {doc.timeDate} </div>
              </div>
            </div>
            <div className={styles.middleSection}>
              <div className={styles.orderDescription}>
                {doc.description}
              </div>
            </div>
            <div className={styles.rightSection}>
              {!doc.isReceipt ? (<button className={styles.createButton} onClick={() => createdReceipt(doc)}>CREATE RECEIPT </button>)
                :
                (<button className={styles.createButton} onClick={() => viewReceipt(doc)}>VIEW RECEIPT</button>)
              }

              <button className={styles.cancelButton} onClick={() => toDelete(doc)}>
                CANCEL ORDER
              </button>
            </div>
          </div>
          <ToastContainer />
        </div >))}


      {clipboardCheckOpen &&
        <div className={StyleModal.modal}>
          <div className={StyleModal.overlay} onClick={closeModal}></div>
          <div className={StyleModal.modalContent}><StatusUpdate value={uid} /></div>
        </div>}

      {showModal && (
        <div className={StyleModal.modal}>
          <div className={StyleModal.overlay} onClick={closeModal}></div>
          <div className={StyleModal.modalContent}>
            <div className="fixed inset-0 flex items-center justify-center p-4 z-10">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
                {/* Header */}
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

                {/* Body */}
                <div className="p-4">
                  <p className="text-gray-700 mb-4">
                    Are you sure you want to cancel this order? This action cannot be undone.
                  </p>

                  {/* Buttons */}
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
        </div>
      )}
      {loading && <LoadingScreen />}
    </>);
};

export default CustomerOrder;