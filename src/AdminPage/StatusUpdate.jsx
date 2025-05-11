import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

export default function StatusUpdate({ value }) {
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For displaying the image preview
  const uid = value;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview of the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, 'Order', uid);
      const dataToUpdate = { status: status };

      if (image) {
        // You would typically upload the image to a storage service here and then get the URL
      }

      await updateDoc(ref, dataToUpdate);
      setStatus('');
      setImage(null);
      setImagePreview(null); // Reset preview after submission
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
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Image Preview" className="w-full h-auto rounded border border-gray-300 mb-2" />
            </div>
          )}
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded cursor-pointer hover:bg-blue-700 transition duration-200"
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Post
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}