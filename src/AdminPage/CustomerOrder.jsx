import { useState, useEffect, useContext } from 'react';
import styles from './CustomerOrder.module.css';
import { db } from '../config/firebase.jsx'
import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'
import { ClipboardCheck } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { ReceiptContext, ViewReceiptOpenContext } from '../context.jsx';
import StatusUpdate from './StatusUpdate.jsx';
import { useNavigate } from 'react-router-dom';
import StyleModal from '../HomePage/Modal.module.css'



const CustomerOrder = () => {


  const { setReceiptId } = useContext(ReceiptContext);
  const { viewReceiptOpen } = useContext(ViewReceiptOpenContext)
  const [data, setData] = useState([]);
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
  }, [targetTableDelete])

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
        },)
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
        position: 'bottom-right'
      })

    } catch (err) {
      toast.error("Try Again", {
        position: 'bottom-right'
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
    setTargetTableDelete(item);
  }

  const clipboardCheck = (item) => {
    setTargetTable(item);
    setClipboardCheckOpen(!clipboardCheckOpen)
  }
  const closeModal = () => {
    setClipboardCheckOpen(false)
    viewReceiptOpen.current = false;
  }

  const viewReceipt = (item) => {
    setTargetReceipt(item);
    viewReceiptOpen.current = true;
  }


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

    </>);
};

export default CustomerOrder;