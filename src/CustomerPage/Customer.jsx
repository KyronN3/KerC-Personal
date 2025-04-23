import Style from './Customer.module.css'
import Logo from '../assets/imgs/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Order from './Orders.jsx'
import { auth } from '../config/firebase.jsx'
import { signOut } from 'firebase/auth'
import OrderHistory from './OrderHistory.jsx'
import ProfileEdit from './ProfileEdit.jsx'
import { createContext, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase.jsx'
import { Link, useNavigate } from 'react-router-dom'
import {
    LogOut,
    User,
    ShoppingCart,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// eslint-disable-next-line react-refresh/only-export-components
export const createData = createContext();

export default function Customer(props) {
    const [orderOpen, setOrderOpen] = useState(false);
    const [orderHistoryOpen, setHistoryOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [uid, setUid] = useState(null);

    const navOrder = useNavigate();

    const logout = async () => {
        await signOut(auth);
        window.location.replace("/");
    }

    const myOrderNav = () => {
        navOrder('/customer')
    }

    const orderData = async () => {
        setEditProfileOpen(false);
        setHistoryOpen(false);
        setOrderOpen(true);

        try {
            const ref = collection(db, "Order");
            const data = await getDocs(ref);
            const dataFetch = data.docs.map((doc) => ({
                ...doc.data()
            }))
            setUid(dataFetch[0].CustomerID);
            console.log(uid);
        } catch (err) {
            console.error(err)
        }
    }
    return (<>
        <nav className={Style.HeaderContainer}>
            <img className={Style.Image} src={Logo} alt="Logo" />
            <Link to='/' className={Style.Home}>Home</Link>
            <a className={Style.About}>About</a>
            <a className={Style.Contact}>Contacts</a>
            <a className={Style.Login}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className={Style.Profile}>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>...Loading</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 relative z-[1000] bg-[#f3c278]">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User />
                                <span className='cursor-pointer'>Profile</span>
                                <DropdownMenuShortcut>P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ShoppingCart />
                                <Link to='/customer' className='cursor-pointer' onClick={myOrderNav}>My Order</Link>
                                <DropdownMenuShortcut>S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuItem>
                            <LogOut />
                            <span onClick={logout} className='cursor-pointer'>Log out</span>
                            <DropdownMenuShortcut>Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </a>
        </nav>

        <div className={Style.SidebarContainer}>
            <button className={`${Style.SidebarButton} ${Style.yourOrder}`} onClick={orderData}>Your Order/s</button>
            <button className={`${Style.SidebarButton} ${Style.orderHistory}`} onClick={() => {
                setEditProfileOpen(false);
                setOrderOpen(false);
                setHistoryOpen(true);
            }}>Order History</button>
            <button className={`${Style.SidebarButton} ${Style.Profile}`} onClick={() => {
                setOrderOpen(false);
                setHistoryOpen(false);
                setEditProfileOpen(true);
            }}>Edit Profile</button>
        </div>


        {orderOpen ? (
            <div className={Style.MainContentWithSidebar}>
                <createData.Provider value={props}>
                    <div className={Style.containerOrder}>``
                        <div className={Style.structureOrder}>
                            {/* <Order /> */}
                        </div>
                    </div>
                </createData.Provider>
            </div>) : null}

        {orderHistoryOpen ? (
            <div className={Style.OrderHistory}>
                <OrderHistory />
            </div>
        ) : null}

        {editProfileOpen ? (
            <div className={Style.OrderHistory}>
                <ProfileEdit />
            </div>
        ) : null}

    </>)
}
