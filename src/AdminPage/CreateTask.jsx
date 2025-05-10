import styles from './CreateTask.module.css';
import { useEffect, useState, useRef } from 'react';
import { db } from '../config/firebase.jsx'
import { collection, addDoc, doc, setDoc, getDocs } from 'firebase/firestore'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToastContainer, toast } from 'react-toastify';

const CreateTask = () => {

  const nameRef = useRef();
  const phoneRef = useRef();
  const [priceData, setPriceData] = useState([])
  const [servicePrice, setServicePrice] = useState('');
  const [customerName, setCustomerName] = useState();
  const [customer, setCustomer] = useState([]);
  const [createTask, setCreateTask] = useState({
    name: null,
    customerID: null,
    phone: null,
    email: null,
    service: null,
    price: null,
    timeDate: null,
    description: null
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const ref = collection(db, 'Price');
        const dataFetch = await getDocs(ref);

        const dataScope = dataFetch.docs.map(data => ({
          ...data.data()
        }))

        setPriceData(dataScope);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const dataFetch = await getDocs(collection(db, 'Customer'));

        const filter = dataFetch.docs.filter(data => {
          return data.data().isAdmin != true;
        })

        const dataSnap = filter.map(data => ({
          docId: data.id,
          ...data.data()
        }))

        setCustomer(dataSnap)

      } catch (err) {
        console.error(err)
      }
    }
    getData();
  }, [])

  const onChangeName = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, name: e.target.value }))
  }

  const onChangePhone = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, phone: e.target.value }))
  }

  const onChangeID = (value) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, customerID: value }))
    setCustomerName(customer.filter((doc) => { return doc.docId == value }))
  }

  useEffect(() => {
    const onChangeEmail = () => {
      setCreateTask((taskPrev) => ({ ...taskPrev, email: customerName != null ? customerName[0].email : '' }))
    }
    const onChangeName = () => {
      setCreateTask((taskPrev) => ({ ...taskPrev, name: customerName != null ? `${customerName[0].fname} ${customerName[0].lname}` : '' }))
    }
    const onChangePhone = () => {
      setCreateTask((taskPrev) => ({ ...taskPrev, phone: customerName != null ? customerName[0].mobileNumber : '' }))
    }

    onChangePhone();
    onChangeName();
    onChangeEmail();
  }, [customerName])

  const onChangeServices = (value) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, service: value }))
  }

  const onChangeDateTime = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, timeDate: e.target.value }))
  }

  const onChangeDescription = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, description: e.target.value }))
  }

  const price = (doc) => {
    setServicePrice(doc);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (createTask.service == null) {
        throw new Error("Please pick a Service")
      }

      const ref = collection(db, 'Order');
      const uid = await addDoc(ref, {
        name: createTask.name,
        customerID: createTask.customerID,
        phone: createTask.phone,
        email: createTask.email,
        service: createTask.service,
        price: servicePrice.price,
        timeDate: createTask.timeDate,
        description: createTask.description,
        isReceipt: false,
        status: null,
      })

      const refId = doc(db, 'Order', uid.id);
      await setDoc(refId, {
        referencekey: uid.id
      }, { merge: true });

      e.target.reset();
      toast.success("Successfully created", {
        position: 'top-right',
        style: {
          width: "20vw",
          fontSize: "13px"
        }
      });
    } catch (error) {
      toast.error("Unsuccessful, input missing. Try Again !", {
        position: 'top-right',
        style: {
          width: "20vw",
          fontSize: "13px"
        }
      });
      console.error(error);
    }
  }

  useEffect(() => {
    if (createTask.name?.includes('null')) {
      nameRef.current.value = '';
    }
    if (createTask.phone == (null)) {
      phoneRef.current.value = '';
    }
  }, [createTask])


  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>CREATE TASK / JOB ORDER</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full h-[46px] sm:w-64 md:w-full lg:w-full xl:w-full text-xs sm:text-sm md:text-base"
                variant="outline"
              >
                {customerName != null ? customerName[0].email : 'Pick Customer'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 max-h-60 sm:max-h-72 overlay-auto bg-[#cae0f0] border-[#5D4037]"
            >
              <DropdownMenuLabel className="text-center text-xs sm:text-sm md:text-base">Customer Accounts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup onValueChange={onChangeID}>
                {customer.map((doc) => (
                  <DropdownMenuRadioItem
                    key={doc.docId}
                    value={doc.docId}
                    className="text-xs sm:text-sm md:text-[13px] px-2 py-1.5 md:py-2 truncate hover:bg-blue-100 cursor-pointer"
                  >
                    {doc.email}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className={styles.formRow}>

            {(customerName != null && customerName[0].fname) == null
              ? <input
                type="text"
                ref={nameRef}
                value={createTask.name}
                onChange={onChangeName}
                placeholder="Name"
                className={styles.inputField}
                disabled={false}
                required
              />
              : (<input
                type="text"
                ref={nameRef}
                placeholder="Select Customer First (Name)"
                className={styles.inputField}
                value={customerName != null ? `${customerName[0].fname} ${customerName[0].lname}` : ''}
                required
                disabled
                readOnly
              />)}

          </div>

          <div className={styles.formRow}>
            {(customerName != null && customerName[0].fname) == null
              ? <input
                type="tel"
                ref={phoneRef}
                pattern="[0-9]{11}"
                value={createTask.phone || ''}
                placeholder="Phone no."
                onChange={onChangePhone}
                className={styles.inputField}
                disabled={false}
                required

              /> :
              <input
                type="tel"
                pattern="[0-9]{11}"
                ref={phoneRef}
                placeholder="Select Customer First (Phone no.)"
                value={customerName != null ? customerName[0].mobileNumber : ''}
                className={styles.inputField}
                required
                disabled
                readOnly
              />}

            <input
              type="email"
              name="email"
              placeholder="Select Customer First (Email)"
              className={styles.inputField}
              value={customerName != null ? customerName[0].email : ''}
              required
              readOnly
              disabled
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full sm:w-90 md:w-90 md-text-sm lg:w-80 xl:w-95 text-xs sm:text-sm"
                variant="outline"
              >
                {createTask.service != null ? createTask.service : 'Services'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 max-h-60 sm:max-h-72 overflow-y-auto bg-[#cae0f0] border-[#5D4037]"
            >
              <DropdownMenuLabel className="text-center text-xs sm:text-sm md:text-base">KER-C</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup onValueChange={onChangeServices}>
                {priceData.map((doc, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    onClick={() => price(doc)}
                    value={`${doc.service} ${doc.option}`}
                    className="text-xs sm:text-sm md:text-base py-1 sm:py-2 hover:bg-blue-100"
                  >
                    {doc.service} {doc.option}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className={styles.singleRow}>
            <input
              type="datetime-local"
              name="timeDate"
              onChange={onChangeDateTime}
              placeholder="Time/Date"
              className={styles.inputField}
              required
            />
          </div>

          <div className={`${styles.singleRow} ${styles.spacedField}`}>
            <textarea
              name="description"
              placeholder="Description"
              onChange={onChangeDescription}
              className={styles.textareaField}
              rows={5}
              required
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.confirmButton}>
              Confirm
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default CreateTask;