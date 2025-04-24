import React, { useState, useContext } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './CreateAccount.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ModalContext, UserDataContext, CreateAccountContext } from '../context';


const CreateAccount = () => {
    const { setModalSignupOpen } = useContext(ModalContext);
    const { setCreateAccountOpen } = useContext(CreateAccountContext);
    const { setUserData } = useContext(UserDataContext);
    
    const [errorColorNumber, setErrorColorNumber] = useState(null);
    const [errorColorPasswordConfirm, setErrorColorPasswordConfirm] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navHome = useNavigate();
    const [user, setUser] = useState(
        {
            fname: null,
            lname: null,
            email: null,
            address: null,
            mobileNumber: 0,
            username: null,
            password: null,
            passwordConfirm: null,
            isAdmin: false
        });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onChangedFname = (e) => {
        setUser((prevUser) => ({ ...prevUser, fname: e.target.value }));
    }

    const onChangeLname = (e) => {
        setUser((prevUser) => ({ ...prevUser, lname: e.target.value }));
    }

    const onChangeEmail = (e) => {
        setUser((prevUser) => ({ ...prevUser, email: e.target.value }));
        if(e.target.value.includes("@admin.139907.print.com")){
                setUser((prevUser) => ({ ...prevUser, isAdmin: true}))
        }   
    }

    const onChangeAddress = (e) => {
        setUser((prevUser) => ({ ...prevUser, address: e.target.value }));
    }

    const onChangeMobileNumber = (e) => {
        if (Number(e.target.value) !== isNaN) {
            setUser((prevUser) => ({ ...prevUser, mobileNumber: Number(e.target.value) }));
        } !user.mobileNumber ? setErrorColorNumber('red') : setErrorColorNumber(null);
    }

    const onChangeUsername = (e) => {
        setUser((prevUser) => ({ ...prevUser, username: e.target.value }));
    }

    const onChangePassword = (e) => {
        setUser((prevUser) => ({ ...prevUser, password: e.target.value }));
        e.target.value != user.passwordConfirm ? setErrorColorPasswordConfirm('red') : setErrorColorPasswordConfirm(null);
    }

    const onChangePasswordConfirm = (e) => {
        setUser((prevUser) => ({ ...prevUser, passwordConfirm: e.target.value }));
        e.target.value != user.password ? setErrorColorPasswordConfirm('red') : setErrorColorPasswordConfirm(null);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((errorColorNumber, errorColorPasswordConfirm) !== 'red') {
            try {
                await createUserWithEmailAndPassword(auth, user.email, user.password);
                setUserData(user);
                setCreateAccountOpen(true);
                e.target.reset();
                navHome('/');
                setModalSignupOpen(false);
            } catch (error) {
                setUserData(user);
                console.error(error);
            }

        } else {
            console.log('Error');
        }
    }

    return (
        <div onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.heading}>Create an account</h1>

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
                                onChange={onChangeLname}
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
                            onChange={onChangeEmail}
                            placeholder="Enter Your Email"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="address"
                            onChange={onChangeAddress}
                            placeholder="Enter Your Address"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="tel"
                            name="mobileNo"
                            onChange={onChangeMobileNumber}
                            pattern="[0-9]{11}"
                            style={{ borderColor: errorColorNumber }}
                            placeholder="Enter Your Mobile Number #09-123-123-123"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="username"
                            onChange={onChangeUsername}
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
                                onChange={onChangePassword}
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
                                onChange={onChangePasswordConfirm}
                                style={{ borderColor: errorColorPasswordConfirm }}
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
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 20, padding: 5}}>
                            <input type="checkbox" name="myCheckbox" value="checkboxValue" style={{ marginRight: '2%' }} />
                            <p style={{ fontSize: 12 }}>By checking this box, you agree to the <a href="/legal"><u>Terms & Conditions</u></a> of our website.</p>
                        </div>
                    </div>

                    <button type="submit" className={styles.button}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;