"use client";
import { getOrganizations } from "@/actions/organisations/getAll";
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { OrganizationType } from "@/interfaces/Organisation";
import OrganizationItem from "./OrganizationItem";

interface Props {
  setClose: (params: boolean) => void,
  value: string
}

const Organizations = ({ setClose, value }: Props) => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const organisationsSearch = value === "" ? organizations : organizations.filter(({name}) => name.includes(value));

  const getDatas = async () => {
    setIsLoading(true);
    const response = await getOrganizations();
    if (response.success) {
      setOrganizations(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDatas();
  }, []);

  if (isLoading) {
    return <OrganizationItem.Skeleton />;
  }
  return (
    <div className="h-full w-full py-5">
      {organizations.length ? (
        <h1 className="text-lg md:text-3xl text-gray-400 mb-11 mt-11">
          Your WorkSpaces
        </h1>
      ) : (
        <h1 className="text-lg md:text-3xl text-gray-400 mb-11 mt-11">
          There is no Workspace
        </h1>
      )}
      <div className="flex flex-wrap justify-center md:justify-start  items-start gap-4">
        <div
          onClick={() => setClose(false)}
          className="flex hover:bg-gray-50 items-center justify-center h-[250px] px-7 py-5 w-[200px] bg-gray-100 rounded-[1rem] shadow-lg shadow-gray-400"
        >
          <Plus className="text-2xl" />
        </div>
        {organisationsSearch.map((organization: OrganizationType, index: number) => (
          <OrganizationItem organization={organization} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Organizations;
