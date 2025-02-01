"use client"
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { HomePageImage } from '@/types/extended'
import React, { useRef } from 'react'
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';


type Props = {
    images:HomePageImage[];
    className?:string
}

 export const ImagesCarousel = ({images,className}: Props) => {
    {/**
        إعدادات Autoplay:
Autoplay({ delay: 2000, stopOnInteraction: true }):
يتم استدعاء دالة Autoplay مع خيارات معينة.
delay: 2000:
يعني أن السلايدر سيتغير تلقائيًا كل 2000 مللي ثانية (أو 2 ثانية). هذا هو الوقت الذي ينتظر فيه السلايدر قبل الانتقال إلى العنصر التالي.
stopOnInteraction: true:
يعني أنه إذا تفاعل المستخدم مع السلايدر (مثل النقر أو السحب)، سيتوقف التشغيل التلقائي. هذا الخيار مهم لتحسين تجربة المستخدم، مما يسمح لهم بالتحكم في السلايدر عند الحاجة.
 */}
    const plugin=useRef(Autoplay({delay:2000,stopOnInteraction:true}))
  return (
    <Carousel
    className={cn('w-full h-full')}
    plugins={[plugin.current]}
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.reset}
    >
        <CarouselContent className='h-full w-full'>
            {images.map((img,index)=>(
                <CarouselItem key={index}>
                    <div className='w-full overflow-hidden rounded-3xl border border-border h-fit'>
                      <AspectRatio ratio={16/9}>
                      <Image
                      className={cn('w-full h-full object-cover',className)}
                      alt={img.alt}
                      src={img.src}
                      width={1900}
                      height={1900}
                      />
                       </AspectRatio >
                    </div>

                </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
  )
}