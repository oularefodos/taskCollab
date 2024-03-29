"use client";
import CreateOrganization from "@/app/(protected)/dashboard/CreateOrganization";
import Modal from "@/components/Modal";
import Organizations from "@/app/(protected)/dashboard/Organizations";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

import React from "react";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [isClose, setIsclose] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleOnChange = (name: string) => {
    const nameToLowerCase = name.toLowerCase();
    setSearchValue(nameToLowerCase);
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex lg:p-11 p-4">
        <div className="h-full w-full">
          <div className="p-4  flex flex-col md:flex-row md:items-center gap-y-4 md:justify-around border-b-2">
            <form action="">
              <div className="h-[45px] flex rounded-[5px] items-center bg-white py-3 px-0 border">
                <button className="px-2  bg-white">
                  <Search />
                </button>
                <input
                  onChange={(e) => handleOnChange(e.target.value)}
                  type="text"
                  className="px-2 py-1 h-[40px] w-[80%] outline-none"
                  placeholder="search..."
                />
              </div>
            </form>
            <Button
              onClick={() => setIsclose(false)}
              className="flex gap-x-1 items-start"
            >
              Create
              <Plus />
            </Button>
          </div>
          <Organizations setClose={setIsclose} value={searchValue} />
        </div>
      </div>
      <Modal isClose={isClose} setClose={setIsclose}>
        <CreateOrganization />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
