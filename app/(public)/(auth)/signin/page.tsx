"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthWrapper from "../AuthWrapper";
import { toast } from "react-toastify";
import { toastOption } from "@/app/(protected)/dashboard/CreateOrganization";
import { loginValidator } from "@/interfaces/user";
import * as z from "zod";
import SubmitButton from "@/components/SubmitButton";
import { ZodErrorExtractor } from "@/helpers/asyncWrapper";

const Signin = () => {
  const router = useRouter();

  const loginAction = async (formData: FormData) => {
    try {
      const data = await loginValidator.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      const { email, password } = data;
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Welcome", toastOption);
        router.push("/dashboard");
      } else {
        if (response?.error) {
          const message: string = "your password or email is not correct";
          toast.error(message, toastOption);
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages  = ZodErrorExtractor(error)
        messages.forEach((element) => {
          toast.error(element, toastOption);
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <AuthWrapper title="Welcome Back">
      <form
        className="flex  justify-center flex-col gap-y-5 items-center"
        action={loginAction}
      >
        <input
          name="email"
          type="email"
          placeholder="email@gmail.com"
          className="py-2  px-3 rounded-[10px] w-[300px] border-2 rouded-sm"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="py-2  px-3 rounded-[10px] w-[300px] border-2"
        />
        <SubmitButton />
      </form>
    </AuthWrapper>
  );
};

export default Signin;
