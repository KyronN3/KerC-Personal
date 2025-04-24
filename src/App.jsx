import Home from './HomePage/Home.jsx'
import Order from './CustomerPage/Orders.jsx'
import Customer from './CustomerPage/Customer.jsx'
import Admin from './AdminPage/Admin.jsx'
import OrderStatus from './CustomerPage/OrderStatus.jsx'
import OrderHistory from './CustomerPage/OrderHistory.jsx'
import CreateTask from './AdminPage/CreateTask.jsx'
import EditPrice from './AdminPage/EditPrice.jsx'
import CustomerOrder from './AdminPage/CustomerOrder.jsx'
import ManageAccount from './AdminPage/ManageAccount.jsx'
import ArchiveFiles from './AdminPage/ArchiveFiles.jsx'
import CreateAccount from './Authentication/CreateAccount.jsx'
import { NotFound } from './notFound.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { ModalContext, UserDataContext, CreateAccountContext, ReceiptContext } from './context.jsx'
import { useState, useEffect } from 'react'
import { db } from './config/firebase.jsx'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth } from './config/firebase.jsx'

function App() {
  const [modalSignupOpen, setModalSignupOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [receiptId, setReceiptId] = useState('');
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
  const [login, setLogin] = useState(false);

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
    }
  ])

  function ProtectedRoutes() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, []);

    if (isLoading) {
      return
    }
    if (auth?.currentUser?.email == null) {
      return <RouterProvider router={route} />;
    } else {
      if (!auth?.currentUser?.email.includes("@admin.139907.print.com")) {
        return <RouterProvider router={createBrowserRouter([
          {
            path: '/',
            element: <Home />,
            errorElement: <NotFound />
          },
          {
            path: '/customer',
            element: <Customer />
          }
        ])} />;

      } else {
        return <RouterProvider router={createBrowserRouter([
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
            path: '/editprice',
            element: <Admin EditTaskOpen={true} />
          },
          {
            path: '/createtask',
            element: <Admin CreateTaskOpen={true} />
          },
          {
            path: '/customerorder',
            element: <Admin orderOpen={true} />
          },
          {
            path: '/archivefiles',
            element: <Admin archiveFileOpen={true} />
          },
          {
            path: '/manageaccount',
            element: <Admin accountOpen={false} />
          }
        ])} />;
      }

    }
  }

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


  return (
    <>

      <ReceiptContext.Provider value={{ receiptId, setReceiptId }}>
        <CreateAccountContext.Provider value={{ createAccountOpen, setCreateAccountOpen }}>
          <UserDataContext.Provider value={{ userData, setUserData }}>
            <ModalContext.Provider value={{ modalSignupOpen, setModalSignupOpen, login, setLogin }}>
              <ProtectedRoutes />
            </ModalContext.Provider>
          </UserDataContext.Provider>
        </CreateAccountContext.Provider>
      </ReceiptContext.Provider>


    </>
  )
}

export default App
