import React from 'react';
import styles from './CustomerOrder.module.css';
import { ClipboardCheck, FileEdit } from 'lucide-react';

const CustomerOrder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.orderCard}>
        <div className={styles.leftSection}>
          <div className={styles.iconContainer}>
            <ClipboardCheck className={styles.icon} size={24} />
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.customerName}>Earl Robert Caamped</div>
            <div className={styles.customerEmail}>09278437040 ecaamped@gmail.com</div>
            <div className={styles.dueDateLabel}>Due Date:</div>
            <div className={styles.dueDate}>09/24/2025</div>
          </div>
        </div>
        <div className={styles.middleSection}>
          <div className={styles.orderDescription}>
            30 black cotton t-shirts with white and red screen printing—logo on the left chest, large design on the back—ready by next Friday, with a sample before full production.
          </div>
        </div>
        <div className={styles.rightSection}>
          <button className={styles.createButton}>
            CREATE RECEIPT
          </button>
          <button className={styles.cancelButton}>
            CANCEL ORDER
          </button>
        </div>
      </div>

      <div className={styles.orderCard}>
        <div className={styles.leftSection}>
          <div className={styles.iconContainer} style={{ backgroundColor: '#FFE87C' }}>
            <FileEdit className={styles.icon} size={24} />
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.customerName}>Kent Cartoneros</div>
            <div className={styles.customerEmail}>09538522924 cartneroj@gmail.com</div>
            <div className={styles.dueDateLabel}>Due Date:</div>
            <div className={styles.dueDate}>10/09/2025</div>
          </div>
        </div>
        <div className={styles.middleSection}>
          <div className={styles.orderDescription}>
            Yearbook with a hardbound cover, full-color pages, and a modern layout, including class photos, achievements, and special messages. Deadline: 10/09/2025.
          </div>
        </div>
        <div className={styles.rightSection}>
          <button className={styles.createButton}>
            CREATE RECEIPT
          </button>
          <button className={styles.cancelButton}>
            CANCEL ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrder;