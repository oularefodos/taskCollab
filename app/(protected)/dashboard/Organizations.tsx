"use client";
import { getOrganizations } from "@/actions/organisations/getAll";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  setClose: (params: boolean) => void;
}

const Organizations = ({ setClose }: Props) => {
  const [organizations, setOrganizations] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDatas = async () => {
    setIsLoading(true);
    const response = await getOrganizations();
    if (response.error) {
    } else {
      setOrganizations(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDatas();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full mt-11 text-center text-3xl text-gray-400">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="h-full w-full py-5">
      {organizations.length ? (
        <h1 className="text-lg md:text-3xl text-gray-400 mb-11 mt-11">
          Your WorkSpaces
        </h1>
      ) : null}
      {organizations.length ? (
        <div className="flex flex-wrap justify-center md:justify-start  items-start gap-4">
          <div
            onClick={() => setClose(false)}
            className="flex hover:bg-gray-50 items-center justify-center h-[250px] px-7 py-5 w-[200px] bg-gray-100 rounded-[1rem] shadow-lg shadow-gray-400"
          >
            <Plus className="text-2xl" />
          </div>
          {organizations.map((data: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-center flex-col gap-y-3 h-[250px] px-7 py-5 w-[200px] bg-white rounded-[1rem] shadow-lg shadow-gray-400"
            >
              <div className="w-[80px] h-[80px] rounded-full ">
                {
                  data.imgUrl ? (
                    <Image
                    src={data.imgUrl}
                    className="h-full w-full rounded-full"
                    alt={data.name}
                    />
                  )
                  :
                  (
                    <div className="w-[80px] h-[80px] rounded-full bg-blue-800 flex items-center justify-center">
                      <p className="text-white">{data.name[0]}</p>
                    </div>
                  )
                }
              </div>
              <h1 className="text-xl text-gray-700 capitalize">{data.name}</h1>
              <Link href={`organizations/${data.id}`} className="w-full">
                <Button className="border bg-white capitalize hover:bg-gray-100 rounded-[0.5rem] w-full text-gary-400">
                  Get in
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full mt-11 flex justify-center items-center">
          <p className=" text-lg md:text-4xl text-gray-400">
            There no Organazitions
          </p>
        </div>
      )}
    </div>
  );
};

export default Organizations;
