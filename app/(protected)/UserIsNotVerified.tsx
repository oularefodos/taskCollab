'use client'
import React from "react";
import { ArrowDown } from "lucide-react";
import SubmitButton from "@/components/SubmitButton";
import { resendEmail } from "@/actions/user/resendEmail";
import { toast } from "react-toastify";
import { toastOption } from "./dashboard/CreateOrganization";

const UserIsNotVerified =  () => {
  const sendEmail = async() => {
    const response = await resendEmail();
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
  };
  return (
    <div className="w-hull h-full flex flex-col items-center gap-y-5 justify-center py-[5rem]">
      <h1 className="text-red-500 bg-red-200 p-2 px-2 rounded-sm text-2xl">
        Your email is not Verified
      </h1>
      <p>Go check your email account</p>
      <p className="text-gray-500">
        Or you can send another link if you did'nt receiv
      </p>
      <p className="animate-bounce w-10 h-10 bg-green-400 flex items-center justify-center rounded-full">
        <ArrowDown />
      </p>
      <form action={sendEmail}>
        <SubmitButton text="send another" />
      </form>
    </div>
  );
};

export default UserIsNotVerified;
