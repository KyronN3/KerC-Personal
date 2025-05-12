/* eslint-disable no-undef */
import Style from './Admin.module.css'
import StyleModal from '../HomePage/Modal.module.css'
import Logo from '../assets/imgs/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useContext, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase.jsx'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import CreateTask from './CreateTask.jsx'
import EditPrice from './EditPrice.jsx'
import CustomerOrder from './CustomerOrder.jsx'
import Receipt from './Receipt.jsx'
import { ViewReceiptOpenContext, ProfilePicContext } from '../context.jsx';
import { Squash as Hamburger } from 'hamburger-react';
import ArchiveFiles from './ArchiveFiles.jsx'
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

export default function Admin() {

    const { currentProfilePic } = useContext(ProfilePicContext);
    const { viewReceiptOpen, setViewReceiptOpen } = useContext(ViewReceiptOpenContext);
    const goToPage = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const goTo = useLocation();

    const logout = async () => {
        await signOut(auth);
        window.location.replace("/");
    }

    const manageOrderNav = () => {
        goToPage('/admin');
    }
    const toRender = () => {
        switch (goTo.pathname) {
            case '/createtask':
                return <CreateTask />

            case '/editprice':
                return <EditPrice />

            case '/archivefiles':
                return <ArchiveFiles />
        }
    }

    const goToProfilePageAdmin = () => {
        goToPage('/profilepageadmin')
    }

    const closeModal = () => {
        setViewReceiptOpen(false);
    }


    //rerender
    useEffect(() => {
    }, [viewReceiptOpen])

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
                                    <span className='cursor-pointer' onClick={goToProfilePageAdmin}>Profile</span>
                                    <DropdownMenuShortcut>P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ShoppingCart />
                                    <Link to='/admin' className='cursor-pointer' onClick={manageOrderNav}>Manage Orders</Link>
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
                    {goTo.pathname === '/createtask' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
                            <div className=" rounded-xl bg-muted/50 p-8 shadow w-full col-start-1 col-end-2 overflow-auto inset-shadow-sm">
                                <CreateTask />
                            </div>
                            <div className="rounded-xl bg-muted/50 p-8 shadow h-[43.5vh] text-[13px] overflow-x-hidden inset-shadow-sm">
                                <CustomerOrder />
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-[100vh] text-[13px] flex-1 rounded-xl bg-muted/50 md:min-h-min inset-shadow-sm overflow-hidden" >{toRender()}</div>
                    )}
                </div>

            </SidebarInset>
        </SidebarProvider>

        {viewReceiptOpen &&
            <div className={StyleModal.modal}>
                <div className={StyleModal.overlay} onClick={closeModal}></div>
                <div className={StyleModal.modalContent}><Receipt /></div>
            </div>}
    </>)
}