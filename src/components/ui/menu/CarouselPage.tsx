import React, { useEffect, useState } from "react";
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
import Paragraph from "../headings/Paragraph";
import { useParams, useLocation } from "react-router-dom";
import { carouselData } from "../../../utils/data";
import { Widget } from "../../../types/types";

function CarouselPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [data, setData] = useState<Widget[] | undefined>();

  const { name } = useParams();
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[1];

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

  useEffect(() => {
    setData(
      carouselData.filter((item) => {
        if (item.sub_category) {
          return item.sub_category === name;
        } else {
          return item.category === currentPath;
        }
      })
    );
  }, []);

  return (
    <section className="flex flex-col h-full">
      <div className="mt-6 w-fit">
        {data ? (
          <Header1 text={data[0].title} className="font-medium capitalize" />
        ) : null}
      </div>
      <div className="mt-2">
        <Paragraph
          text="Choose a design of your choice"
          className="text-textColor/70 w-[40%] leading-[1]"
        />
      </div>
      <div className="mt-auto">
        <div className="mb-4">
          <p className="text-center opacity-70">Preview</p>
        </div>
        <div className="mb-24">
            {data  ? 
          <Carousel
          opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-[70%] mx-auto max-w-xs"
            >
            <CarouselContent className="-mt-1 h-[200px]">
              {data?.map((item, i) => (
                  <CarouselItem
                  key={
                      item.sub_category
                      ? `${item.sub_category}${item.serial_num}`
                      : `${item.category}${item.serial_num}`
                    }
                    className="pt-1"
                    >
                  <div className="p-1 h-full flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(../../images/preview.jpg)` }}>
                    <item.preview
                      is_glassomorphic={item.is_glassomorphic}
                      is_primary={item.is_primary}
                      primaryColor="#F7EAE4"
                      secondaryColor="#2D2929"
                      data={item.data!}
                      />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> : null
        }
          <Paragraph text={`${current} / ${count}`} className="text-center" />
          </div>
          <Button className="w-full">Select</Button>
          </div>
    </section>
  );
}

export default CarouselPage;
