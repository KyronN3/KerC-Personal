import React from 'react';
import styles from './ManageAccount.module.css';

const ManageAccount = () => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridRow}>
        <div className={styles.gridItem}>
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
        </div>

        <div className={styles.gridItem}>
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

        {/* You can add more user cards here and they'll automatically flow into the grid */}
      </div>
    </div>
  );
};

export default ManageAccount;