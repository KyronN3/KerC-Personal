import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
import yearBook from "../assets/imgs/inquiryPage/yearBook.jpg";
import './InquiryPage.css';


const data = [
  { image: tshirt, name: "T-shirt printing", description: "We use high-quality screen printing to create durable and vibrant designs for personal, business, or event needs. Perfect for bulk orders with a professional finish." },
  { image: printingService, name: "Printing Services", description: "Comprehensive printing solutions with exceptional quality. From documents to marketing materials, we deliver clear prints that showcase your content effectively." },
  { image: calendars, name: "Custom Calendars", description: "Beautifully designed personalized calendars. Create memorable marketing tools or gifts with custom images and important dates highlighted." },
  { image: tarpaulin, name: "Tarpaulin", description: "We offer high-resolution tarpaulin printing for banners, signage, and events. Designed for durability and vibrant color, our prints are perfect for indoor and outdoor use." },
  { image: invitation, name: "Invitation Cards", description: "Elegant invitation cards for weddings, corporate events, and special occasions. Create memorable invitations that set the perfect tone for your event." },
  { image: businessCard, name: "Business Cards", description: "Professional business cards printed with customizable designs. Make a lasting first impression with our high-quality, attention-grabbing business cards." },
  { image: carbonlessReceipts, name: "Carbonless Receipts", description: "Efficient multi-part carbonless receipt books for businesses needing duplicate or triplicate copies. Each book is professionally bound and customized with your business information." },
  { image: envelope, name: "Custom Envelopes", description: "Branded envelopes in various sizes with your logo and design elements. Perfect for creating professional correspondence that reinforces your brand identity." },
  { image: flyersBrochureElectionpropaganda, name: "Flyers & Brochures", description: "Eye-catching flyers and detailed brochures printed on quality paper with vibrant colors. Effectively communicate your message through these versatile marketing materials." },
  { image: formsDuploDuplication, name: "Forms & Duplications", description: "Using our specialized Riso duplicating machine. Our Riso technology ensures high-volume, cost-effective reproduction for all your business documentation needs." },
  { image: graduationRibbon, name: "Graduation Ribbons", description: "Personalized graduation ribbons to celebrate academic achievements. Available in various colors with custom printing to commemorate this special milestone." },
  { image: idCard, name: "ID Cards", description: "Durable and professional ID cards for organizations and events. Includes customization options for design, security features, and attachment methods." },
  { image: idPictures, name: "ID Pictures", description: "Professional ID photo services with proper lighting and formatting for official documents." },
  { image: lamination, name: "Lamination Services", description: "Document preservation through high-quality lamination. Protect important papers from damage while maintaining clarity and accessibility." },
  { image: layouting, name: "Layout Design", description: "Professional layout design services for publications, marketing materials, and documents. Our designers create visually appealing arrangements that effectively convey your message." },
  { image: newsLetter, name: "Newsletters", description: "Engaging newsletters designed and printed to keep your audience informed. Custom templates and formatting options available for regular communications." },
  { image: ordinaryReceipts, name: "Standard Receipts", description: "Professional receipt books for daily business transactions. Customizable with your business information and sequential numbering for easy record-keeping." },
  { image: stickerLabels, name: "Sticker Labels", description: "High-quality adhesive stickers and labels in various sizes and materials. Perfect for product labeling, promotional items, or organizational needs." },
  { image: xeroxPhotocopy, name: "Xerox & Photocopying", description: "Fast and reliable copying services with options for different paper types and sizes. High-quality reproductions for documents, images, and more." },
  { image: yearBook, name: "Yearbooks", description: "Professionally designed and printed yearbooks to capture memories. Custom layouts, high-quality binding, and premium paper options for schools, organizations, and special events." }
];


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


function InquiryPage() {
  return (
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
                <button className="btnConfirm">Confirm</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}


export default InquiryPage;