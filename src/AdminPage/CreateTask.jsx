import styles from './CreateTask.module.css';
import { useEffect, useState } from 'react';
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


  const [priceData, setPriceData] = useState([])
  const [servicePrice, setServicePrice] = useState('');
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


  const onChangeName = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, name: e.target.value }))
  }
  const onChangeID = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, customerID: e.target.value }))
  }

  const onChangePhone = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, phone: e.target.value }))
  }

  const onChangeEmail = (e) => {
    setCreateTask((taskPrev) => ({ ...taskPrev, email: e.target.value }))
  }

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
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>CREATE TASK / JOB ORDER</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              onChange={onChangeName}
              placeholder="Name"
              className={styles.inputField}
              required
            />

            <input
              type="text"
              name="customerId"
              placeholder="Customer ID"
              onChange={onChangeID}
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formRow}>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{11}"
              placeholder="Phone no."
              onChange={onChangePhone}
              className={styles.inputField}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChangeEmail}
              className={styles.inputField}
              required
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={`w-80`} variant="outline">{createTask.service != null ? createTask.service : 'Services'}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 h-73 bg-[#FAEBD7] border-[#5D4037]">
              <DropdownMenuLabel className="text-center">KER-C</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup onValueChange={onChangeServices}>
                {priceData.map((doc, index) => (
                  <DropdownMenuRadioItem key={index} onClick={() => price(doc)} value={`${doc.service} ${doc.option}`} >{doc.service} {doc.option}</DropdownMenuRadioItem>
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