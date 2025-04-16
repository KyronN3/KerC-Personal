import React, { useState } from 'react';
import styles from './CreateTask.module.css';

const CreateTask= () => {

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>CREATE TASK / JOB ORDER</h1>
      
      <form >
        <div className={styles.formGrid}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.inputField}
            />
            
            <input
              type="text"
              name="customerId"
              placeholder="Customer ID"
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.formRow}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone no."
              className={styles.inputField}
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.singleRow}>
            <input
              type="datetime-local"
              name="timeDate"
              placeholder="Time/Date"
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.singleRow}>
            <textarea
              name="description"
              placeholder="Description"
              className={styles.textareaField}
              rows={5}
            />
          </div>
          
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.confirmButton}>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;