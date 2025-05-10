import Home from './HomePage/Home.jsx'
import Order from './CustomerPage/Orders.jsx'
import Customer from './CustomerPage/Customer.jsx'
import Admin from './AdminPage/Admin.jsx'
import Inquire from './PageInquiry/InquiryPage.jsx'
import Legal from './LegalPage/PageTerm.jsx'
import OrderStatus from './CustomerPage/OrderStatus.jsx'
import OrderHistory from './CustomerPage/OrderHistory.jsx'
import CreateTask from './AdminPage/CreateTask.jsx'
import EditPrice from './AdminPage/EditPrice.jsx'
import CustomerOrder from './AdminPage/CustomerOrder.jsx'
import ManageAccount from './AdminPage/ManageAccount.jsx'
import ArchiveFiles from './AdminPage/ArchiveFiles.jsx'
import CreateAccount from './Authentication/CreateAccount.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import ServicePrice from './PageInquiry/ServicePrice.jsx'
import ProfilePageAdmin from './ProfilePage/ProfilePageAdmin.jsx'
import ProfilePageCustomer from './ProfilePage/ProfilePageCustomer.jsx'
import { NotFound } from './notFound.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { ModalContext, UserDataContext, CreateAccountContext, ReceiptContext, ViewReceiptOpenContext, ProfilePicContext, ServiceContext } from './context.jsx'
import { useState, useEffect, useRef } from 'react'
import { db } from './config/firebase.jsx'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth } from './config/firebase.jsx'
import './App.css'

function App() {

  const [viewReceiptOpen, setViewReceiptOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalSignupOpen, setModalSignupOpen] = useState(false);
  const [service, setService] = useState([]);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [receiptId, setReceiptId] = useState('');
  const [currentProfilePic, setCurrentProfilePic] = useState('');
  const userType = useRef();
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState(
    {
      fname: null,
      lname: null,
      email: null,
      address: null,
      mobileNumber: 0,
      username: null,
      password: null,
      passwordConfirm: null,
      isAdmin: false
    });

  // const items = [
  //   {
  //     id: 1,
  //     customerName: 'John Doe',
  //     contactInfo: '123-456-7890',
  //     orderDetails: 'Custom logo design',
  //     dueDate: '2023-05-15',
  //     additionalInfo: 'Rush order',
  //   },
  //   {
  //     id: 2,
  //     customerName: 'Jane Smith',
  //     contactInfo: '987-654-3210',
  //     orderDetails: 'Website development',
  //     dueDate: '2023-06-30',
  //     additionalInfo: 'Includes hosting',
  //   },
  //   {
  //     id: 3,
  //     customerName: 'Jane Smith',
  //     contactInfo: '987-654-3210',
  //     orderDetails: 'Website development',
  //     dueDate: '2023-06-30',
  //     additionalInfo: 'Includes hosting',
  //   },
  // ]



  // check if user is Login
  // Created Account through email and password
  useEffect(() => {

    const toRemove = auth.onAuthStateChanged(async userLogin => {
      if (userLogin.providerData[0].providerId != 'google.com') {
        try {
          const ref = doc(db, 'Customer', userLogin.uid);
          const data = await getDoc(ref);
          if (!data.exists()) {
            await setDoc(ref, {
              fname: userData.fname || null,
              lname: userData.lname || null,
              email: userLogin.email || null,
              address: userData.address || null,
              mobileNumber: userData.mobileNumber || null,
              username: userData.username || null,
              password: userData.password || null,
              passwordConfirm: userData.passwordConfirm || null,
              profilePic: userLogin.photoURL || null,
              isAdmin: userData.isAdmin || null,
            }, { merge: true })
          }
          setLogin(true);
        } catch (err) {
          console.error(err)
        }
      } else {
        setLogin(false);
      }
    })

    return () => toRemove();
  }, [userData])


  // check if user is Login
  // login through Google
  useEffect(() => {
    const toRemove = auth.onAuthStateChanged(async userLogin => {
      if (userLogin.providerData[0].providerId == 'google.com') {
        try {
          const ref = doc(db, 'Customer', userLogin.uid);
          const data = await getDoc(ref);
          if (!data.exists()) {
            await setDoc(ref, {
              fname: null,
              lname: null,
              email: userLogin.email,
              address: null,
              mobileNumber: null,
              username: null,
              password: null,
              passwordConfirm: null,
              profilePic: null,
              isAdmin: null,
            }, { merge: true })
          }
          setLogin(true);
        } catch (err) {
          console.error(err)
        }
      } else {
        setLogin(false);
      }
    })

    return () => toRemove();
  }, [])


  const route = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />
    },
    {
      path: '/login',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Home isLogin={true} />,
        },
        {
          path: 'signup',
          element: <Home isLogin={false} isSignup={true} />
        }
      ]
    },
    {
      path: '/inquire',
      element: <Inquire />
    },
    {
      path: '/legal',
      element: <Legal />
    },
    {
      path: 'servicePrice',
      element: <ServicePrice />
    }
  ])

  const routeCustomer = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />
    },
    {
      path: '/customer',
      element: <Customer />
    },
    {
      path: 'profilepagecustomer',
      element: <ProfilePageCustomer />
    },
    {
      path: '/inquire',
      element: <Inquire />
    },
    {
      path: '/legal',
      element: <Legal />
    },
    {
      path: 'servicePrice',
      element: <ServicePrice />
    }
  ])


  const routeAdmin = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />
    },
    {
      path: '/admin',
      element: <Admin />
    },
    {
      path: '/profilepageadmin',
      element: <ProfilePageAdmin />
    },
    {
      path: '/editprice',
      element: <Admin />
    },
    {
      path: '/createtask',
      element: <Admin />
    },
    {
      path: '/archivefiles',
      element: <Admin />
    },
    {
      path: '/manageaccount',
      element: <Admin />
    },
    {
      path: '/inquire',
      element: <Inquire />
    },
    {
      path: '/legal',
      element: <Legal />
    },
    {
      path: 'serviceprice',
      element: <ServicePrice />
    }])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userLogin => {
      if (userLogin == null) {
        userType.current = route;
        setLoading(true);
        return
      }

      if (userLogin.providerData[0].providerId == 'google.com') {
        userType.current = routeCustomer;
        const loadingConfirm = userType.current != null ? true : false;
        setLoading(loadingConfirm)
        return
      }


      if (userLogin.providerData[0].email.includes('@admin.139907.print.com')) {
        userType.current = routeAdmin;
        const loadingConfirm = userType.current != null ? true : false;
        setLoading(loadingConfirm);
        return
      } else {
        userType.current = routeCustomer;
        const loadingConfirm = userType.current != null ? true : false;
        setLoading(loadingConfirm);
        return
      }

    })

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <ServiceContext.Provider value={{ service, setService }}>
        <ProfilePicContext.Provider value={{ currentProfilePic, setCurrentProfilePic }}>
          <ViewReceiptOpenContext.Provider value={{ viewReceiptOpen, setViewReceiptOpen }}>
            <ReceiptContext.Provider value={{ receiptId, setReceiptId }}>
              <CreateAccountContext.Provider value={{ createAccountOpen, setCreateAccountOpen }}>
                <UserDataContext.Provider value={{ userData, setUserData }}>
                  <ModalContext.Provider value={{ modalSignupOpen, setModalSignupOpen, login, setLogin }}>
                    {loading && <RouterProvider router={userType.current}><Home /></RouterProvider>}
                  </ModalContext.Provider>
                </UserDataContext.Provider>
              </CreateAccountContext.Provider>
            </ReceiptContext.Provider>
          </ViewReceiptOpenContext.Provider>
        </ProfilePicContext.Provider >
      </ServiceContext.Provider>

      {/* Footer */}
      < footer className="bg-blue-600 text-white py-3 w-full mt-auto" >
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <div className="text-sm">
            Copyright © 2025 - Kar-C Printing Services
          </div>
          <div className="text-sm">
            <a href="#" className="hover:underline mr-4">Terms & Conditions</a>
          </div>
          <div className="flex space-x-4">
            {/* Facebook Icon - made larger with w-6 h-6 */}
            <a href="#" className="hover:text-blue-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>

            {/* Email Icon - made larger with w-6 h-6 */}
            <a href="#" className="hover:text-blue-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </a>

            {/* Messenger Icon - made larger with w-6 h-6 */}
            <a href="#" className="hover:text-blue-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </>
  )
}

export default App

