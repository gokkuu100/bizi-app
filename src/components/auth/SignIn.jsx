import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import SignUp from './SignUp';

function SignIn({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setIsAuthenticated(true); // Set authentication status
        navigate('/home'); // Navigate to the home page
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4 font-bold'>

      <h1 className='mt-[1.5rem] ml-[8.5rem] text-[1.5rem]'>WELCOME TO BIZI APP</h1>
      
      <form className='' onSubmit={signIn}>
            <h1 className='text-2xl font-bold py-4'>Log in to your account</h1>
            <p className='m-4'>Email:</p>
            <input
            className='w-[60%] border-2 border-black p-[0.5rem] '
             type='text'
             placeholder='email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             ></input><br />
             <p className='m-4'>Password:</p>
            <input
            className='w-[60%] border-2 border-black p-[0.5rem]'
             type='password'
             placeholder='enter password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             ></input><br />
             <button className='rounded border-blue-500 bg-blue-600 hover:blue w-[20%] mt-[2rem] p-[4px]' type='submit'>Log in</button>
        </form>
        
        <p className='mt-[1.5rem]'>Don't have an account?</p>

        <SignUp />
    </div>
  );
}

export default SignIn;