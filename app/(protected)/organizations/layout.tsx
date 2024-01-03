import React from "react";
import Slider from "./Slider";
const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full min-h-screen flex">
      <main className="w-full h-full min-h-screen flex">
        <div className="hidden md:block  left-0 top-0 bottom-0 py-6 px-2 border-r-2 w-[300px]">
          <Slider screenType="large" />
        </div>
        <div className="h-full px-4 z-10 w-full">
            {children}
        </div>
      </main>
    </div>
  );
};

export default layout;
