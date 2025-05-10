/* eslint-disable no-undef */
import Style from './Customer.module.css'
import Logo from '../assets/imgs/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from '../config/firebase.jsx'
import { signOut } from 'firebase/auth'
import { createContext, useState, useContext } from 'react'
// import { collection, getDocs } from 'firebase/firestore'
// import { db } from '../config/firebase.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { Squash as Hamburger } from 'hamburger-react';
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
import { ProfilePicContext } from '../context.jsx'

// eslint-disable-next-line react-refresh/only-export-components
export const createData = createContext();

export default function Customer() {

    const { currentProfilePic } = useContext(ProfilePicContext);
    const [isOpen, setOpen] = useState(false);

    const navOrder = useNavigate();

    const logout = async () => {
        await signOut(auth);
        window.location.replace("/");
    }

    const myOrderNav = () => {
        navOrder('/customer')
    }

    const profilePageCustomer = () => {
        navOrder('/profilepagecustomer')
    }

    // const orderData = async () => {
    //     setEditProfileOpen(false);
    //     setHistoryOpen(false);
    //     setOrderOpen(true);

    //     try {
    //         const ref = collection(db, "Order");
    //         const data = await getDocs(ref);
    //         const dataFetch = data.docs.map((doc) => ({
    //             ...doc.data()
    //         }))
    //         setUid(dataFetch[0].CustomerID);
    //         console.log(uid);
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    return (<>
        <nav className={Style.HeaderContainer}>
            <img className={Style.Image} src={Logo} />
            <div className={Style.hamburger}>
                <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
            <div className={`${Style["nav-links"]} ${isOpen ? Style.active : ""}`}>
                <Link to='/' onClick={() => { setOpen(false) }} className={Style.Home}>HOME</Link>
                <Link to='/#about' onClick={() => { setOpen(false); scrollToSection('about') }} className={Style.About}>ABOUT</Link>
                <Link to='/#contact' onClick={() => { setOpen(false); scrollToSection('contact') }} className={Style.Contact}>CONTACTS</Link>
                <a className={Style.Login}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className={Style.Profile}>
                                <AvatarImage src={currentProfilePic || "https://github.com/shadcn.png"} />
                                <AvatarFallback>...Loading</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 relative z-[1000] bg-[#f3c278]">
                            <DropdownMenuLabel className="text-center">Admin</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User />
                                    <span className='cursor-pointer' onClick={profilePageCustomer}>Profile</span>
                                    <DropdownMenuShortcut>P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ShoppingCart />
                                    <Link to='/customer' className='cursor-pointer' onClick={myOrderNav}>My Order/s</Link>
                                    <DropdownMenuShortcut>M</DropdownMenuShortcut>
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
            </div>
        </nav>


    </>)
}
