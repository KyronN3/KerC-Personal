import Style from './Home.module.css'
import Logo from '../assets/imgs/logo.png'
import Shop from '../assets/imgs/shop.png'
import Telephone from '../assets/imgs/telephone.png'
import Facebook from '../assets/imgs/facebookOutline.png'
import FacebookIcon from '../assets/imgs/facebook.png'
import MessengerIcon from '../assets/imgs/messenger.png'
import GmailIcon from '../assets/imgs/gmail.png'
import Email from '../assets/imgs/mail.png'
import Messenger from '../assets/imgs/messengerOutline.png'
import AboutUsPic from '../assets/imgs/printing.webp'
import { Button } from "@/components/ui/button"
import { Bold } from 'lucide-react'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react'
import StyleModal from './Modal.module.css'
import Login from '../Authentication/Login.jsx'
import { Link } from 'react-router-dom'


export default function Home({isLogin = false}) {
  const [modal, setModal] = useState(isLogin);

  const LoginClick = () => {
    setModal(!modal);
  }

  const CloseModal = () => {
    setModal(!modal)
  }

  modal ?
    document.body.style.overflow = `hidden`
    :
    document.body.style.overflow = 'scroll'

  return (<>

      <nav className={Style.HeaderContainer}>
        <img className={Style.Image} src={Logo} />
        <Link to='/' className={Style.Home}>Home</Link>
        <Link to='/about' className={Style.About}>About</Link>
        <Link to='/contacts' className={Style.Contact}> Contacts</Link>
        <Link to='/login' className={Style.Login} onClick={LoginClick}> Login</Link>
      </nav >

    {modal && (
      <div className={StyleModal.modal}>
        <div className={StyleModal.overlay} onClick={CloseModal}></div>
        <div className={StyleModal.modalContent}>
          <Login />
        </div>
      </div>
    )}


    <main>
      <article>
        <div className={Style.mainContainer}>
          <img src={AboutUsPic} className={Style.AboutUsPic} />
          <div className={Style.bigBox}>

            <h1>About Ker-C Printing Services</h1>
            <p>
              Your ideas, our prints—delivered with precision and care.
              At Ker-C Printing Services, we blend quality craftsmanship with modern convenience.
              Whether you need vibrant prints, custom designs, or seamless order tracking, our online system makes the process effortless.
              With a range of services and excellent customer service, we are committed to providing you with quality products that meet your needs.
              Experience printing made simple.
            </p>
            <Button variant="outline" className={Style.enquire}>Enquire Price</Button>
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

        <div className={Style.cardContainerParent}>
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


        <div className={Style.FAQContainerParent}>
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
                  We are in the city center of Panabo, near Gaisano Grand Mall, for easy access.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className={Style.headerAccordion} >Can I place an order online?</AccordionTrigger>
                <AccordionContent className={Style.answerAccordion}>
                  Yes! Our online inquiry system allows you to request services, track orders, and manage your account conveniently.
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
                  Currently, we provide pickup at our location. Contact us for more details on delivery options.
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
                  We accept cash and digital payments. More details are available at our store.
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
          <div className={Style.footerIcons}>
            Copyright &copy; 2025-Ker-C Printing Services
          </div>
          <div className={Style.footerIconsContainer}>
            <img className={Style.iconsFooter} src={FacebookIcon} />
            <img className={Style.iconsFooter} src={GmailIcon} />
            <img className={Style.iconsFooter} src={MessengerIcon} />
          </div>
        </div>
      </div>
    </footer>

  </>);
}
