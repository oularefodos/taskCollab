'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface DataType {
  password : string,
  email : string
}


const Signin = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const isDataValid = (email : string | undefined, password : string | undefined) : boolean => {
    if (password === "") {
      setErrorMessage("password is required")
      return false;
    }
    return true;
  }

  const loginAction = async (formData : FormData) => {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    if (isDataValid(email, password)) {
      setIsSubmitting(true);
      try {
        const response = await signIn('credentials', {
          email,
          password,
          redirect : false
        });
        if (response?.ok) {
          router.push('/dashboard')
        }
        else {
          if (response?.error) {
            setErrorMessage(response.error);
          }
        }
      } catch (error) {
        console.log('something went wrong')
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <div className='w-auto h-auto bg-white py-8 px-8 shadow-lg shadow-black/30 border rounded-[10px]'>
        <h1 className='text-center text-[2rem] text-gray-600 mb-6'>Welcome back!</h1>
        <form className='flex  justify-center flex-col gap-y-5 items-center' action={loginAction}>
          <input 
            name="email"
            type='email' 
            placeholder='email@gmail.com' 
            className='py-2  px-3 rounded-[10px] w-[300px] border-2 rouded-sm'
          />
          <input 
            name="password"
            type='password' 
            placeholder='password' 
            className='py-2  px-3 rounded-[10px] w-[300px] border-2  '
          />
          <button 
            className='rouded-lg w-[300px] rounded-[10px] uppercase h-[60px] text-gray-400 border-2 hover:bg-gray-100'>
              {
                isSubmitting ? "is submitting..." : "Login"
              }
          </button>
        </form>
        {/* <div className='w-full mt-5 h-[40px] flex justify-around items-center'>
          <div className='w-[40%] h-[1px] border border-gray-200'></div>
          <p className='text-gray-400'>OR</p>
          <div className='w-[40%] h-[1px] border border-gray-200'></div>
        </div>
        <button
          onClick={() => signIn('google')}
          className='rouded-lg mt-5 w-[300px] rounded-[10px] uppercase h-[60px] text-gray-400 border-2 hover:bg-gray-100'>
            login with google
        </button> */}
        <p className='text-center mt-5'>if you don't have an account <Link  className='text-blue-700 underline' href='/signup'>Signup</Link></p>
        <p className='text-red-400 text-center'>
          {errorMessage !== '' && errorMessage}
        </p>
      </div>
    </div>
  )
}

export default Signin