
import Style from './InquiryPage.module.css'
import TShirtStyle from './TshirtPrinting.module.css'
import Logo from '../assets/imgs/logo.png';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../config/firebase.jsx';
import { signOut } from 'firebase/auth';
import { Squash as Hamburger } from 'hamburger-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePicContext, ModalContext } from '../context.jsx';
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
    const navLogout = useNavigate();
    const { modalSignupOpen, setModalSignupOpen, login } = useContext(ModalContext);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalSignup, setModalSignup] = useState(false);
    const navOrder = useNavigate();
    const [isOpen, setOpen] = useState(false);

    // State for pricing calculator
    const [selectedPrinting, setSelectedPrinting] = useState({
        type: '1 Color',
        price: 30.00,
        unit: 'Per T shirt'
    });
    const [quantity, setQuantity] = useState(1);

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
        navOrder('/services');
    }

    // Scroll to section function
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
            <div className={TShirtStyle["back-button"]}>
                <button
                    onClick={goBackToServices}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-all"
                >
                    <ArrowLeft className="mr-2" />
                    <span className="text-lg font-medium">Choose another service</span>
                </button>
            </div>

            <h1 className="text-5xl font-bold mb-6 border-b-4 border-black inline-block pb-2 text-center mx-auto block">T-Shirt Printing</h1>

            <div className={TShirtStyle["service-content"]}>
                <div className={TShirtStyle["tshirt-showcase"]}>
                    <div className="relative bg-blue-500 rounded-lg p-6 overflow-hidden w-full">
                        <div className="flex justify-center items-center">
                            <div className="text-white p-4 text-center">
                                <p>T-shirt design mockup showing white and black shirts with 'Your Design Here' text</p>
                                <div className="flex justify-end mt-4">
                                    <div className="w-8 h-8 bg-green-400 rounded-full mr-1"></div>
                                    <div className="w-8 h-8 bg-green-400 rounded-full mr-1"></div>
                                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={TShirtStyle["service-details"]}>
                    <p className="text-xl mb-8">
                        We use high-quality screen printing to create durable and vibrant designs for personal, business, or event needs. Perfect for bulk orders with a professional finish.
                    </p>

                    <div className={`${TShirtStyle["pricing-table"]} mb-8`}>
                        <div className={TShirtStyle["price-grid"]}>
                            <div className={TShirtStyle["price-column"]}>
                                <ul>
                                    <li
                                        className={`${TShirtStyle["price-item"]} ${selectedPrinting.type === '1 Color' ? TShirtStyle.selected : ''}`}
                                        onClick={() => setSelectedPrinting({ type: '1 Color', price: 30.00, unit: 'Per T shirt' })}
                                    >
                                        <span className="mr-2">•</span>
                                        <span>1 Color</span>
                                    </li>
                                    <li
                                        className={`${TShirtStyle["price-item"]} ${selectedPrinting.type === 'Back to back 1 color' ? TShirtStyle.selected : ''}`}
                                        onClick={() => setSelectedPrinting({ type: 'Back to back 1 color', price: 60.00, unit: 'Per T shirt' })}
                                    >
                                        <span className="mr-2">•</span>
                                        <span>Back to back 1 color</span>
                                    </li>
                                    <li
                                        className={`${TShirtStyle["price-item"]} ${selectedPrinting.type === 'Colored' ? TShirtStyle.selected : ''}`}
                                        onClick={() => setSelectedPrinting({ type: 'Colored', price: 55.00, unit: 'Per T shirt' })}
                                    >
                                        <span className="mr-2">•</span>
                                        <span>Colored</span>
                                    </li>
                                    <li
                                        className={`${TShirtStyle["price-item"]} ${selectedPrinting.type === 'Back to back colored' ? TShirtStyle.selected : ''}`}
                                        onClick={() => setSelectedPrinting({ type: 'Back to back colored', price: 80.00, unit: 'Per T shirt' })}
                                    >
                                        <span className="mr-2">•</span>
                                        <span>Back to back colored</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={TShirtStyle["price-column"]}>
                                <ul>
                                    <li className={TShirtStyle["price-value"]}>₱30.00</li>
                                    <li className={TShirtStyle["price-value"]}>₱50.00 - ₱70.00</li>
                                    <li className={TShirtStyle["price-value"]}>₱40.00 - ₱70.00</li>
                                    <li className={TShirtStyle["price-value"]}>₱80.00</li>
                                </ul>
                            </div>
                            <div className={TShirtStyle["price-column"]}>
                                <ul>
                                    <li className={TShirtStyle["price-unit"]}>Per T shirt</li>
                                    <li className={TShirtStyle["price-unit"]}>Per T shirt</li>
                                    <li className={TShirtStyle["price-unit"]}>Per T shirt</li>
                                    <li className={TShirtStyle["price-unit"]}>Per T shirt</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={`${TShirtStyle.calculator} bg-gray-50 p-6 rounded-lg shadow-md mb-8`}>
                        <h2 className="text-2xl font-bold mb-4">Price Calculator</h2>
                        <div className={TShirtStyle["quantity-selector-container"]}>
                            <div className="selected-option mb-4">
                                <p className="text-lg font-medium mb-2">Selected Option:</p>
                                <p className="text-xl text-blue-800">{selectedPrinting.type} - ₱{selectedPrinting.price.toFixed(2)}</p>
                            </div>

                            <div className={`${TShirtStyle["quantity-selector"]} mb-4`}>
                                <p className="text-lg font-medium mb-2">Quantity:</p>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-l flex items-center justify-center"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="h-10 w-16 text-center border-t border-b border-gray-300"
                                    />
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-r flex items-center justify-center"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="total-price mb-4">
                                <p className="text-lg font-medium mb-2">Total:</p>
                                <p className="text-2xl font-bold text-blue-800">₱{(selectedPrinting.price * quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 text-lg">Call for exact pricing and available discounts.</p>

                    <div className="mt-8">
                        <button
                            onClick={InquireClick}
                            className={`${TShirtStyle["inquire-button"]} bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-xl font-medium transition-all`}
                        >
                            Request a Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default TShirtPrintingPage;
