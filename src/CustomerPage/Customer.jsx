import Style from './Customer.module.css'
import Logo from '../assets/imgs/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Order from './Orders.jsx'
import OrderHistory from './OrderHistory.jsx'
import ProfileEdit from './ProfileEdit.jsx'
import { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const createData = createContext();

export default function Customer(props) {
    const [orderOpen, setOrderOpen] = useState(false);
    const [orderHistoryOpen, setHistoryOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);

    return (<>
        <nav className={Style.HeaderContainer}>
            <img className={Style.Image} src={Logo} alt="Logo" />
            <a className={Style.Home}>Home</a>
            <a className={Style.About}>About</a>
            <a className={Style.Contact}>Contacts</a>
            <a className={Style.Login}>
                <Avatar className={Style.profile}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
            </a>
        </nav>

        <div className={Style.SidebarContainer}>
            <button className={`${Style.SidebarButton} ${Style.yourOrder}`} onClick={() => {
                setEditProfileOpen(false);
                setHistoryOpen(false);
                setOrderOpen(true);
            }
            }>Your Order/s</button>
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
                            <Order />
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
                    <ProfileEdit/>
               </div> 
        ) : null}

    </>)
}
