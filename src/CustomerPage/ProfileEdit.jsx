import React from 'react';
import Style from './ProfileEdit.module.css';

const ProfileEdit = () => {
  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h2 className={Style.title}>EDIT PROFILE</h2>
        <p className={Style.customerId}>Your Customer ID: 139528</p>
      </div>

      <div className={Style.profilePicContainer}>
        <div className={Style.profilePic}>
          <div className={Style.avatarIcon}></div>
        </div>
        <div className={Style.uploadIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16H15V10H19L12 3L5 10H9V16Z" fill="currentColor" />
            <path d="M5 18H19V20H5V18Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className={Style.formContainer}>
        <div className={Style.inputRow}>
          <div className={Style.inputField}>
            <input type="text" placeholder="Name" className={Style.input} />
          </div>
          <div className={Style.inputField}>
            <input type="password" placeholder="Password" className={Style.input} />
          </div>
        </div>
        <div className={Style.inputRow}>
          <div className={Style.inputField}>
            <input type="tel" placeholder="Phone no." className={Style.input} />
          </div>
          <div className={Style.inputField}>
            <input type="email" placeholder="Email" className={Style.input} />
          </div>
        </div>
      </div>

      <div className={Style.confirmButtonContainer}>
        <button className={Style.confirmButton}>Confirm</button>
      </div>
    </div>
  );
};

export default ProfileEdit;
