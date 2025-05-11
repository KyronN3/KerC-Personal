import { Textarea } from "@/components/ui/textarea";
import Template from '../assets/imgs/inquiryPage/printing.png';

export default function OrderStatusModal() {
  const statusMessage = "Almost done na po :). Ready to pick up tomorrow";

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex items-center justify-end mb-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-6">
          <div className="w-full md:w-3/4 lg:w-1/2 rounded-md overflow-hidden shadow-md mx-auto mb-4">
            <img src={Template} alt="Order Image" className="w-full h-auto object-cover" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="notes" className="block text-lg font-semibold text-gray-800 mb-2">
            Order Status:
          </label>
          <Textarea
            id="notes"
            className="w-full border border-gray-300 rounded-md shadow-sm sm:text-sm resize-none bg-[#e6f2ff] focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={statusMessage}
            readOnly
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 md:px-6 md:py-3 bg-[#e6f2ff] text-gray-800 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
