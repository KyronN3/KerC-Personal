import React from 'react';
import styles from './EditPrice.module.css';

const EditPrice = () => {
  return (
    <div className={styles.orderHistoryContainer}>
      <div className={styles.orderTable}>
        <div className={styles.tableHeader}>
          <div className={`${styles.col} ${styles.id}`}>ID</div>
          <div className={`${styles.col} ${styles.name}`}>Name</div>
          <div className={`${styles.col} ${styles.description}`}>Description</div>
          <div className={`${styles.col} ${styles.image}`}>Image</div>
          <div className={`${styles.col} ${styles.price}`}>Price1</div>
          <div className={`${styles.col} ${styles.price}`}>Price2</div>
          <div className={`${styles.col} ${styles.price}`}>Price3</div>
        </div>
        
        <div className={styles.tableRow}>
          <div className={`${styles.col} ${styles.id}`}>1</div>
          <div className={`${styles.col} ${styles.name}`}>Digital Printing</div>
          <div className={`${styles.col} ${styles.description}`}>Fast and precise printing for smaller quantities</div>
          <div className={`${styles.col} ${styles.image}`}>digital.png</div>
          <div className={`${styles.col} ${styles.price}`}>P.XXX</div>
          <div className={`${styles.col} ${styles.price}`}>P.XXX</div>
          <div className={`${styles.col} ${styles.price}`}>P.XXX</div>
        </div>
      </div>
    </div>
  );
};

export default EditPrice;