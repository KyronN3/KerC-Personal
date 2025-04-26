import Style from './Home.module.css'
import Logo from '../assets/imgs/logo.png'
import Shop from '../assets/imgs/shop.png'
import Telephone from '../assets/imgs/telephone.png'
import Facebook from '../assets/imgs/facebookOutline.png'
import Email from '../assets/imgs/mail.png'
import Messenger from '../assets/imgs/messengerOutline.png'
import AboutUsPic from '../assets/imgs/printing.webp'
import StyleModal from './Modal.module.css'
import Login from '../Authentication/Login.jsx'
import { Squash as Hamburger } from 'hamburger-react';
import { Button } from "@/components/ui/button"
import { Bold } from 'lucide-react'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
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

import { useState, useContext } from 'react'
import CreateAccount from '../Authentication/CreateAccount.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { ModalContext } from '../context.jsx'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from '../config/firebase.jsx'
import { signOut } from 'firebase/auth'
export default function Home({ isLogin = false, isSignup = false }) {
  const navLogout = useNavigate();
  const { modalSignupOpen, setModalSignupOpen, login } = useContext(ModalContext);
  const [modalLogin, setModalLogin] = useState(isLogin);
  const [modalSignup, setModalSignup] = useState(isSignup);
  const navOrder = useNavigate();
  const [isOpen, setOpen] = useState(false);


  const LoginClick = () => {
    setModalLogin(!modalLogin);
    navLogout('/')
  }

  const CloseModal = () => {
    setModalLogin(!modalLogin)
    navLogout('/')
  }

  const SignupClick = () => {
    if (modalSignup) {
      setModalSignup(false);
    }
    if (modalSignupOpen) {
      setModalSignupOpen(false);
      navLogout('/login')
    } else {
      navLogout('/')
    }
  }

  const InquireClick = () => {
    navOrder('/inquire');
  };

  const closeAll = () => {
    setModalSignupOpen(false);
    setModalSignup(false);
    setModalLogin(false)
  }

  modalSignupOpen || modalSignup ?
    (document.body.style.overflow = `hidden`)
    :
    document.body.style.overflow = 'scroll'

  const logout = async () => {
    await signOut(auth);
    navLogout(0);
  }

  const myOrderNav = () => {
    !auth?.currentUser?.email.includes("@admin.139907.print.com")
      ?
      navOrder('/customer')
      :
      navOrder('/admin')
  }

  return (<>

    <nav className={Style.HeaderContainer}>
      <img className={Style.Image} src={Logo} />
      
      <div className={Style.hamburger}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <div className={`${Style["nav-links"]} ${isOpen ? Style.active : ""}`}>
        <Link to='/' onClick={() => {closeAll(); setOpen(false)}} className={Style.Home}>HOME</Link>
        <Link to='/#about' onClick={() => {setOpen(false); scrollToSection('about')}} className={Style.About}>ABOUT</Link>
        <Link to='/#contact' onClick={() => {setOpen(false); scrollToSection('contact')}} className={Style.Contact}>CONTACTS</Link>
        {login ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className={Style.Profile}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>...Loading</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 relative z-[1000] bg-[#f3c278]">
                {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                  ?
                  <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
                  :
                  <DropdownMenuLabel className="text-center">Admin</DropdownMenuLabel>}
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span className='cursor-pointer'>Profile</span>
                    <DropdownMenuShortcut>P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                      ?
                      <><ShoppingCart />
                        <Link to='/customer' className='cursor-pointer' onClick={myOrderNav}>My Order</Link>
                        <DropdownMenuShortcut>M</DropdownMenuShortcut>
                      </>
                      :
                      <>
                        <ShoppingCart />
                        <Link to='/admin' className='cursor-pointer' onClick={myOrderNav}>Manage Orders</Link>
                        <DropdownMenuShortcut>M</DropdownMenuShortcut>
                      </>
                    }

                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut />
                <span onClick={logout} className='cursor-pointer'>Log out</span>
                <DropdownMenuShortcut>Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : (
            <Link to='/login' className={Style.Login} onClick={() => {LoginClick(); setOpen(false)}}>Login</Link>
          )}
        </div>
      </nav>

    {modalLogin && (
      <div className={StyleModal.modal}>
        <div className={StyleModal.overlay} onClick={CloseModal}></div>
        <div className={StyleModal.modalContent}>
          <Login />
        </div>
      </div>)}

    {modalSignupOpen || modalSignup ? (
      <div className={StyleModal.modal}>
        <div className={StyleModal.overlay} onClick={SignupClick}></div>
        <div className={StyleModal.modalContent}>
          <CreateAccount />
        </div>
      </div>) : null}


    <main>
      <article>
        <div className={Style.mainContainer}>
          <img src={AboutUsPic} className={Style.AboutUsPic}  />
          <div className={Style.bigBox} id="about">

            <h1>About Ker-C Printing Services</h1>
            <p>
              Your ideas, our prints—delivered with precision and care.
              At Ker-C Printing Services, we blend quality craftsmanship with modern convenience.
              Whether you need vibrant prints, custom designs, or seamless order tracking, our online system makes the process effortless.
              With a range of services and excellent customer service, we are committed to providing you with quality products that meet your needs.
              Experience printing made simple.
            </p>
            <Button variant="outline" className={Style.enquire} onClick={InquireClick}>Inquire Price</Button>
          </div>
        </div>

        <div className={Style.mainContainer}>
          <div className={Style.smallBox}>
            <h1> Ker-C Printing Services Location</h1>
            <p>
              Ker-C Printing Services is conveniently located in the city center of Panabo, near Gaisano Grand Mall.
              Brgy, 1979 Ybañez Compound, Panabo Wharf Rd, Panabo, 8105 Davao del Norte
            </p>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7914.811939895426!2d125.686971!3d7.
                       308206!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f945967c2cdf47%3A0x42db7931e05c970b!2sKER-
                       C%20Printing%20Services!5e0!3m2!1sen!2sph!4v1744091542420!5m2!1sen!2sph"
            className={Style.Map} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div className={Style.cardContainerParent} id="contact">
          <div className={Style.cardContainer}>

            <div className={Style.cardOpen}>
              <img src={Shop} className={Style.icons} />
              <h2 style={{ marginTop: 10, fontStyle: Bold, fontWeight: 1000 }}>Opening Hours</h2>
              <p>
                Monday - Saturday
                8:00 AM - 7:00 PM
              </p>
            </div>

            <div className={Style.cardMessenger}>
              <img src={Messenger} className={Style.icons} />
              <h2 style={{ marginTop: 10, fontStyle: Bold, fontWeight: 1000 }}>Message Us</h2>
              <p>
                KER-C Printing Services
              </p>
            </div>

            <div className={Style.cardPhone}>
              <img src={Telephone} className={Style.icons} />
              <h2 style={{ marginTop: 10, fontStyle: Bold, fontWeight: 1000 }}>Call Us</h2>
              <p>
                09276850004
                09123456789
              </p>
            </div>

            <div className={Style.cardFacebook}>
              <img src={Facebook} className={Style.icons} />
              <h2 style={{ marginTop: 10, fontStyle: Bold, fontWeight: 1000 }}>Follow Us</h2>
              <p>
                KER-C Printing Services
              </p>
            </div>

            <div className={Style.cardEmail}>
              <img src={Email} className={Style.icons} />
              <h2 style={{ marginTop: 10, fontStyle: Bold, fontWeight: 1000 }}>Send us an Email</h2>
              <p>
                kercprinting@gmail.com
              </p>
            </div>

          </div>
        </div>


        <div className={Style.FAQContainerParent} style={{marginBottom: 100}}>
          <div className={Style.FAQContainer}>
            <h1 className={Style.headerFAQ}>KER-C FAQs</h1>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className={Style.headerAccordion}>What services do you offer?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  We provide high-quality printing services, including document printing, custom designs, business materials, and more.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className={Style.headerAccordion}>Where are you located?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  We are located in the center of Panabo City, near the Gaisano Grand Mall.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className={Style.headerAccordion} >Can I place an order online?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  Currently, online orders are not available. We invite you to visit our shop directly, where our team will be happy to assist you in person and ensure that all your requirements are met. Thank you for your understanding!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className={Style.headerAccordion}>How long does it take to process an order?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  Processing time depends on the service. Standard prints are usually completed within the day, while bulk or custom orders may take longer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className={Style.headerAccordion}>Do you offer delivery?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  At this time, we provide pickup at our location. For more information regarding delivery options, please contact us directly. We're here to help!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className={Style.headerAccordion}>How can I track my order?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  You can track your order through our online system or contact us for updates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className={Style.headerAccordion}>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  We accept cash and GCash payments exclusively at our physical store. For more details, please visit us in-store. Thank you!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </article>
    </main>

    <footer>
      <div className={Style.parentFooter}>

        <div className={Style.serviceContainer}>
          <h1 className={Style.headerServices}>Services</h1>
          <hr className={Style.lineOne} />
          <ul className={Style.columnOne}>
            <li>Offset Printing</li>
            <li>Digital Printing</li>
            <li>Business Cards</li>
            <li>Flyers & brochures</li>
            <li>Stickers & Labels</li>
            <li>Calendars</li>
            <li>Envelopes</li>
          </ul>

          <ul className={Style.columnTwo}>
            <li>Offset Printing</li>
            <li>Digital Printing</li>
            <li>Business Cards</li>
            <li>Flyers & brochures</li>
            <li>Stickers & Labels</li>
            <li>Calendars</li>
            <li>Envelopes</li>
          </ul>

          <ul className={Style.columnThree}>
            <li>Offset Printing</li>
            <li>Digital Printing</li>
            <li>Business Cards</li>
            <li>Flyers & brochures</li>
            <li>Stickers & Labels</li>
            <li>Calendars</li>
            <li>Envelopes</li>
          </ul>
          <hr className={Style.lineTwo} />
        </div>
      </div>
    </footer>

  </>);
}