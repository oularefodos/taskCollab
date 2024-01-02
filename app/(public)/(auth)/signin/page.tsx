'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter} from 'next/navigation'
import AuthWrapper from '../AuthWrapper'

const Signin = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const router = useRouter()

  const isDataValid = (email : string | undefined, password : string | undefined) : boolean => {
    if (password === "") {
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
          }
        }
      } catch (error) {
        console.log('something went wrong')
      }
      setIsSubmitting(false);
    }
  }

  return (
    <AuthWrapper title='Welcome Back'>
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
    </AuthWrapper>
  )
}

export default Signin