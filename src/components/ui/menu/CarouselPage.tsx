import React, { useEffect, useState } from "react";
import SevenDay1 from "../../pages/weather/7-day/SevenDay1";
import { Button } from "../button";
import Header1 from "../headings/Header1";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

function CarouselPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="flex flex-col h-full">
      <div className="mt-6 border-b-[2px] border-b-textColor w-fit">
        <Header1 text="7-Day Forecast" className="font-medium" />
      </div>
      <div className="mt-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-[70%] mx-auto max-w-xs"
        >
          <CarouselContent className="-mt-1 h-[200px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index + 1} className="pt-1">
                <div className="p-1 h-full flex items-center justify-center">
                  <p className="text-center">{index}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="text-center mb-8">{current} / {count}</p>
        <SevenDay1 />
        <div></div>
        <Button className="w-full">Select</Button>
      </div>
    </section>
  );
}

export default CarouselPage;
