import React, { useRef } from 'react';
import styles from "../../styles/register.module.css";
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/client.js';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        console.log('Register button clicked');  // Log to ensure the function is called
    
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            passwordAgain.current.setCustomValidity("");
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
    
            try {
                const res = await axios.post("/auth/register", user);
                console.log('Registration response:', res.data);  // Log the response
                navigate('/login');
            } catch (err) {
                console.log('Registration error:', err);  // Log any errors
            }
        }
    };
    

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <div className={styles.login}>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginLeft}>
                        <h3 className={styles.loginLogo}>Weeb</h3>
                        <span className={styles.loginDesc}>
                            Share your Thoughts !!
                        </span>
                    </div>
                    <div className={styles.loginRight}>
                        <form className={styles.loginBox} onSubmit={handleClick}>
                            <input placeholder="Username" required ref={username} className={styles.loginInput} />
                            <input placeholder="Email" type="email" required ref={email} className={styles.loginInput} />
                            <input placeholder="Password" type="password" minLength="6" required ref={password} className={styles.loginInput} />
                            <input placeholder="Confirm Password" type="password" required ref={passwordAgain} className={styles.loginInput} />
                            <button className={styles.loginButton} type="submit">
                                Sign Up
                            </button>
                            <button type="button" className={styles.loginRegisterButton} onClick={handleLoginRedirect}>
                                Login to Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
