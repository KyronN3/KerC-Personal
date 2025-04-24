import { useState, useContext, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { ReceiptContext } from '../context';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function SimpleReceipt() {

    const { receiptId } = useContext(ReceiptContext);
    const [items, setItems] = useState([]);

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
        <div className="p-4 max-w-md mx-auto">
            <div className="mb-4 flex justify-end items-center">
                <button
                    onClick={handlePrint}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    <Printer className="mr-1" size={18} />
                    Print
                </button>
            </div>

            <div id="receipt" className="border border-gray-300 p-6 bg-white">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">KER-C</h2>
                </div>

                <div className="mb-6">
                    <div className="font-bold mb-2 pb-2 border-b border-gray-300">Receipt</div>
                    <div className="text-sm text-gray-500">
                        Date: {new Date().toLocaleDateString()}
                    </div>
                </div>

                <table className="w-full mb-6">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="text-left py-2">Service</th>
                            <th className="text-right py-2">Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="py-2">{items.service}</td>
                            <td className="text-right py-2">{items.price}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
                    <span>Total:</span>
                </div>

                <div className="text-center mt-8 text-sm text-gray-500">
                    Thank you for your business!
                </div>
            </div>
        </div>
    );
}