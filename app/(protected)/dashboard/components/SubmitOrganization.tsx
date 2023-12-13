"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitOrganization = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rouded-lg w-full rounded-[10px] uppercase h-[60px] text-white bg-black hover:bg-gray-400"
    >
      { pending ? "submit..." : "submit"}
    </button>
  );
};

export default SubmitOrganization;
