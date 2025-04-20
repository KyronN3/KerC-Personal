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
import { DataContext } from './context.jsx'
import { useState } from 'react'

function App() {
  const [modalSignupOpen, setModalSignupOpen] = useState(false);
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
          path: '/login/signup',
          element: <Home isLogin={false} isSignup={true} />
        }
      ]

    },
  ])
  return (
    <>
      <DataContext.Provider value={{ modalSignupOpen, setModalSignupOpen }}>
        <RouterProvider router={route} />
      </DataContext.Provider>
    </>
  )
}

export default App
