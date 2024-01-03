"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const router = useRouter();
  if (!params) {
    router.push("/dashboard");
    return <></>;
  }
  return <div>main</div>;
};

export default page;
