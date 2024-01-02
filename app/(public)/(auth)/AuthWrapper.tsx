"use client";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  title: string;
}

const AuthWrapper = ({ children, title }: Props) => {
  const pathname = usePathname();
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-auto h-auto bg-white py-8 px-8 shadow-lg shadow-black/30 border rounded-[10px]">
        <h1 className="text-center text-[2rem] text-gray-600 mb-6">{title}</h1>
        <div>{children}</div>
        <div className="w-full mt-5 h-[40px] flex justify-around items-center">
          <div className="w-[40%] h-[1px] border border-gray-200"></div>
          <p className="text-gray-400">OR</p>
          <div className="w-[40%] h-[1px] border border-gray-200"></div>
        </div>
        <button
          onClick={() => signIn("google")}
          className="rouded-lg mt-5 w-[300px] rounded-[10px] uppercase h-[60px] text-gray-400 border-2 hover:bg-gray-100"
        >
          login with google
        </button>
        {pathname === "/signup" ? (
          <p className="text-center mt-5">
            if you already have an account{" "}
            <Link className="text-blue-700 underline" href="/signin">
              login
            </Link>
          </p>
        ) : (
          <p className="text-center mt-5">
            if you don't have an account{" "}
            <Link className="text-blue-700 underline" href="/signup">
              Signup
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthWrapper;
