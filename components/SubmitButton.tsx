"use client";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const SubmitButton = ({text} : {text : string}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("rouded-lg w-full rounded-[10px] uppercase h-[60px] text-white  hover:bg-gray-400",  pending ? "bg-gray-400" : "bg-black")}
    >
      { pending ? <div className="flex items-center justify-center gap-x-4"> <Loader2 className="animate-spin"  /> Pending... </div> : <div>{text}</div>}
    </Button>
  );
};

export default SubmitButton;
