import { Button } from '@mui/material';
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './login.css'
import {auth, provider} from './firebase'
import {actionTypes} from "./reducer"
import { useStateValue } from "./StateProvider"

function Login () {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
    .then((result) => {
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user
        });
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    }

    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
};

export default Login;