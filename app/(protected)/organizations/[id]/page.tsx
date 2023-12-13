"use client";
import Slider from "@/app/(protected)/organizations/components/Slider";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const router = useRouter();
  if (!params) {
    router.push('/dashboard');
    return <></>
  }
  return (
    <div className="w-full h-full min-h-screen relative">
      <div className="hidden md:block absolute left-0 top-0 bottom-0 py-6 px-2 border-r-2 w-[300px]">
        <Slider screenType='large'/>
      </div>
      <div className="md:ml-[300px] h-full px-4">
        main
      </div>
    </div>
  )
};

export default page;
