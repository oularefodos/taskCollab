"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn("rouded-lg w-full rounded-[10px] uppercase h-[60px] text-white  hover:bg-gray-400",  pending ? "bg-gray-400" : "bg-black")}
    >
      { pending ? <div className="flex items-center justify-center gap-x-4"> <Loader2 className="animate-spin"  /> Pending... </div> : "submit"}
    </button>
  );
};

export default SubmitButton;
