"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import {
  Accordion
} from "@radix-ui/react-accordion";
import { getOrganizations } from "@/actions/organisations/getAll";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import SliderItem, { OrganizationType } from "./SliderItem";
import { useLocalStorage } from "usehooks-ts";
import SliderSkeleton from "./SliderSkeleton";

interface Props {
  screenType : string
}

const Slider = ({
  screenType
} : Props) => {
  const [organazitions, setOrganizations] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { id: currentOrgId } = useParams() as { id: string };
  const [expended, setExpended] = useLocalStorage<Record<string, boolean>>(screenType, {})

  const onExpend = (id : string) => {
    setExpended(current => (
      {
        ...current,
        [id] : !expended[id]
      }
    ))
  }

  const defaultValue : string[] = Object.keys(expended).reduce((acc : string[], current : string) => {
      if (expended[current]) {
        acc.push(current);
      }
      return acc;
    }, [])

  const getData = async () => {
    setIsLoading(true);
    const response = await getOrganizations();
    if (response.error) {
      console.log(response.error);
    } else {
      setOrganizations(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <SliderSkeleton />

  return (
    <div className="flex flex-col gap-y-11 items-start space-y-2">
      <div className="flex items-center justify-between w-full">
        <p className="text-gray-400">WorkSpaces</p>
        <Link href="/dashboard">
          <Button
            size="icon"
            className="bg-white text-black hover:text-gray-400"
            variant="ghost"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div className="w-full">
        <Accordion
          type="multiple"
          className="flex flex-col gap-y-3 py-2 w-full"
          defaultValue={defaultValue}
        >
          {organazitions.map((data: OrganizationType, index: number) => (
            <SliderItem
              index={index}
              organization={data}
              isActive={data.id === currentOrgId}
              isExpended={expended[data.id]}
              onExpend={onExpend}
              key={index}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Slider;
