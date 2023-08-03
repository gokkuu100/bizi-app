import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import AuthDetails from './AuthDetails';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountCreated, setAccountCreated] = useState(false); // New state variable

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            setAccountCreated(true); // Set the state variable to true after successful signup
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <h1 className='text-2xl font-bold py-4'>Create a new account</h1>
                <p className='m-4'>Email</p>
                <input
                className='w-[60%] border-2 border-black p-[0.5rem]' 
                 type='text'
                 placeholder='email'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 ></input>
                 <p className='m-4'>Password</p>
                <input
                className='w-[60%] border-2 border-black p-[0.5rem]'
                 type='password'
                 placeholder='enter password'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 ></input><br />
                 <button className='rounded border-blue-500 bg-blue-600 hover:blue w-[20%] mt-[2rem] p-[4px]' type='submit'>Sign Up</button>
            </form>
            {accountCreated && <p>Account created, sign in to continue</p>}
        </div>
    )
}

export default SignUp;