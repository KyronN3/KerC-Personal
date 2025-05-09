import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logo from '../assets/imgs/logo.png';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../config/firebase.jsx';
import { collection, getDocs } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { Squash as Hamburger } from 'hamburger-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePicContext, ModalContext, ServiceContext } from '../context.jsx';
import {
  LogOut,
  User,
  ShoppingCart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import btnNext from "../assets/imgs/inquiryPage/btnNext.png";
import btnPrev from "../assets/imgs/inquiryPage/btnPrev.png";
import tshirt from "../assets/imgs/inquiryPage/tshirt.jpg";
import tarpaulin from "../assets/imgs/inquiryPage/tarpaulin.jpg";
import printingService from "../assets/imgs/inquiryPage/printingService.jpg";
import calendars from "../assets/imgs/inquiryPage/calendars.jpg";
import invitation from "../assets/imgs/inquiryPage/invitation.jpg";
import businessCard from "../assets/imgs/inquiryPage/businessCard.jpg";
import carbonlessReceipts from "../assets/imgs/inquiryPage/carbonlessReceipts.jpg";
import envelope from "../assets/imgs/inquiryPage/envelope.jpg";
import flyersBrochureElectionpropaganda from "../assets/imgs/inquiryPage/flyersBrochureElectionpropaganda.jpg";
import formsDuploDuplication from "../assets/imgs/inquiryPage/formsDuploDuplication.jpg";
import graduationRibbon from "../assets/imgs/inquiryPage/graduationRibbon.jpg";
import idCard from "../assets/imgs/inquiryPage/idCard.jpg";
import idPictures from "../assets/imgs/inquiryPage/idPictures.jpg";
import lamination from "../assets/imgs/inquiryPage/lamination.jpg";
import layouting from "../assets/imgs/inquiryPage/layouting.jpg";
import newsLetter from "../assets/imgs/inquiryPage/newsLetter.jpg";
import ordinaryReceipts from "../assets/imgs/inquiryPage/ordinaryReceipts.jpg";
import stickerLabels from "../assets/imgs/inquiryPage/stickerLabels.jpg";
import xeroxPhotocopy from "../assets/imgs/inquiryPage/xeroxPhotocopy.jpg";
import LoadingScreen from '../LoadingScreen.jsx'
import yearBook from "../assets/imgs/inquiryPage/yearBook.jpg";
import './InquiryPage.css';
import Style from './InquiryPage.module.css';



const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-next" onClick={onClick}>
      <img src={btnNext} alt="Next" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-prev" onClick={onClick}>
      <img src={btnPrev} alt="Previous" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '10px',
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '5px',
      },
    },
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
      },
    },
  ],
};

const scrollToSection = (id) => {

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function InquiryPage() {

  const { currentProfilePic } = useContext(ProfilePicContext);
  const { setService } = useContext(ServiceContext)
  const { modalSignupOpen, setModalSignupOpen, login } = useContext(ModalContext);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data] = useState([
    { image: tshirt, name: "T-Shirt Printing", service: "T-Shirt Printing", description: "We use high-quality screen printing to create durable and vibrant designs for personal, business, or event needs. Perfect for bulk orders with a professional finish.", options: null, price: null },
    { image: printingService, name: "Printing Services", service: "Printing Service", description: "Comprehensive printing solutions with exceptional quality. From documents to marketing materials, we deliver clear prints that showcase your content effectively.", options: null, price: null },
    { image: calendars, name: "Custom Calendars", service: "Calendar", description: "Beautifully designed personalized calendars. Create memorable marketing tools or gifts with custom images and important dates highlighted.", options: null, price: null },
    { image: tarpaulin, name: "Tarpaulin", service: "Tarpaulin", description: "We offer high-resolution tarpaulin printing for banners, signage, and events. Designed for durability and vibrant color, our prints are perfect for indoor and outdoor use.", options: null, price: null },
    { image: invitation, name: "Invitation Cards", service: "Invitation", description: "Elegant invitation cards for weddings, corporate events, and special occasions. Create memorable invitations that set the perfect tone for your event.", options: null, price: null },
    { image: businessCard, name: "Business Cards", service: "Business Card", description: "Professional business cards printed with customizable designs. Make a lasting first impression with our high-quality, attention-grabbing business cards.", options: null, price: null },
    { image: carbonlessReceipts, name: "Carbonless Receipts", service: "Carbonless Receipts", description: "Efficient multi-part carbonless receipt books for businesses needing duplicate or triplicate copies. Each book is professionally bound and customized with your business information.", options: null, price: null },
    { image: envelope, name: "Custom Envelopes", service: "Envelope", description: "Branded envelopes in various sizes with your logo and design elements. Perfect for creating professional correspondence that reinforces your brand identity.", options: null, price: null },
    { image: flyersBrochureElectionpropaganda, name: "Flyers & Brochures", service: "Flyers / Brochure / Election propaganda", description: "Eye-catching flyers and detailed brochures printed on quality paper with vibrant colors. Effectively communicate your message through these versatile marketing materials.", options: null, price: null },
    { image: formsDuploDuplication, name: "Forms & Duplications", service: "Forms/Duplo/Duplication", description: "Using our specialized Riso duplicating machine. Our Riso technology ensures high-volume, cost-effective reproduction for all your business documentation needs.", options: null, price: null },
    { image: graduationRibbon, name: "Graduation Ribbons", service: "Graduation Ribbon", description: "Personalized graduation ribbons to celebrate academic achievements. Available in various colors with custom printing to commemorate this special milestone.", options: null, price: null },
    { image: idCard, name: "ID Cards", service: "ID Card", description: "Durable and professional ID cards for organizations and events. Includes customization options for design, security features, and attachment methods.", options: null, price: null },
    { image: idPictures, name: "ID Pictures", service: "ID pictures", description: "Professional ID photo services with proper lighting and formatting for official documents." },
    { image: lamination, name: "Lamination Services", service: "Lamination", description: "Document preservation through high-quality lamination. Protect important papers from damage while maintaining clarity and accessibility.", options: null, price: null },
    { image: layouting, name: "Layout Design", service: "Layouting", description: "Professional layout design services for publications, marketing materials, and documents. Our designers create visually appealing arrangements that effectively convey your message.", options: null, price: null },
    { image: newsLetter, name: "Newsletters", service: "Newsletter", description: "Engaging newsletters designed and printed to keep your audience informed. Custom templates and formatting options available for regular communications.", options: null, price: null },
    { image: ordinaryReceipts, name: "Standard Receipts", service: "Ordinary Receipts", description: "Professional receipt books for daily business transactions. Customizable with your business information and sequential numbering for easy record-keeping.", options: null, price: null },
    { image: stickerLabels, name: "Sticker Labels", service: "Sticker / Labels", description: "High-quality adhesive stickers and labels in various sizes and materials. Perfect for product labeling, promotional items, or organizational needs.", options: null, price: null },
    { image: xeroxPhotocopy, name: "Xerox & Photocopying", service: "Xerox/Photocopy", description: "Fast and reliable copying services with options for different paper types and sizes. High-quality reproductions for documents, images, and more.", options: null, price: null },
    { image: yearBook, name: "Yearbooks", service: "Year Book", description: "Professionally designed and printed yearbooks to capture memories. Custom layouts, high-quality binding, and premium paper options for schools, organizations, and special events.", options: null, price: null }])

  const navOrder = useNavigate();
  const navLogout = useNavigate();


  useEffect(() => { setTimeout(() => { setLoading(false) }, 1000) }, [])

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

  const goToProfilePageAdmin = () => {
    navOrder('/profilepageadmin')
  }

  const confirmClick = async (item) => {
    const getSnap = await getDocs(collection(db, 'Price'));
    const docSnap = getSnap.docs.map((doc) => ({
      Id: doc.id,
      ...doc.data(),
      image: item.image,
      mean: item.description,
      name: item.name,
    }))

    const data = docSnap.filter((doc) => {
      return doc.service.includes(item.service);
    })

    setService(data)

    navOrder('/serviceprice')
  }

  return (

    <div className="flex flex-col min-h-screen">
      <nav className={Style.HeaderContainer}>
        <img className={Style.Image} src={Logo} alt="Logo" />

        <div className={Style.hamburger}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <div className={`${Style["nav-links"]} ${isOpen ? Style.active : ""}`}>
          <Link to='/' onClick={() => { closeAll(); setOpen(false) }} className={Style.Home}>HOME</Link>
          <Link to='/#about' onClick={() => { setOpen(false); scrollToSection('about') }} className={Style.About}>ABOUT</Link>
          <Link to='/#contact' onClick={() => { setOpen(false); scrollToSection('contact') }} className={Style.Contact}>CONTACTS</Link>
          {login ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className={Style.Profile}>
                  <AvatarImage src={currentProfilePic || "https://github.com/shadcn.png"} />
                  <AvatarFallback>...Loading</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 relative z-50 bg-orange-200">
                {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                  ?
                  <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
                  :
                  <DropdownMenuLabel className="text-center">Admin</DropdownMenuLabel>}
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2" />
                    {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                      ?
                      <span className='cursor-pointer'>Profile</span>
                      :
                      <span className='cursor-pointer' onClick={goToProfilePageAdmin}>Profile</span>
                    }
                    <DropdownMenuShortcut>P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {!auth?.currentUser?.email.includes("@admin.139907.print.com")
                      ?
                      <><ShoppingCart className="mr-2" />
                        <Link to='/customer' className='cursor-pointer' onClick={myOrderNav}>My Order</Link>
                        <DropdownMenuShortcut>M</DropdownMenuShortcut>
                      </>
                      :
                      <>
                        <ShoppingCart className="mr-2" />
                        <Link to='/admin' className='cursor-pointer' onClick={myOrderNav}>Manage Orders</Link>
                        <DropdownMenuShortcut>M</DropdownMenuShortcut>
                      </>
                    }
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut className="mr-2" />
                  <span onClick={logout} className='cursor-pointer'>Log out</span>
                  <DropdownMenuShortcut>Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to='/login' className={Style.Login} onClick={() => { LoginClick(); setOpen(false) }}>Login</Link>
          )}
        </div>
      </nav>

      <main className="flex-grow">
        {loading && <LoadingScreen />}
        <div style={{ width: "85%", margin: "auto", padding: "5px 20px", position: "relative" }}>
          <h2 className="Service">Choose a service</h2>
          <div>
            <Slider {...settings}>
              {data.map((item) => (
                <div className="serviceName" key={item.name}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img className="serviceImage"
                      src={item.image}
                      alt={item.name}
                    />
                    <h3>{item.name}</h3>
                    <p className="serviceDescription">{item.description}</p>
                    <button className="btnConfirm" onClick={() => { confirmClick(item) }}>Confirm</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </main>


    </div>
  );
}

export default InquiryPage;