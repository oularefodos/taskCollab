import SubmitButton from "@/components/SubmitButton";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-auto h-auto bg-white py-8 px-8 shadow-lg shadow-black/30 border rounded-[10px]">
        <form className="flex  justify-center flex-col gap-y-5 items-center">
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
