import { Skeleton } from '@/components/ui/skeleton'
import SliderItem from './SliderItem'
import React from 'react'

const SliderSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-11 items-start">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="w-[50%] h-10"/>
          <Skeleton className="w-10 h-10"/>
        </div>
        <div className="w-full space-y-2">
          <SliderItem.Skeleton />
          <SliderItem.Skeleton />
          <SliderItem.Skeleton />
        </div>
      </div>
  )
}

export default SliderSkeleton