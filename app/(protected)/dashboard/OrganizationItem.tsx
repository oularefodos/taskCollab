"use client";
import { OrganizationType } from "@/interfaces/Organisation";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  key: number;
  organization: OrganizationType;
}

const OrganizationItem = ({ key, organization }: Props) => {
  const { name, id } = organization;
  const imgUrl = undefined;
  return (
    <div
      key={key}
      className="flex items-center justify-center flex-col gap-y-3 h-[250px] px-7 py-5 w-[200px] bg-white rounded-[1rem] shadow-lg shadow-gray-400"
    >
      <div className="w-[80px] h-[80px] rounded-full ">
        {imgUrl ? (
          <Image src={""} className="h-full w-full rounded-full" alt={name} />
        ) : (
          <div className="w-[80px] h-[80px] rounded-full bg-blue-800 flex items-center justify-center">
            <p className="text-white">{name[0]}</p>
          </div>
        )}
      </div>
      <h1 className="text-xl text-gray-700 capitalize">{name}</h1>
      <Link href={`organizations/${id}`} className="w-full">
        <Button className="border bg-white capitalize hover:bg-gray-100 rounded-[0.5rem] w-full text-gary-400">
          Get in
        </Button>
      </Link>
    </div>
  );
};

OrganizationItem.Skeleton = () => {
  const array = Array.from({ length: 40 }, (_, index) => index);
  return (
    <div className="flex flex-wrap justify-center  items-start gap-4 w-full h-full m-4">
      {array.map((_, key) => (
        <Skeleton key={key} className="h-[250px] w-[200px]"></Skeleton>
      ))}
    </div>
  );
};

export default OrganizationItem;
