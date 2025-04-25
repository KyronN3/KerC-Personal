import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

export default function StatusUpdate(prop) {
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const uid = prop.value;

  const handleImageChange = () => {

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, 'Order', uid);
      await updateDoc(ref, { status: status })
      setStatus('');
      setImage(null);
      toast.success("Updated Successfully!", {
        position: 'bottom-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
        style: {
          top: '13px',
          marginLeft: '40px',
          border: '1px solid black',
          width: 'auto',
          height: '60px'
        }
      });
    } catch (err) {
      toast.error("Unsuccessful, input missing. Try Again !", {
        position: 'bottom-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
        style: {
          top: '13px',
          marginLeft: '40px',
          border: '1px solid black',
          width: 'auto',
          height: '60px'
        }
      });
      console.log(err);
    }

  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Update Status</h2>
          <div className="flex items-center justify-center w-8 h-8 bg-yellow-300 rounded">
            <FileText size={20} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {image && (
            <div className="mb-4">
              <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="status" className="sr-only">Status</label>
            <textarea
              id="status"
              className="w-full p-3 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Status"
              rows="4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <div>
              <label
                htmlFor="image-upload"
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded cursor-pointer hover:bg-blue-700"
              >
                <Plus size={16} />
                <span>Add Image</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}