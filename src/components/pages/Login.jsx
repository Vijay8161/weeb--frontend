import React, { useRef, useContext } from 'react';
import styles from "../../styles/login.module.css";
import { useNavigate } from 'react-router-dom';
import { loginCall } from "../../apiCalls";
import { AuthContext } from '../../context/AuthContext';


export default function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        email.current.setCustomValidity(""); // Reset custom validity
        
        try {
            await loginCall(
                { email: email.current.value, password: password.current.value },
                dispatch
            );
        } catch (error) {
            email.current.setCustomValidity("User Login Failed");
        }
    }

    const handleRegisterRedirect = () => {
        navigate('/register');
    }

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
                            <input 
                                placeholder="Email" 
                                type="email" 
                                required 
                                className={styles.loginInput} 
                                ref={email}
                            />
                            <input 
                                placeholder="Password" 
                                type="password" 
                                required 
                                minLength="6"
                                className={styles.loginInput} 
                                ref={password} 
                            />
                            <button className={styles.loginButton} type="submit" disabled={isFetching}>
                                {isFetching ? "Loading..." : "Log in"}
                            </button>
                            <span className={styles.loginForgot}>
                                Forgot Password?
                            </span>
                            <button 
                                type="button" 
                                className={styles.loginRegisterButton} 
                                onClick={handleRegisterRedirect}
                            >
                                Create a New Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
