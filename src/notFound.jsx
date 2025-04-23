import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export const NotFound = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Start animation after component mounts
        setIsAnimating(true);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-amber-50"> {/* antiquewhite background */}
            <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                {/* Left Side - Error Code */}
                <div className={`transition-all duration-1000 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-8xl md:text-9xl font-bold text-amber-900 mb-2">404</h1>
                    <div className="h-2 bg-amber-700 rounded-full w-24 mb-6 mx-auto md:mx-0"></div>
                </div>

                {/* Right Side - Error Message */}
                <div className={`text-center md:text-left transition-all duration-1000 delay-300 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4">Page Not Found</h2>
                    <p className="text-amber-700 mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved to another location.</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            className="px-6 py-3 border-2 border-amber-700 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors duration-300 cursor-pointer"
                            onClick={() => window.location.href = '/'}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="relative w-full max-w-3xl mt-16">
                <div className={`absolute -top-6 left-1/4 w-16 h-16 rounded-full border-8 border-amber-200 transition-all duration-700 delay-500 ${isAnimating ? 'opacity-60' : 'opacity-0'}`}></div>
                <div className={`absolute top-8 right-1/3 w-8 h-8 rounded-full border-4 border-amber-300 transition-all duration-700 delay-700 ${isAnimating ? 'opacity-60' : 'opacity-0'}`}></div>

                {/* Lost Document Illustration */}
                <div className={`relative mx-auto w-64 h-40 transition-all duration-1000 delay-200 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="absolute inset-0 bg-white rounded-lg shadow-lg transform rotate-6"></div>
                    <div className="absolute inset-0 bg-amber-100 rounded-lg shadow-md transform -rotate-3"></div>
                    <div className="absolute inset-0 bg-white rounded-lg shadow-md flex flex-col p-4">
                        <div className="w-full h-4 bg-amber-200 rounded mb-3"></div>
                        <div className="w-3/4 h-3 bg-amber-100 rounded mb-2"></div>
                        <div className="w-1/2 h-3 bg-amber-100 rounded mb-4"></div>
                        <div className="flex justify-center items-center h-16">
                            <svg className="w-12 h-12 text-amber-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}