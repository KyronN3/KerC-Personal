import React from 'react';
import styles from './ArchiveFiles.module.css';

const ArchiveFiles = () => {
  return (
    <div className={styles.container}>
      {/* First Order Receipt */}
      <div className={styles.receiptCard}>
        <div className={styles.leftSection}>
          <div className={styles.customerName}>Earl Robert Caamped</div>
          <div className={styles.customerEmail}>09278412040 ecaampz@gmail.com</div>
          <div className={styles.dueDate}>
            Due Date:<br />
            09/24/2025
          </div>
        </div>
        
        <div className={styles.orderDescription}>
          30 black cotton t-shirts with white and red screen printing—logo on the left chest, large design on the back—ready by next Friday, with a sample before full production.
        </div>
        
        <div className={styles.actionsContainer}>
          <button className={styles.viewButton}>
            VIEW<br />RECEIPT
          </button>
          <button className={styles.deleteButton}>
            DELETE<br />ARCHIVE
          </button>
        </div>
      </div>
      
      {/* Second Order Receipt */}
      <div className={styles.receiptCard}>
        <div className={styles.leftSection}>
          <div className={styles.customerName}>Kent Cartoneros</div>
          <div className={styles.customerEmail}>09538522924 cartneroj@gmail.com</div>
          <div className={styles.dueDate}>
            Due Date:<br />
            10/09/2025
          </div>
        </div>
        
        <div className={styles.orderDescription}>
          Yearbook with a hardbound cover, full-color pages, and a modern layout, including class photos, achievements, and special messages. Deadline: 10/09/2025.
        </div>
        
        <div className={styles.actionsContainer}>
          <button className={styles.viewButton}>
            VIEW<br />RECEIPT
          </button>
          <button className={styles.deleteButton}>
            DELETE<br />ARCHIVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveFiles;