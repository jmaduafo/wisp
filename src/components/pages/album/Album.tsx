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
import { deleteImageFromStorage, uploadImage } from "@/firebase/actions";
import { db } from "@/firebase/config";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Repeat2, CirclePlus, Trash, Camera } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

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

      const uploadedUrls = await Promise.all(
        selectedPhotos.map(async (item) => {
          const result = await uploadImage(item, `users/${userData.id}/album`);
          if (!result.success) {
            console.log(result.response);
            return null;
          }
          return result.response;
        })
      );

      // Filter out any failed uploads (nulls)
      const validUrls = uploadedUrls.filter((url): url is string =>
        Boolean(url)
      );

      // Merge with existing photos
      const updatedPhotos = [...userData.album, ...validUrls];

      const userRef = doc(db, "users", userData.id);

      await updateDoc(userRef, {
        album: updatedPhotos,
        updated_at: serverTimestamp(),
      });

      setSelectedPhotos(null);
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

      if (!userData) {
        return
      }

      // GET EXACT PATH OF URL IN THE FORM OF 'USERS/ALBUM/IMAGE.JPG'
      const noHash = userData.album[index].split('/').pop()
      const reformat = noHash?.split('%2F').join('/').split('?')[0]

      // FILTER OUT THE SPECIFIC IMAGE FROM ARRAY
      const filterAlbum = userData.album.filter(item => item !== userData.album[index])

      const userRef = doc(db, "users", userData.id)

      // CALL FOR DELETION OF IMAGE FROM STORAGE AND UPDATE THE USER DOCUMENT
      const [deleteRes] = await Promise.all([
        deleteImageFromStorage(reformat as string),
        updateDoc(userRef, {
          album: filterAlbum,
          updated_at: serverTimestamp()
        })
      ])

      if (!deleteRes.success) {
        setMessage(deleteRes.response)
        return;
      }

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
      <div className="h-screen group-hover:h-[85vh] ">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 8000,
            }),
          ]}
          setApi={setApi}
          className=" w-full h-full"
        >
          <CarouselContent className="h-screen group-hover:h-[85vh]">
            {userData.album.map((item, i) => {
              return (
                <CarouselItem
                  key={`${item}-${i + 1}`}
                  className="h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item})` }}
                ></CarouselItem>
              );
            })}
            {message.length ? <p>{message}</p> : null}
          </CarouselContent>
        </Carousel>
      </div>
      {/* ACTIONS CONTAINER */}
      <div className="h-0 invisible group-hover:h-[15vh] group-hover:visible flex justify-between items-center px-2">
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
        <p className="text-[6vw]">{current} / {count}</p>
        <div className="flex items-center gap-1.5">
          <button
            className="cursor-pointer shade"
            title="Replace"
            onClick={() => replaceImage(current - 1)}
          >
            <Repeat2 strokeWidth={1.4} className="w-[10vw] h-[10vw]" />
          </button>
          <button
            className="cursor-pointer shade"
            title="Delete"
            onClick={() => deleteImage(current - 1)}
          >
            <Trash strokeWidth={1.4} className="w-[8vw] h-[8vw]" />
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="relative w-full h-full flex justify-center items-center group">
      <p className="group-hover:invisible visible">{message.length ? <p>{message}</p> : "No photos yet"}</p>
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
    <Widget padding="p-0" className="group duration-300 w-full h-full">
      {!userData || loading ? <Loader /> : albumCarousel}
    </Widget>
  );
}

export default Album;
