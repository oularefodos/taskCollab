'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { verifyToken } from '@/actions/user/verifyEmailToken'
import { toast } from 'react-toastify'
import { toastOption } from '@/app/(protected)/dashboard/CreateOrganization'
import { Loader2 } from 'lucide-react'

const page = () => {
  const param = useParams()
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false);

  const verify = async () => {
    const formData = new FormData()
    if (param) {
      const token = param.token as string;
      formData.set('token', token);
      const response = await verifyToken(formData)
      if (response.success) {
        const { message } = response;
        toast.success(message, toastOption);
      } else {
        if (typeof response.message === "string") {
          toast.error(response.message, toastOption);
        } else {
          const messages: string[] = response.message;
          messages.forEach((element) => {
            toast.error(element, toastOption);
          });
        }
      }
      setIsChecked(false);
    }
    router.push('/signin')
  }

  useEffect(() => {
    if (!isChecked) {
      verify();
    }
  }, [])

  return (
    <div className='p-11 h-[80vh] flex flex-col items-center gap-y-2 justify-center'>
      {
        !isChecked && <Loader2 size={150} className='text-4xl animate-spin'/>
      }
    </div>
  )
}

export default page