import { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import LoadingScreen from '../LoadingScreen';
import styles from './Receipt.module.css';


export default function SimpleReceipt(props) {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { setTimeout(() => { setLoading(false) }, 300) }, [])

    useEffect(() => {

        const receiptIdSearch = async () => {
            try {
                const ref = collection(db, 'ReceiptArchive')
                const receiptFetch = await getDocs(ref);
                const receiptReceive = receiptFetch.docs.map(doc => ({
                    docId: doc.id,
                    ...doc.data()
                }))
                const data = receiptReceive.filter(doc => {
                    return doc.referencekey == props.id
                })
                setItems(data[0]);
            } catch (err) {
                console.error(err);
            }
        }
        receiptIdSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handlePrint = () => {
        const printContent = document.getElementById('receipt');
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <>
            {loading && <LoadingScreen />}
            <div className={styles.container}>
                <div className={styles.buttonContainer}>
                    <button
                        onClick={handlePrint}
                        className={styles.printButton}
                    >
                        <Printer className={styles.printerIcon} size={16} />
                        Print
                    </button>
                </div>
                <div id="receipt" className={styles.receipt}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>KER-C</h2>
                    </div>
                    <div className={styles.receiptInfo}>
                        <div className={styles.receiptLabel}>Receipt</div>
                        <div className={styles.date}>
                            Date: 5/3/2025
                        </div>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr className={styles.tableHeader}>
                                    <th className={styles.tableHeaderLeft}>Service</th>
                                    <th className={styles.tableHeaderRight}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={styles.tableRow}>
                                    <td className={styles.tableCell}>{items != undefined ? items.service : "Empty"}</td>
                                    <td className={styles.tableCellRight}>{items != undefined ? items.price : 0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.totalContainer}>
                        <span>Total:</span>
                        <span>{items.price}</span>
                    </div>
                    <div className={styles.footer}>
                        Thank you for your business!
                    </div>
                </div>
            </div>
        </>
    );
}