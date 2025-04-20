import React, { useState } from 'react';
import styles from './CreateAccount.module.css';

const CreateAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user, setUser] = useState(
        {
            fname: '',
            lname: '',
            email: '',
            address: '',
            mobileNumber: '',
            username: '',
            password: '',
            passwordConfirm: '',
            isAdmin: false
        });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onChangedFname=(e)=>{
        setUser((prevUser) => ({ ...prevUser, fname: e.target.value }));
    }
    console.log(user)
    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.heading}>Create an account</h1>
                <p className={styles.subheading}>Connect with your friends today!</p>

                <form className={styles.form}>
                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="firstName"
                                onChange={onChangedFname}
                                placeholder="Enter Your First Name"
                                className={styles.input}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="lastName"


                                placeholder="Enter Your Last Name"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"


                            placeholder="Enter Your Email"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="address"


                            placeholder="Enter Your Address"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="tel"
                            name="mobileNo"


                            placeholder="Enter Your Mobile Number"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="username"


                            placeholder="Enter Your Username"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"


                                placeholder="Enter Your Password"
                                className={styles.input}
                                required
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ?
                                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg> :
                                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"


                                placeholder="Enter Your Password again"
                                className={styles.input}
                                required
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ?
                                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg> :
                                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            id="isAdmin"
                            name="isAdmin"


                            className={styles.checkbox}
                        />
                        <label htmlFor="isAdmin" className={styles.checkboxLabel}>
                            Admin Account
                        </label>
                    </div>

                    <button type="submit" className={styles.button}>
                        Sign Up
                    </button>
                </form>

                <p className={styles.loginLink}>
                    Already have an account? <a href="#">Login</a>
                </p>
            </div>
        </div>
    );
};

export default CreateAccount;