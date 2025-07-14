import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Carousel, CarouselContent, CarouselItem, } from "@/components/ui/carousel";
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
    const [selectedPhotos, setSelectedPhotos] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [api, setApi] = React.useState();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const inputRef = useRef(null);
    const replaceRef = useRef(null);
    const { userData } = useAuth();
    // ADDS UP TO 15 IMAGES TO ALBUM
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
            const uploadedUrls = await Promise.all(selectedPhotos.map(async (item) => {
                const result = await uploadImage(item, `users/${userData.id}/album`);
                if (!result.success) {
                    console.log(result.response);
                    return null;
                }
                return result.response;
            }));
            // Filter out any failed uploads (nulls)
            const validUrls = uploadedUrls.filter((url) => Boolean(url));
            // Merge with existing photos
            const updatedPhotos = [...userData.album, ...validUrls];
            const userRef = doc(db, "users", userData.id);
            await updateDoc(userRef, {
                album: updatedPhotos,
                updated_at: serverTimestamp(),
            });
            setSelectedPhotos(null);
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    // REPLACES AN OLD SELECTED IMAGE WITH A NEW ONE 
    const replaceImage = async (index, file) => {
        try {
            setLoading(true);
            if (!userData || !file) {
                return;
            }
            // UPLOAD IMAGE TO ALBUM STORAGE
            const image = await uploadImage(file, `users/${userData.id}/album`);
            if (!image.success) {
                console.log(image.response);
                return;
            }
            // GET EXACT PATH OF URL IN THE FORM OF 'USERS/ALBUM/IMAGE.JPG'
            const noHash = userData.album[index].split("/").pop();
            const reformat = noHash?.split("%2F").join("/").split("?")[0];
            let replacedAlbum = [...userData.album];
            replacedAlbum[index] = image.response;
            const userRef = doc(db, "users", userData.id);
            // CALL FOR DELETION OF IMAGE FROM STORAGE AND UPDATE THE USER DOCUMENT
            const [deleteRes] = await Promise.all([
                deleteImageFromStorage(reformat),
                updateDoc(userRef, {
                    album: replacedAlbum,
                    updated_at: serverTimestamp(),
                }),
            ]);
            if (!deleteRes.success) {
                setMessage(deleteRes.response);
                return;
            }
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    // DELETES IMAGE FROM ALBUM
    const deleteImage = async (index) => {
        try {
            setLoading(true);
            if (!userData) {
                return;
            }
            // GET EXACT PATH OF URL IN THE FORM OF 'USERS/ALBUM/IMAGE.JPG'
            const noHash = userData.album[index].split("/").pop();
            const reformat = noHash?.split("%2F").join("/").split("?")[0];
            // FILTER OUT THE SPECIFIC IMAGE FROM ARRAY
            const filterAlbum = userData.album.filter((item) => item !== userData.album[index]);
            const userRef = doc(db, "users", userData.id);
            // CALL FOR DELETION OF IMAGE FROM STORAGE AND UPDATE THE USER DOCUMENT
            const [deleteRes] = await Promise.all([
                deleteImageFromStorage(reformat),
                updateDoc(userRef, {
                    album: filterAlbum,
                    updated_at: serverTimestamp(),
                }),
            ]);
            if (!deleteRes.success) {
                setMessage(deleteRes.response);
                return;
            }
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        addImages();
    }, [selectedPhotos]);
    // CAROUSEL
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
    const albumCarousel = userData?.album?.length ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-screen group-hover:h-[85vh] ", children: _jsx(Carousel, { opts: {
                        align: "start",
                        loop: true,
                    }, plugins: [
                        Autoplay({
                            delay: 8000,
                        }),
                    ], setApi: setApi, className: " w-full h-full", children: _jsxs(CarouselContent, { className: "h-screen group-hover:h-[85vh]", children: [userData.album.map((item, i) => {
                                return (_jsx(CarouselItem, { className: "h-full w-full bg-cover bg-center bg-no-repeat", style: { backgroundImage: `url(${item})` } }, `${item}-${i + 1}`));
                            }), message.length ? _jsx("p", { children: message }) : null] }) }) }), _jsxs("div", { className: "h-0 invisible group-hover:h-[15vh] group-hover:visible flex justify-between items-center px-2", children: [_jsxs(FilePicker, { className: "flex items-center gap-1 cursor-pointer shade", inputRef: inputRef, setNewImages: setSelectedPhotos, children: [_jsx("span", { children: _jsx(CirclePlus, { strokeWidth: 1.4, className: "w-[7vw] h-[7vw]" }) }), _jsx("span", { className: "text-[7vw] font-medium", children: "Add" })] }), _jsxs("p", { className: "text-[6vw]", children: [current, " / ", count] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsxs("div", { className: "flex", children: [_jsx("button", { className: "cursor-pointer shade", onClick: () => {
                                            replaceRef.current?.click();
                                        }, title: "Replace", children: _jsx(Repeat2, { strokeWidth: 1.4, className: "w-[10vw] h-[10vw]" }) }), _jsx("input", { ref: replaceRef, type: "file", className: "hidden", accept: "image/*", onChange: (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                replaceImage(current - 1, file);
                                            }
                                        } })] }), _jsx("button", { className: "cursor-pointer shade", title: "Delete", onClick: () => deleteImage(current - 1), children: _jsx(Trash, { strokeWidth: 1.4, className: "w-[8vw] h-[8vw]" }) })] })] })] })) : (_jsxs("div", { className: "relative w-full h-full flex justify-center items-center group", children: [_jsx("p", { className: "group-hover:invisible visible", children: message.length ? _jsx("p", { children: message }) : "No photos yet" }), _jsx(FilePicker, { className: "absolute bg-black/25 w-full h-full flex justify-center items-center invisible group-hover:visible cursor-pointer", inputRef: inputRef, setNewImages: setSelectedPhotos, children: _jsx(Camera, { strokeWidth: 1, className: "w-[35vw] h-[35vw] opacity-75" }) })] }));
    return (_jsx(Widget, { padding: "p-0", className: "group duration-300 w-full h-full", children: !userData || loading ? _jsx(Loader, {}) : albumCarousel }));
}
export default Album;
