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

export default function Admin({orderOpen = false, EditTaskOpen = false, accountOpen = false, archiveFileOpen = false, CreateTaskOpen = false}) {

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [createTaskOpen, setCreateTaskOpen] = useState(CreateTaskOpen);
    const [editTaskOpen, setEditTaskOpen] = useState(EditTaskOpen);
    const [customerOrderOpen, setCustomerOrderOpen] = useState(orderOpen);
    const [ArchiveFileOpen, setArchiveFileOpen] = useState(archiveFileOpen);
    const [manageAccountOpen, setManageAccountOpen] = useState(accountOpen);
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
        setCreateTaskOpen(false);
        setManageAccountOpen(false);
        setArchiveFileOpen(false);
        setCustomerOrderOpen(true);
    }
    const btnArchiveFile = () => {
        setEditTaskOpen(false);
        setCreateTaskOpen(false);
        setManageAccountOpen(false);
        setCustomerOrderOpen(false);
        setArchiveFileOpen(true);
    }
    const btnManageAccount = () => {
        setEditTaskOpen(false);
        setCreateTaskOpen(false);
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

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

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
                        <DropdownMenuLabel className="text-center">Admin</DropdownMenuLabel>
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


        <button
            className={Style.hamburgerButton}
            onClick={toggleSidebar}
            style={{
                position: 'fixed',
                top: '140px', // Position below navbar
                left: sidebarVisible ? '320px' : '20px',
                zIndex: 999, // Lower z-index than navbar
                transition: 'left 0.3s ease',
                backgroundColor: '#5D4037',
                border: 'none',
                borderRadius: '5px',
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '40px',
                width: '40px'
            }}
        >
            <span style={{ height: '3px', width: '100%', backgroundColor: '#FAEBD7', borderRadius: '2px' }}></span>
            <span style={{ height: '3px', width: '100%', backgroundColor: '#FAEBD7', borderRadius: '2px' }}></span>
            <span style={{ height: '3px', width: '100%', backgroundColor: '#FAEBD7', borderRadius: '2px' }}></span>
        </button>

        {/* Sidebar with conditional styling for visibility */}
        <div
            className={Style.SidebarContainer}
            style={{
                transform: sidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease',
                top: '130px', // Position sidebar below navbar
                height: 'calc(100% - 130px)', // Adjust height to account for navbar
                zIndex: 899  // Lower z-index than navbar
            }}
        >
            <Link to='/createtask' className={Style.SidebarButton} onClick={btnCreateTask}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>CREATE TASK</span>
                </div>
            </Link>

            <Link to='/editprice' className={Style.SidebarButton} onClick={btnEditTask}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>EDIT PRICE</span>
                </div>
            </Link>

            <Link to='/customerorder' className={`${Style.SidebarButton}`} onClick={btnCustomerOrder}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>CUSTOMER ORDERS</span>
                </div>
            </Link>

            <Link to='/archivefiles' className={`${Style.SidebarButton}`} onClick={btnArchiveFile}>
                <div className={Style.buttonContent}>
                    <svg className={Style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="21 8 21 21 3 21 3 8"></polyline>
                        <rect x="1" y="3" width="22" height="5"></rect>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                    <span>ARCHIVE FILES</span>
                </div>
            </Link>

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