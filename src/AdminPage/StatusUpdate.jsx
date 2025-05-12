import { Textarea } from "@/components/ui/textarea";
import { useState, useContext } from 'react';
import { PostCloseContext } from '../context';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

export default function StatusUpdate({ value, }) {

  const { setPostClose } = useContext(PostCloseContext);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const uid = value;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPostClose(false)
      const ref = doc(db, 'Order', uid);
      const dataToUpdate = { status: status, message: message };
      await updateDoc(ref, dataToUpdate);
      setStatus('');
      toast.success("Updated Successfully!", {
        position: 'bottom-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
        style: {
          top: '13px',
          marginLeft: '40px',
          border: '1px solid #4CAF50',
          backgroundColor: '#fff',
          color: '#4CAF50',
          width: 'auto',
          height: '60px'
        }
      });
    } catch (err) {
      toast.error("Unsuccessful, input missing. Try Again!", {
        position: 'bottom-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
        style: {
          top: '13px',
          marginLeft: '40px',
          border: '1px solid #F44336',
          backgroundColor: '#fff',
          color: '#F44336',
          width: 'auto',
          height: '60px'
        }
      });
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center text-gray-700">Update Status</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-600">Select Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <Textarea
          id="notes"
          onChange={(e) => { setMessage(e.target.value) }}
          className="w-full border border-[#bbdefb] rounded-md shadow-sm resize-none bg-[#e3f2fd]/50 focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm md:text-base"
          rows={3}
          required
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
            Post
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}