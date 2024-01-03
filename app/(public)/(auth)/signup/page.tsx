"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AuthWrapper from "../AuthWrapper";
import SubmitButton from "@/components/SubmitButton";

const Signup = () => {
  const submitForm = async (e: FormData) => {};

  return (
    <AuthWrapper title="Get started">
      <form
        className="flex  justify-center flex-col gap-y-5 items-center"
        action={submitForm}
      >
        <input
          name="username"
          type="text"
          placeholder="username"
          className="py-2 px-3 rounded-[10px] w-[300px] shadow-sm border-2"
        />
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
        <SubmitButton />
      </form>
    </AuthWrapper>
  );
};

export default Signup;
