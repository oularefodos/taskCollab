import { Skeleton } from '@/components/ui/skeleton'
import SliderItem from './SliderItem'
import React from 'react'

const SliderSkeleton = () => {
  const array = Array.from({length : 20}, (_, index) => index)
  return (
    <div className="flex flex-col gap-y-11 items-start">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="w-[50%] h-10"/>
          <Skeleton className="w-10 h-10"/>
        </div>
        <div className="w-full space-y-2">
          { array.map((_, index) => <SliderItem.Skeleton key={index} />) }
        </div>
      </div>
  )
}

export default SliderSkeleton