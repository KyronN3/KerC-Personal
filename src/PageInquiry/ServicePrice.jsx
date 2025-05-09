
import Style from './InquiryPage.module.css';
import Tshirt from './inquiryPage/tshirt.jpg';
import TShirtStyle from './TshirtPrinting.module.css';
import Logo from '../assets/imgs/logo.png';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../config/firebase.jsx';
import { signOut } from 'firebase/auth';
import { Squash as Hamburger } from 'hamburger-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePicContext, ModalContext, ServiceContext } from '../context.jsx';
import {
    LogOut,
    User,
    ShoppingCart,
    ArrowLeft,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TShirtPrintingPage = () => {

    const { currentProfilePic } = useContext(ProfilePicContext);
    const { modalSignupOpen, setModalSignupOpen, login } = useContext(ModalContext);
    const { service, setService } = useContext(ServiceContext);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalSignup, setModalSignup] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const tempArr = [];
    const navLogout = useNavigate();
    const navOrder = useNavigate();


    const [quantities, setQuantities] = useState(
        service.reduce((acc, option) => {
            acc[option.Id] = 0;
            return acc;
        }, {})
    );

    // Function to increment quantity for a specific option
    const incrementQuantity = (id) => {
        setQuantities({
            ...quantities,
            [id]: quantities[id] + 1
        });
    };

    // Function to decrement quantity for a specific option
    const decrementQuantity = (id) => {
        if (quantities[id] > 0) {
            setQuantities({
                ...quantities,
                [id]: quantities[id] - 1
            });
        }
    };

    // Function to update quantity directly from input
    const handleQuantityChange = (id, value) => {
        const newValue = parseInt(value) || 0;
        if (newValue >= 0) {
            setQuantities({
                ...quantities,
                [id]: newValue
            });
        }
    };

    // Calculate total price
    const calculateTotal = () => {
        return service.reduce((total, option) => {
            return total + (option.priceFinal * quantities[option.Id]);
        }, 0);
    };

    const LoginClick = () => {
        setModalLogin(!modalLogin);
        navLogout('/')
    }

    const CloseModal = () => {
        setModalLogin(!modalLogin)
        navLogout('/')
    }

    const SignupClick = () => {
        if (modalSignup) {
            setModalSignup(false);
        }
        if (modalSignupOpen) {
            setModalSignupOpen(false);
            navLogout('/login')
        } else {
            navLogout('/')
        }
    }

    const InquireClick = () => {
        navOrder('/inquire');
    };

    const closeAll = () => {
        setModalSignupOpen(false);
        setModalSignup(false);
        setModalLogin(false)
    }

    modalSignupOpen || modalSignup ?
        (document.body.style.overflow = `hidden`)
        :
        document.body.style.overflow = 'scroll'

    const logout = async () => {
        await signOut(auth);
        navLogout(0);
    }

    const myOrderNav = () => {
        !auth?.currentUser?.email.includes("@admin.139907.print.com")
            ?
            navOrder('/customer')
            :
            navOrder('/admin')
    }

    const goToProfilePageAdmin = () => {
        navOrder('/profilepageadmin')
    }

    const goBackToServices = () => {
        navOrder('/inquire');
    }

    // Scroll to section function
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        service.map((item) => {
            let temp = '0';
            for (let i = 0; i < item.price.length; i++) {
                temp = temp.concat(parseInt(item.price.charAt(i)));
            }
            const filter = temp.replace('NaN', '').slice(1);
            tempArr.push(parseInt(filter));

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        setService((servicePrev) => servicePrev.map((doc, index) => ({
            ...doc,
            priceFinal: tempArr[index]
        })))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (service[0] == null) navOrder('/inquire') }, [])

    return (<>
        <nav className={Style.HeaderContainer}>
            <img className={Style.Image} src={Logo} alt="Logo" />

            <div className={Style.hamburger}>
                <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
            <div className={`${Style["nav-links"]} ${isOpen ? Style.active : ""}`}>
                <Link to='/' onClick={() => { closeAll(); setOpen(false) }} className={Style.Home}>HOME</Link>
                <Link to='/#about' onClick={() => { setOpen(false); scrollToSection('about') }} className={Style.About}>ABOUT</Link>
                <Link to='/#contact' onClick={() => { setOpen(false); scrollToSection('contact') }} className={Style.Contact}>CONTACTS</Link>
                {login ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className={Style.Profile}>
                                <AvatarImage src={currentProfilePic || "https://github.com/shadcn.png"} alt="Profile" />
                                <AvatarFallback>...Loading</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 relative z-[1000] bg-[#f3c278]">
                            {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                                ?
                                <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
                                :
                                <DropdownMenuLabel className="text-center">Admin</DropdownMenuLabel>}
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User />
                                    {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                                        ?
                                        <span className='cursor-pointer'>Profile</span>
                                        :
                                        <span className='cursor-pointer' onClick={goToProfilePageAdmin}>Profile</span>
                                    }
                                    <DropdownMenuShortcut>P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                                        ?
                                        <><ShoppingCart />
                                            <Link to='/customer' className='cursor-pointer' onClick={myOrderNav}>My Order</Link>
                                            <DropdownMenuShortcut>M</DropdownMenuShortcut>
                                        </>
                                        :
                                        <>
                                            <ShoppingCart />
                                            <Link to='/admin' className='cursor-pointer' onClick={myOrderNav}>Manage Orders</Link>
                                            <DropdownMenuShortcut>M</DropdownMenuShortcut>
                                        </>
                                    }

                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuItem>
                                <LogOut />
                                <span onClick={logout} className='cursor-pointer'>Log out</span>
                                <DropdownMenuShortcut>Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link to='/login' className={Style.Login} onClick={() => { LoginClick(); setOpen(false) }}>Login</Link>
                )}
            </div>
        </nav>


        <div className={TShirtStyle["tshirt-printing-container"]}>
            {/* Improved responsive title with proper text wrapping */}
            <button
                onClick={goBackToServices}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-1 sm:py-2 px-3 sm:px-4 md:px-6 rounded-full transition-all mt-3 sm:mt-4 md:mt-6"
            >
                <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span className="text-sm sm:text-base md:text-lg font-medium">Choose another service</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-[-10px] mb-3 xs:mt-23 xs:md-3 sm:mt-23 sm:mb-3 lg:mt-23 xl:mt-1 2xl:mt-3 border-b-4 border-black pb-2 text-center w-full break-words hyphens-auto">
                {service[0] != null ? service[0].name : null}
            </h1>

            <div className={`${TShirtStyle["service-content"]} flex flex-col lg:flex-row`}>
                {/* Improved responsive image container */}
                <div className={`${TShirtStyle["tshirt-showcase"]} w-full lg:w-2/5 mb-4 sm:mb-5 lg:mb-0`}>
                    <div className="relative bg-blue-500 rounded-lg p-3 sm:p-3 md:p-3 lg:p-3 overflow-hidden w-full">
                        <div className="flex justify-center items-center">
                            <div className="text-white p-1 sm:p-2 md:p-3 text-center max-w-full">
                                {/* Responsive image with proper sizing constraints */}
                                <img
                                    src={service[0] != null ? service[0].image : null}
                                    className="w-full max-w-[300px] xs:max-w-[300px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[340px] mx-auto object-contain"
                                    alt="T-shirt"
                                />
                                <div className="flex justify-end mt-2 sm:mt-3 md:mt-4">
                                    <div className="w-4 sm:w-6 md:w-7 lg:w-8 h-4 sm:h-6 md:h-7 lg:h-8 bg-green-400 rounded-full mr-1"></div>
                                    <div className="w-4 sm:w-6 md:w-7 lg:w-8 h-4 sm:h-6 md:h-7 lg:h-8 bg-green-400 rounded-full mr-1"></div>
                                    <div className="w-4 sm:w-6 md:w-7 lg:w-8 h-4 sm:h-6 md:h-7 lg:h-8 bg-green-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${TShirtStyle["service-details"]} w-full lg:w-3/5 lg:pl-4 xl:pl-6`}>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                        {service[0] != null ? service[0].mean : null}
                    </p>

                    {/* Calculator Table with improved responsiveness */}
                    <div className={`${TShirtStyle.calculator} bg-gray-50 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md mt-4 sm:mt-5 md:mt-6 lg:mt-8`}>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">Price Calculator</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-1 sm:py-2 px-1 sm:px-2 md:px-3 bg-[#e3f2fd] text-left text-xs sm:text-sm md:text-base">Option</th>
                                        <th className="py-1 sm:py-2 px-1 sm:px-2 md:px-3 bg-[#e3f2fd] text-center text-xs sm:text-sm md:text-base">Price</th>
                                        <th className="py-1 sm:py-2 px-1 sm:px-2 md:px-3 bg-[#e3f2fd] text-center text-xs sm:text-sm md:text-base">Quantity</th>
                                        <th className="py-1 sm:py-2 px-1 sm:px-2 md:px-3 bg-[#e3f2fd] text-right text-xs sm:text-sm md:text-base">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {service.map((item) => (
                                        <tr key={item.Id} className="border-b border-gray-200">
                                            <td className="py-1 sm:py-2 md:py-3 px-1 sm:px-2 md:px-3 text-xs sm:text-sm md:text-base">{item.option}</td>
                                            <td className="py-1 sm:py-2 md:py-3 px-1 sm:px-2 md:px-3 text-center text-xs sm:text-sm md:text-base">
                                                {item.price}
                                                <span className="text-gray-500 text-xs m-1 sm:text-sm block sm:inline">{item.description}</span>
                                            </td>
                                            <td className="py-1 sm:py-2 md:py-3 px-1 sm:px-2 md:px-3">
                                                <div className="flex items-center justify-center">
                                                    <button
                                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 rounded-l flex items-center justify-center"
                                                        onClick={() => decrementQuantity(item.Id)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        min="0"
                                                        value={quantities[item.Id]}
                                                        onChange={(e) => handleQuantityChange(item.Id, e.target.value)}
                                                        className="h-5 sm:h-6 md:h-8 w-8 sm:w-10 md:w-12 text-center text-xs sm:text-sm md:text-base border-t border-b border-gray-300"
                                                    />
                                                    <button
                                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 rounded-r flex items-center justify-center"
                                                        onClick={() => incrementQuantity(item.Id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-1 sm:py-2 md:py-3 px-1 sm:px-2 md:px-3 text-right font-medium text-xs sm:text-sm md:text-base">
                                                ₱{(item.priceFinal * quantities[item.Id]).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-blue-50">
                                        <td colSpan="3" className="py-1 sm:py-2 md:py-3 px-1 sm:px-2 md:px-3 text-right font-bold text-xs sm:text-sm md:text-base">Total:</td>
                                        <td className="py-1 sm:py-2 md:py-3 px-1 sm:px-2 md:px-3 text-right font-bold text-blue-800 text-sm sm:text-lg md:text-xl">
                                            ₱{calculateTotal().toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className={TShirtStyle["back-button"]}>
                    </div>
                    <p className="mt-[-50px] sm:mt-[-30px] text-sm sm:text-base md:text-lg">Call for exact pricing and available discounts.</p>
                </div>
            </div>
        </div>
    </>);
};

export default TShirtPrintingPage;
