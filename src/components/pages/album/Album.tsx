import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FilePicker from "@/components/ui/file-picker/FilePicker";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/firebase/actions";
import { db } from "@/firebase/config";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Repeat2, CirclePlus, Trash, Camera } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function Album() {
  const [selectedPhotos, setSelectedPhotos] = useState<File[] | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const { userData } = useAuth();

  const addImages = async () => {
    try {
      setLoading(true);

      if (!selectedPhotos || !userData) {
        return;
      }

      if (selectedPhotos.length + userData.album.length > 15) {
        setMessage("Limit of 15 images");
        return;
      }

      const photos: string[] = userData.album;

      selectedPhotos.forEach(async (item) => {
        const result = await uploadImage(item, `users/${userData.id}/album`);

        if (!result.success) {
          console.log(result.response)
        }

        photos.push(result.response);
      });

      console.log(photos)

      const userRef = doc(db, "users", userData.id);

      await updateDoc(userRef, {
        album: photos,
        updated_at: serverTimestamp(),
      });
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const replaceImage = async (index: number) => {
    try {
      setLoading(true);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (index: number) => {
    try {
      setLoading(true);

      console.log("");
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addImages();
  }, [selectedPhotos]);

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

  const albumCarousel = userData?.album?.length ? (
    <>
      {/* IMAGE SLIDE */}
      <div className="h-full group-hover:h-[85%]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="h-full w-full"
        >
          <CarouselContent>
            {userData.album.map((item, i) => {
              return (
                <CarouselItem key={`${item}-${i + 1}`}>
                  <img src={item} alt={`${userData.name}'s album ${i + 1}`} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
      {/* ACTIONS CONTAINER */}
      <div className="h-0 invisible group-hover:h-[15%] group-hover:visible flex justify-between items-center px-2">
        <FilePicker
          className="flex items-center gap-1 cursor-pointer shade"
          inputRef={inputRef}
          setNewImages={setSelectedPhotos}
        >
          <span>
            <CirclePlus strokeWidth={1.4} className="w-[7vw] h-[7vw]" />
          </span>
          <span className="text-[7vw] font-medium">Add</span>
        </FilePicker>
        <div className="flex items-center gap-1.5">
          <button
            className="cursor-pointer shade"
            title="Replace"
            onClick={() => replaceImage(current)}
          >
            <Repeat2 strokeWidth={1.4} className="w-[10vw] h-[10vw]" />
          </button>
          <button
            className="cursor-pointer shade"
            title="Delete"
            onClick={() => deleteImage(current)}
          >
            <Trash strokeWidth={1.4} className="w-[8vw] h-[8vw]" />
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="relative w-full h-full flex justify-center items-center group">
      <p className="group-hover:invisible visible">No images</p>
      <FilePicker
        className="absolute bg-black/25 w-full h-full flex justify-center items-center invisible group-hover:visible cursor-pointer"
        inputRef={inputRef}
        setNewImages={setSelectedPhotos}
      >
        <Camera strokeWidth={1} className="w-[35vw] h-[35vw] opacity-75" />
      </FilePicker>
    </div>
  );

  return (
    <Widget padding="p-0" className="group duration-300">
      {!userData || loading ? <Loader /> : albumCarousel}
    </Widget>
  );
}

export default Album;
