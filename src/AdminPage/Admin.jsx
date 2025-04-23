import Style from './Admin.module.css'
import Logo from '../assets/imgs/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase.jsx'
import { Link, useNavigate } from 'react-router-dom'
import CreateTask from './CreateTask.jsx'
import EditPrice from './EditPrice.jsx'
import CustomerOrder from './CustomerOrder.jsx'
import ManageAccount from './ManageAccount.jsx'
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

export default function Admin() {

    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [customerOrderOpen, setCustomerOrderOpen] = useState(false);
    const [ArchiveFileOpen, setArchiveFileOpen] = useState(false);
    const [manageAccountOpen, setManageAccountOpen] = useState(false);
    const navManageOrder = useNavigate();

    const btnCreateTask = () => {
        setCustomerOrderOpen(false);
        setEditTaskOpen(false)
        setManageAccountOpen(false);
        setArchiveFileOpen(false);
        setCreateTaskOpen(true);
    }
    const btnEditTask = () => {
        setCustomerOrderOpen(false);
        setCreateTaskOpen(false);
        setManageAccountOpen(false);
        setArchiveFileOpen(false);
        setEditTaskOpen(true);
    }
    const btnCustomerOrder = () => {
        setEditTaskOpen(false);
        setEditTaskOpen(false);
        setManageAccountOpen(false);
        setArchiveFileOpen(false);
        setCustomerOrderOpen(true);
    }
    const btnArchiveFile = () => {
        setEditTaskOpen(false);
        setEditTaskOpen(false);
        setManageAccountOpen(false);
        setCustomerOrderOpen(false);
        setArchiveFileOpen(true);
    }
    const btnManageAccount = () => {
        setEditTaskOpen(false);
        setEditTaskOpen(false);
        setCustomerOrderOpen(false);
        setArchiveFileOpen(false);
        setManageAccountOpen(true);
    }

    const logout = async () => {
        await signOut(auth);
        window.location.replace("/");
    }

    const manageOrderNav = () => {
        navManageOrder('/admin');
    }


    return (<>
        <nav className={Style.HeaderContainer}>
            <img className={Style.Image} src={Logo} alt="Logo" />
            <Link to="/" className={Style.Home}>Home</Link>
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
        </nav>


        <div className={Style.SidebarContainer}>
            <button className={Style.SidebarButton} onClick={btnCreateTask}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>CREATE TASK</span>
                </div>
            </button>

            <button className={Style.SidebarButton} onClick={btnEditTask}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>EDIT PRICE</span>
                </div>
            </button>

            <button className={`${Style.SidebarButton}`} onClick={btnCustomerOrder}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>CUSTOMER ORDERS</span>
                </div>
            </button>

            <button className={`${Style.SidebarButton}`} onClick={btnArchiveFile}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="21 8 21 21 3 21 3 8"></polyline>
                        <rect x="1" y="3" width="22" height="5"></rect>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                    <span>ARCHIVE FILES</span>
                </div>
            </button>

            <button className={`${Style.SidebarButton}`} onClick={btnManageAccount}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>MANAGE ACCOUNTS</span>
                </div>
            </button>
        </div>



        {
            createTaskOpen &&
            <div className={Style.MainContentFlex}>
                <div className={Style.MainContentGrid}>
                    <div className={Style.MainContent}>
                        <CreateTask />
                    </div>
                </div>
            </div>
        }

        {
            editTaskOpen &&
            <div className={Style.MainContentFlex}>
                <div className={Style.MainContentGrid}>
                    <div className={Style.MainContent}>
                        <EditPrice />
                    </div>
                </div>
            </div>
        }

        {
            customerOrderOpen &&
            <div className={Style.MainContentFlex}>
                <div className={Style.MainContentGrid}>
                    <div className={Style.MainContent}>
                        <CustomerOrder />
                    </div>
                </div>
            </div>
        }

        {
            ArchiveFileOpen &&
            <div className={Style.MainContentFlex}>
                <div className={Style.MainContentGrid}>
                    <div className={Style.MainContent}>
                        <ArchiveFiles />
                    </div>
                </div>
            </div>
        }

        {
            manageAccountOpen &&
            <div className={Style.MainContentFlex}>
                <div className={Style.MainContentGrid}>
                    <div className={Style.MainContent}>
                        <ManageAccount />
                    </div>
                </div>
            </div>
        }

    </>)
}