import { Textarea } from "@/components/ui/textarea";
import { db } from "../config/firebase";
import { getDoc, doc } from 'firebase/firestore'
import { X, Package, Calendar, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import LoadingScreen from '../LoadingScreen'

export default function OrderStatusModal({ onClose, lastUpdated = "today at 2:30 PM", customerID }) {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 300)
    const getData = async () => {
      const dataSnap = await getDoc(doc(db, 'Order', customerID));
      if (dataSnap.exists()) {
        setData(dataSnap.data());
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Animation timing
    setAnimateIn(true);

    // Set up escape key handler
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div
        onClick={handleBackdropClick}
      >

        <div
          className={`bg-white rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg overflow-hidden 
        ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-300`}
        >
          {/* Header */}
          <div className="bg-[#e3f2fd] px-3 sm:px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-1 sm:gap-2">
              <Package className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              <span>Order Status</span>
            </h2>
            <button
              onClick={onClose}
              className="text-blue-600 hover:text-blue-800 focus:outline-none rounded-full p-1"
              aria-label="Close"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Status Area */}
          <div className="px-3 sm:px-4 md:px-6 mt-6 pb-4 md:pb-6">
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-1 sm:gap-2 text-blue-800 font-medium mb-1 md:mb-2">

                {(data != null) && data.status == "Pending"
                  ?
                  <Clock className="h-4 w-4 md:h-5 md:w-5" />
                  : (data != null) && data.status == "Completed"
                    ?
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                    : <X className="h-4 w-4 md:h-5 md:w-5" />
                }

                <span className="text-sm md:text-base">
                  {data != null && data.status}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-gray-600 mb-2 md:mb-4">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <span className="text-xs sm:text-sm">Updated {lastUpdated}</span>
              </div>
              <Textarea
                id="notes"
                className="w-full border border-[#bbdefb] rounded-md shadow-sm resize-none bg-[#e3f2fd]/50 focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm md:text-base"
                rows={3}
                value={data != null && data.message}
                readOnly
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 md:mt-6">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}