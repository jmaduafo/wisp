import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button } from "../button";
import Header1 from "../headings/Header1";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../../../components/ui/carousel";
import Paragraph from "../headings/Paragraph";
import { useParams, useLocation } from "react-router-dom";
import { carouselData } from "../../../utils/data";
function CarouselPage() {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [data, setData] = useState();
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
        setData(carouselData.filter((item) => {
            if (item.sub_category) {
                return item.sub_category === name;
            }
            else {
                return item.category === currentPath;
            }
        }));
    }, []);
    return (_jsxs("section", { className: "flex flex-col h-full", children: [_jsx("div", { className: "mt-6 w-fit", children: data ? (_jsx(Header1, { text: data[0].title, className: "font-medium capitalize" })) : null }), _jsx("div", { className: "mt-2", children: _jsx(Paragraph, { text: "Choose a design of your choice", className: "text-textColor/70 w-[40%] leading-[1]" }) }), _jsxs("div", { className: "mt-auto", children: [_jsx("div", { className: "mb-4", children: _jsx("p", { className: "text-center opacity-70", children: "Preview" }) }), _jsxs("div", { className: "mb-24", children: [data ?
                                _jsxs(Carousel, { opts: {
                                        align: "start",
                                        loop: true,
                                    }, setApi: setApi, className: "w-[70%] mx-auto max-w-xs", children: [_jsx(CarouselContent, { className: "-mt-1 h-[200px]", children: data?.map((item, i) => (_jsx(CarouselItem, { className: "pt-1", children: _jsx("div", { className: "p-1 h-full flex justify-center items-center bg-cover bg-center bg-no-repeat", style: { backgroundImage: `url(../../images/preview.jpg)` }, children: _jsx(item.preview, { is_glassomorphic: item.is_glassomorphic, is_primary: item.is_primary, primaryColor: "#F7EAE4", secondaryColor: "#2D2929", data: item.data }) }) }, item.sub_category
                                                ? `${item.sub_category}${item.serial_num}`
                                                : `${item.category}${item.serial_num}`))) }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }) : null, _jsx(Paragraph, { text: `${current} / ${count}`, className: "text-center" })] }), _jsx(Button, { className: "w-full", children: "Select" })] })] }));
}
export default CarouselPage;
