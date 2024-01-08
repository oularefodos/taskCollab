'use client'
import { sendPasswordToken } from "@/actions/user/sendPasswordToken";
import { toastOption } from "@/app/(protected)/dashboard/CreateOrganization";
import SubmitButton from "@/components/SubmitButton";
import React from "react";
import { toast } from "react-toastify";

const page = () => {

  const action = async (e : FormData) => {
    const response = await sendPasswordToken(e);
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
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-auto h-auto bg-white py-8 px-8 shadow-lg shadow-black/30 border rounded-[10px]">
        <form className="flex  justify-center flex-col gap-y-5 items-center" action={action}>
          <input
            name="email"
            type="email"
            placeholder="email@gmail.com"
            className="py-2  px-3 rounded-[10px] w-[300px] border-2 rouded-sm"
          />
          <SubmitButton text={"Submit"} />
        </form>
      </div>
    </div>
  );
};

export default page;
