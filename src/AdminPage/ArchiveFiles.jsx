import { useState, useEffect, useContext } from 'react'
import styles from './ArchiveFiles.module.css';
import { db } from '../config/firebase.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { ReceiptContext } from '../context.jsx';
import Receipt from './Receipt.jsx'
import StyleModal from '../HomePage/Modal.module.css'

const ArchiveFiles = () => {

  const [archiveData, setArchiveData] = useState([]);
  const [viewReceiptOpen, setViewReceiptOpen] = useState(false);
  const [targetTableReceipt, setTargetTableReceipt] = useState([]);
  const { receiptId, setReceiptId } = useContext(ReceiptContext);

  useEffect(() => {
    try {
      const getData = async () => {

        const ref = collection(db, 'Order');
        const dataFetch = await getDocs(ref);

        const dataReceive = dataFetch.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setArchiveData(dataReceive)



      }
      getData()
    } catch (err) {
      console.error(err);
    }

  }, [])

  // useEffect(() => {
  //   try {
  //     const setData = () => {
  //       const refArchive = collection(db, 'Archive');
  //       archiveData.forEach(async doc => {
  //         await addDoc(refArchive, {
  //           ...doc
  //         })
  //       })
  //     }
  //     setData()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [archiveData])



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
    console.log(item);
  }

  const viewReceipt = (item) => {
    setViewReceiptOpen(!viewReceiptOpen);
    setTargetTableReceipt(item);
  }

  const closeModal = () => {
    setViewReceiptOpen(false);
  }

  return (<>
    <div className={styles.gridContainer}>
      <div className={styles.gridRow}>
        {archiveData.map(doc => (
          <div key={doc.id} className={styles.gridItem}>
            <div className={styles.archiveCard}>
              <div className={styles.cardHeader}>
                <div className={styles.customerName}>{doc.name}</div>
                <div className={styles.customerEmail}>{doc.phone} {doc.email}</div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.description}>{doc.description}</div>
                <div className={styles.dueDate}>
                  <span>Due Date:</span> {doc.timeDate}
                </div>
              </div>

              <div className={styles.cardActions}>
                {doc.Receipt
                  ? <button className={styles.viewButton} onClick={() => viewReceipt(doc)}>VIEW RECEIPT</button>
                  : <button className={styles.viewButton}>NO RECEIPT</button>
                }
                <button className={styles.deleteButton} onClick={() => toDelete(doc)}>DELETE ARCHIVE</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {viewReceiptOpen &&
      <div className={StyleModal.modal}>
        <div className={StyleModal.overlay} onClick={closeModal}></div>
        <div className={StyleModal.modalContent}><Receipt value={receiptId} /></div>
      </div>}
  </ >
  );
};

export default ArchiveFiles;