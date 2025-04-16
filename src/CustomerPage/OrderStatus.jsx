import { Textarea } from "@/components/ui/textarea"
import Template from '../assets/imgs/inquiryPage/printing.png'
import Style from './OrderStatus.module.css'


export default function OrderStatusModal() {
  return (<>
    <div className={Style.orderStatusFlex}>
      <div className={Style.orderStatusGrid}>

        <h1 className={Style.headOrderStatus}>Order Status</h1>

        <div className={Style.picContainer}>
            <img src={Template} alt="Image" className={Style.pic} />
        </div>

        <div className={Style.statusMessage}>
            <p>Almost done na po :). Ready to pick up tomorrow</p>
        </div>

      </div>
    </div>
  </>
  );
}

