"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthWrapper from "../AuthWrapper";

interface DataType {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<DataType>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const isDataValid = (): boolean => {
    const { username, password } = formData;
    if (username.length < 4) {
      setErrorMessage("require more than 3 letters");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("password more than 7 letters");
      return false;
    }
    return true;
  };

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    if (isDataValid()) {
      setIsSubmitting(true);
      try {
        const { username, password, email } = formData;
        const response = await fetch("api/user/create", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
            email,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          router.push("/signin");
        } else {
          const data = await response.json();
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage("something goes wrong");
        console.log(error);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper title="Get started">
        <form
          className="flex  justify-center flex-col gap-y-5 items-center"
          onSubmit={submitForm}
        >
          <input
            value={formData.username}
            name="username"
            onChange={(e) => handleOnChange(e)}
            type="text"
            placeholder="username"
            className="py-2 px-3 rounded-[10px] w-[300px] shadow-sm border-2"
          />
          <input
            value={formData.email}
            name="email"
            onChange={(e) => handleOnChange(e)}
            type="email"
            placeholder="email@gmail.com"
            className="py-2  px-3 rounded-[10px] w-[300px] border-2 rouded-sm"
          />
          <input
            value={formData.password}
            name="password"
            onChange={(e) => handleOnChange(e)}
            type="password"
            placeholder="password"
            className="py-2  px-3 rounded-[10px] w-[300px] border-2"
          />
          <input
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleOnChange(e)}
            type="password"
            placeholder="confirmPassword"
            className="py-2  px-3 rounded-[10px] w-[300px] border-2"
          />
          <button className="rouded-lg w-[300px] rounded-[10px] uppercase h-[60px] text-gray-400 border-2 hover:bg-gray-100">
            {isSubmitting ? "is submitting..." : "submit"}
          </button>
        </form>
    </AuthWrapper>
  );
};

export default Signup;
