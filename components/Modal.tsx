import { Cross, CrossIcon, PanelLeftClose } from "lucide-react";
import React from "react";

interface Props {
  setClose: (params: boolean) => void;
  children: React.ReactNode;
  isClose: boolean;
}

const Modal = ({ setClose, children, isClose }: Props) => {
  return (
    <div
      onClick={() => setClose(true)}
      className={`${
        isClose ? "hidden" : "fixed inset-0 flex items-center justify-center"
      }`}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md bg-white/50"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="px-2 py-3 rounded-[1rem] relative min-h-[300px] w-[95%] sm:w-[450px]  bg-white z-10 shadow-lg shadow-black"
      >
        <div
          className="absolute cursor-pointer text-[1.5rem] rounded-full -right-3 -top-7"
          onClick={() => setClose(true)}
        >
          x
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
