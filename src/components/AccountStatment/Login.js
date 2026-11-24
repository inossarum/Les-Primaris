import {
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, {useRef, useState} from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUser} from "../../feature/user.slice";
import {windowToggleActive} from "../../feature/window.slice";
import {auth, db} from "../../utils/firebase.config";
import {doc, getDoc} from "firebase/firestore";

const Login = () => {
    const loginEmail = useRef();
    const loginPassword = useRef();
    const [error, setError] = useState(false);
    const [passwordReveal, setPasswordReveal] = useState(true);
    const dispatch = useDispatch();

    const windowSetNotActiveState = () => {
        return dispatch(windowToggleActive(false));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(
            auth,
            loginEmail.current.value,
            loginPassword.current.value
        )
            .then(async (userCredential) => {
                dispatch(getUser(userCredential.displayName));
                windowSetNotActiveState();
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });

        getDoc(doc(db, "users", auth?.currentUser?.uid));
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch(getUser(user ? user.displayName : null));
        });
    }, [dispatch]);

    return (
        <div className="login-container">
            <form onSubmit={(e) => handleLogin(e)}>
                <div className="mail">
                    <label>Email</label>
                    <div className="input-wrapper">
                        <input type="text" ref={loginEmail} required />
                    </div>
                </div>
                <div className="password">
                    <label>Password</label>
                    <div className="password-input">
                        {passwordReveal ? (
                            <>
                                <input
                                    type="password"
                                    ref={loginPassword}
                                    required
                                />
                                <span
                                    className="button-password-reveal"
                                    onClick={() =>
                                        setPasswordReveal(!passwordReveal)
                                    }
                                >
                                    <i className="fa-solid fa-eye-slash"></i>
                                </span>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    ref={loginPassword}
                                    required
                                />
                                <span
                                    className="button-password-reveal"
                                    onClick={() =>
                                        setPasswordReveal(!passwordReveal)
                                    }
                                >
                                    <i className="fa-solid fa-eye"></i>
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className="submit-btn-green">
                    <button type="submit" className="submit-form">
                        Entrer
                    </button>

                    <span>
                        {error && "Le mail ou le mot de passe sont invalides"}
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
