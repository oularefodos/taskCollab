import React from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  Settings,
  Building,
  Activity,
  Layout,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../../../../components/ui/button";
import { BorderDashedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../../../../components/ui/skeleton';

export interface OrganizationType {
  id : string,
  name : string,
}

interface Props {
  index : number,
  organization : OrganizationType
  isActive : boolean,
  isExpended : boolean,
  onExpend : (params : string) => void
}


const SliderItem = ({index, organization, onExpend, isActive, isExpended} : Props) => {
  const router = useRouter()
  const items = [
    {
      icon : <Layout />,
      name : 'Bords',
      href : `/organizations/${organization.id}`
    },
    {
      icon : <Activity />,
      name : 'Activity',
      href : `/organizations/${organization.id}/activity`
    },
    {
      icon : <Settings />,
      name : 'Settings',
      href : `/organizations/${organization.id}/settings`
    },
    {
      icon : <CreditCard />,
      name : 'Payement',
      href : `/organizations/${organization.id}/payement`
    },
  ]

  const redirectFnct = (link : string) => {
    console.log(link);
    router.push(link)
  }

  return (
    <AccordionItem key={index} value={organization.id} className='w-full'>
    <AccordionTrigger 
      onClick={() => onExpend(organization.id)}
      className={cn('transition p-2 rounded-md w-full text-neutral-700', isActive && !isExpended && 'bg-neutral-200' )}
    >
      <div className="flex gap-x-2 items-center">
        <div className="p-1 bg-blue-400  rounded-sm">
          <Building color="white" />
        </div>
        <p className="uppercase text-gray-500">{organization.name}</p>
      </div>
    </AccordionTrigger>
    <AccordionContent className="flex w-full items-start flex-col gap-y-3">
      {
        items.map(({icon, name, href}, index) => (
            <Button
              key={index}
              onClick={() => redirectFnct(href)}
              className={cn(`bg-white w-full text-gray-700 hover:bg-gray-100 flex items-center justify-start gap-x-2`, isActive && !index && isExpended && 'bg-neutral-200')}
            >
              {icon}
              <p>{name}</p>
            </Button>
        ))
      }
    </AccordionContent>
  </AccordionItem>
  )
}

SliderItem.Skeleton = () => {
  return (
    <div className='flex gap-x-2 w-full items-center'>
      <Skeleton className="w-[20%] h-10"/>
      <Skeleton className="w-[80%] h-10"/>
    </div>
  )
}

export default SliderItem