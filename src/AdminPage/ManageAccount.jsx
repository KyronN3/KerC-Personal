import React from 'react';
import styles from './ManageAccount.module.css';

const ManageAccount = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userCard}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Earl Robert Caamped</div>
          <div className={styles.userEmail}>09278412040 ecaampzd@gmail.com</div>
        </div>
        
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}></div>
        </div>
        
        <div className={styles.actionsContainer}>
          <button className={styles.forgotButton}>
            FORGOT PASSWORD?
          </button>
          <button className={styles.deleteButton}>
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    
      <div className={styles.userCard}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Kent Cartoneros</div>
          <div className={styles.userEmail}>09538522924 cartneroj@gmail.com</div>
        </div>
        
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}></div>
        </div>
        
        <div className={styles.actionsContainer}>
          <button className={styles.forgotButton}>
            FORGOT PASSWORD?
          </button>
          <button className={styles.deleteButton}>
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;