import Home from './HomePage/Home.jsx'
import Customer from './CustomerPage/Customer.jsx'
import Admin from './AdminPage/Admin.jsx'
import Inquire from './PageInquiry/InquiryPage.jsx'
import Legal from './LegalPage/PageTerm.jsx'
import messenger from './assets/imgs/messenger.png'
import ServicePrice from './PageInquiry/ServicePrice.jsx'
import ProfilePageAdmin from './ProfilePage/ProfilePageAdmin.jsx'
import ProfilePageCustomer from './ProfilePage/ProfilePageCustomer.jsx'
import { NotFound } from './notFound.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { ModalContext, UserDataContext, CreateAccountContext, ReceiptContext, ViewReceiptOpenContext, ProfilePicContext, ServiceContext, PostCloseContext, OrderStatusCloseContext } from './context.jsx'
import { useState, useEffect, useRef } from 'react'
import { db } from './config/firebase.jsx'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth } from './config/firebase.jsx'
import './App.css'

function App() {

  const userType = useRef();
  // const goTo = useNavigate();
  const [viewReceiptOpen, setViewReceiptOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderStatusOpen, setOrderStatusOpen] = useState(false);
  const [postClose, setPostClose] = useState(false); // Change this if the post is wrong
  const [modalSignupOpen, setModalSignupOpen] = useState(false);
  const [service, setService] = useState([]);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [receiptId, setReceiptId] = useState('');
  const [currentProfilePic, setCurrentProfilePic] = useState('');
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
              isAdmin: userLogin.email.includes('@admin.139907.print.com') && true,
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
      path: '/servicePrice',
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
      path: '/profilepagecustomer',
      element: <ProfilePageCustomer />
    },
    {
      path: '/order',
      element: <Customer />
    },
    {
      path: '/orderhistory',
      element: <Customer />
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
      path: '/servicePrice',
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
      <OrderStatusCloseContext.Provider value={{ orderStatusOpen, setOrderStatusOpen }}>
        <PostCloseContext.Provider value={{ postClose, setPostClose }}>
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
        </PostCloseContext.Provider>
      </OrderStatusCloseContext.Provider>

      < footer className="bg-blue-600 text-white py-3 w-full mt-auto" >
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <div className="text-sm">
            Copyright © 2025 - KER-C Printing Services
          </div>
          <div className="text-sm">
            <a href='/legal' className="hover:underline mr-4">Terms & Conditions</a>
          </div>
          <div className="flex space-x-4">
            {/* Facebook Icon - made larger with w-6 h-6 */}
            <a href="https://www.facebook.com/kercprintingservices" className="hover:text-blue-200" target='_blank' rel='noopener noreferrer'>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>

            {/* Messenger Icon - made larger with w-6 h-6 */}
            <a href="https://m.me/kercprintingservices" className="hover:text-blue-200" target='_blank' rel='noopener noreferrer'>
              <img src={messenger} alt="" style={{ height: 20, marginTop: 2 }} />
            </a>
          </div>
        </div>
      </footer>

    </>
  )
}

export default App

