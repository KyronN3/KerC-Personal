/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import styles from './ArchiveFiles.module.css';
import { db } from '../config/firebase.jsx';
import { collection, getDocs, addDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Receipt from './ReceiptArchive.jsx'
import StyleModal from '../HomePage/Modal.module.css'


const ArchiveFiles = () => {

  const [archiveData, setArchiveData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [viewReceiptOpen, setViewReceiptOpen] = useState(false);
  const [targetTableDelete, setTargetTableDelete] = useState();
  const [receiptId, setReceiptId] = useState();
  const [itemFromDoc, setItemFromDoc] = useState([]);
  const [item, setItem] = useState([]);
  const reload = useNavigate();

  // Fetch Order data
  useEffect(() => {
    const getData = async () => {
      try {
        const ref = collection(db, 'Order');

        const dataFetch = await getDocs(ref);
        const dataReceive = dataFetch.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArchiveData(dataReceive);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  // Fetch Archive data
  useEffect(() => {
    const datReceive = async () => {
      try {
        const ref = collection(db, 'Archive');
        const dataFetch = await getDocs(ref);
        const dataReceive = dataFetch.docs.map(doc => ({
          docId: doc.id,
          ...doc.data()
        }));

        const filterUndefine = dataReceive.filter(doc => {
          return doc.referencekey != undefined
        })
        setItemFromDoc(filterUndefine);

        setTempData(dataReceive);
      } catch (err) {
        console.error(err);
      }
    };
    datReceive();
  }, [targetTableDelete]);

  // Filter data to find unique items not already in Archive
  useEffect(() => {
    if (archiveData.length > 0 && tempData.length > 0) {
      try {
        const referenceKeys = tempData.map((doc) => doc.referencekey);
        const filtered = archiveData.filter((dataDoc) =>
          !referenceKeys.includes(dataDoc.referencekey)
        );

        setItem(filtered);
      } catch (err) {
        console.error(err);
      }
    }
  }, [archiveData, tempData]);

  useEffect(() => {
    if (item.length > 0) {
      const storeUniqueItems = async () => {
        try {
          const ref = collection(db, 'Archive');
          const addedDocs = [];
          for (const doc of item) {

            if (doc && doc.referencekey) {
              await addDoc(ref, {
                customerID: doc.customerID || '',
                description: doc.description || '',
                email: doc.email || '',
                id: doc.id || '',
                isReceipt: doc.isReceipt || false,
                name: doc.name || '',
                phone: doc.phone || '',
                price: doc.price || 0,
                referencekey: doc.referencekey,
                service: doc.service || '',
                status: doc.status || null,
                timeDate: doc.timeDate || '',
                isArchive: true
              });
              addedDocs.push(doc.referencekey);
            }
          }

          console.log(`Added ${addedDocs.length} unique documents to Archive`);


          if (addedDocs.length > 0) {
            const archiveRef = collection(db, 'Archive');
            const snapshot = await getDocs(archiveRef);
            const newArchiveData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            const filterUndefine = newArchiveData.filter(doc => {
              return doc.referencekey != undefined
            })
            setItemFromDoc(filterUndefine);
            setTempData(newArchiveData);
          }
        } catch (err) {
          console.error("Error storing items to Archive:", err);
        }
      };

      storeUniqueItems();
    }
  }, [item]);

  const toDelete = async (item) => {
    setTargetTableDelete(item);

    if (item.referencekey == undefined) {
      toast.error("Must have default archive", {
        position: 'top-right',
        style: {
          width: "20vw",
          fontSize: "13px"
        }
      });
    } else {
      try {
        const dataSnap = await getDoc(doc(db, 'Order', item.referencekey))
        if (dataSnap.exists()) {
          throw new Error("Invalid Deletion")
        } else {
          await deleteDoc(doc(db, 'Archive', item.docId))
          reload(0)
        }

        toast.success("Successfully deleted", {
          position: 'top-right',
          style: {
            width: "20vw",
            fontSize: "13px"
          }
        });

      } catch {
        toast.error("Error, Transaction in progress. Please delete first the order", {
          position: 'top-right',
          style: {
            width: "20vw",
            fontSize: "13px"
          }
        });
      }
    }
    const receiptArchive = await getDocs(collection(db, 'ReceiptArchive'))
    const receiptArchiveData = receiptArchive.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data()
    }))

    const referencekey = receiptArchiveData.filter((doc) => {
      return doc.referencekey == item.referencekey;
    })
    await deleteDoc(doc(db, 'ReceiptArchive', referencekey[0].docId))
  };

  const viewReceipt = (item) => {
    setReceiptId(item.id)
    setViewReceiptOpen(!viewReceiptOpen);
  };

  const closeModal = () => {
    setViewReceiptOpen(false);
  };

  return (
    <>
      <div className={styles.gridContainer}>
        <div className={styles.gridRow}>
          {itemFromDoc.map(doc => (
            <div key={doc.referenceKeys} className={styles.gridItem}>
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
                  {doc.isReceipt
                    ? <button className={styles.viewButton} onClick={() => viewReceipt(doc)}>VIEW RECEIPT</button>
                    : <button className={styles.viewButton}>NO RECEIPT</button>
                  }
                  <button className={styles.deleteButton} onClick={() => toDelete(doc)}>DELETE ARCHIVE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>

      {viewReceiptOpen && (
        <div className={StyleModal.modal}>
          <div className={StyleModal.overlay} onClick={closeModal}></div>
          <div className={StyleModal.modalContent}><Receipt id={receiptId} /></div>
        </div>
      )}
    </>
  );
};

export default ArchiveFiles;