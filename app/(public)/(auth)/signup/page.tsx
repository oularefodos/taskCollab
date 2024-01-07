"use client";

import React from "react";
import AuthWrapper from "../AuthWrapper";
import SubmitButton from "@/components/SubmitButton";
import { createUser } from "@/actions/user/create";
import { toast } from "react-toastify";
import { toastOption } from "@/app/(protected)/dashboard/CreateOrganization";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter()

  const submitUser = async (formData: FormData) => {
    const response = await createUser(formData);
    if (response?.success) {
      const { message } = response;
      toast.success(message, toastOption);
      router.push('/signin');
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
  };

  return (
    <AuthWrapper title="Get started">
      <form
        className="flex  justify-center flex-col gap-y-5 items-center"
        action={submitUser}
      >
        <input
          name="email"
          type="email"
          placeholder="email@gmail.com"
          className="py-2 px-3 rounded-[10px] w-[300px] border-2 rouded-sm"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="py-2  px-3 rounded-[10px] w-[300px] border-2"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="confirmPassword"
          className="py-2  px-3 rounded-[10px] w-[300px] border-2"
        />
        <SubmitButton text='Submit'/>
      </form>
    </AuthWrapper>
  );
};

export default Signup;
