import { useState, useContext, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { ReceiptContext } from '../context';
import { db } from '../config/firebase';
import LoadingScreen from '../LoadingScreen';
import { collection, getDocs } from 'firebase/firestore';
import styles from './Receipt.module.css';

export default function SimpleReceipt() {

    const { receiptId } = useContext(ReceiptContext);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 600)
    }, [])

    useEffect(() => {

        const receiptIdSearch = async () => {
            try {
                const ref = collection(db, 'Receipt')
                const receiptFetch = await getDocs(ref);
                const receiptReceive = receiptFetch.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                const data = receiptReceive.filter(doc => {
                    return doc.id == receiptId
                })
                setTotalPrice(parseInt(data[0].price.slice(1)) * parseInt(data[0].quantity));
                setItems(data[0]);
            } catch (err) {
                console.error(err);
            }
        }
        receiptIdSearch();
    })

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
                                    <th className={styles.tableHeaderRight}>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items != undefined &&
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>{items != undefined ? items.service : "Empty"}</td>
                                        <td className={styles.tableCellRight}>{items != undefined ? items.price : 0}</td>
                                        <td className={styles.tableCellRight}>{items != undefined ? items.quantity : 0}</td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.totalContainer}>
                        <span>Total:</span>
                        <span>{totalPrice}</span>
                    </div>
                    <div className={styles.footer}>
                        Thank you for your business!
                    </div>
                </div>
            </div>
        </>
    );
}