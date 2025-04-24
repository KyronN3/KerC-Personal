import { useState, useEffect } from 'react';
import styles from './CustomerOrder.module.css';
import { db } from '../config/firebase.jsx'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore'
import { ClipboardCheck } from 'lucide-react';
// import StatusUpdate from './StatusUpdate.jsx';
import StyleModal from '../HomePage/Modal.module.css'


const CustomerOrder = () => {

  const [data, setData] = useState([]);
  const [targetTableDelete, setTargetTableDelete] = useState('');
  const [targetTable, setTargetTable] = useState('');
  const [clipboardCheckOpen, setClipboardCheckOpen] = useState(false);
  const [uid, setUid] = useState('');

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
      }
    }
    del();
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

  const toDelete = (item) => {
    setTargetTableDelete(item);
  }

  const clipboardCheck = (item) => {
    setTargetTable(item);
    setClipboardCheckOpen(!clipboardCheckOpen)
  }
  const closeModal = () => {
    setClipboardCheckOpen(!clipboardCheckOpen)
  }

  if (updateStatusClose.current) {
    setClipboardCheckOpen(false)
  }

  return (
    <>
      {
        data.map((doc, index) => (
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
                <button className={styles.createButton}>
                  CREATE RECEIPT
                </button>
                <button className={styles.cancelButton} onClick={() => toDelete(doc)}>
                  CANCEL ORDER
                </button>
              </div>
            </div>
          </div >))}

      {clipboardCheckOpen &&
        <div className={StyleModal.modal}>
          <div className={StyleModal.overlay} onClick={closeModal}></div>
          <div className={StyleModal.modalContent}><StatusUpdate value={uid} /></div>
        </div>}

    </>);
};

export default CustomerOrder;