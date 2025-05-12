/* eslint-disable no-undef */
import Style from './Customer.module.css'
import Logo from '../assets/imgs/logo.png'
import Order from '../CustomerPage/Orders.jsx'
import OrderHistory from '../CustomerPage/OrderHistory.jsx'
import LoadingScreen from '../LoadingScreen.jsx'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth, db, storage } from '../config/firebase.jsx'
import { listAll, getDownloadURL, ref } from 'firebase/storage'
import { getDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { createContext, useState, useContext, useEffect } from 'react'
import { ProfilePicContext, ModalContext } from '../context.jsx'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"


// eslint-disable-next-line react-refresh/only-export-components
export const createData = createContext();

export default function Customer() {


    const { currentProfilePic, setCurrentProfilePic } = useContext(ProfilePicContext);
    const { login } = useContext(ModalContext);
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const goTo = useLocation();

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

    useEffect(() => {
        if (login) {
            const getPic = async () => {
                const dataSnap = await getDoc(doc(db, 'Customer', auth?.currentUser?.uid));
                if (dataSnap.exists()) {
                    const data = dataSnap.data();
                    const response = await listAll(ref(storage, 'ProfilePicture'))
                    const url = response.items.filter((pic) => {
                        return pic._location.path_ == data.profilePic;
                    })
                    url.forEach(async (pic) => {
                        const imageUrl = await getDownloadURL(pic);
                        setCurrentProfilePic(imageUrl);
                    })
                }
            }
            getPic();
        }
    })

    const toRender = () => {
        switch (goTo.pathname) {
            case '/order':
                return <Order />

            case '/orderhistory':
                return <OrderHistory />
        }
    }

    useEffect(() => { setTimeout(() => { setLoading(false) }, 600) }, [])

    return (<>

        {loading && <LoadingScreen />}
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
                            <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
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

        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="text-[6vh]">
                <header className="flex h-16 shrink items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="ml-1" />
                    </div>
                </header>
                <div className="flex flex-1 flex-row justify-center gap-4 p-4 pt-0 overflow-hidden">
                    <div className="min-h-[100vh] text-[13px] flex-1 w-1 rounded-xl bg-muted/50 md:min-h-min inset-shadow-sm overflow-hidden" >{toRender()}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>


    </>)
}
