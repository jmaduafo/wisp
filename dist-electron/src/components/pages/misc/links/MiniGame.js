import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Paragraph from "@/components/ui/headings/Paragraph";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { elements, gameCombinations } from "@/utils/data";
import { capitalize } from "@/utils/helper";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
export default function MiniGame() {
    const [userElements, setUserElements] = useState();
    const [firstItem, setFirstItem] = useState();
    const [secondItem, setSecondItem] = useState();
    const [isCorrect, setIsCorrect] = useState();
    const [isUnlocked, setIsUnlocked] = useState();
    const [unlockedResult, setUnlockedResult] = useState();
    const { userData } = useAuth();
    const STORAGE_TITLE = "wisp_unlocked_collection";
    const getUnlockedElements = () => {
        if (typeof window === "undefined" ||
            typeof window.localStorage === "undefined") {
            console.warn("localStorage not available; using fallback defaults");
            const fallback = Array.isArray(elements) ? elements.slice(0, 4) : [];
            setUserElements(fallback);
            return;
        }
        try {
            const raw = localStorage.getItem(STORAGE_TITLE);
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) {
                        setUserElements(parsed);
                        return;
                    }
                    else {
                        console.warn("Stored unlocked elements invalid shape, resetting.", parsed);
                    }
                }
                catch (parseErr) {
                    console.warn("Failed to parse stored unlocked elements, resetting.", parseErr);
                }
            }
            // No valid storage; set initial default
            const initial = Array.isArray(elements) ? elements.slice(0, 4) : [];
            localStorage.setItem(STORAGE_TITLE, JSON.stringify(initial));
            setUserElements(initial);
        }
        catch (err) {
            console.error("Error accessing localStorage:", err);
            // fallback
            const fallback = Array.isArray(elements) ? elements.slice(0, 4) : [];
            setUserElements(fallback);
        }
    };
    useEffect(() => {
        getUnlockedElements();
    }, []);
    const selectElement = (selectedItem) => {
        if (firstItem) {
            setSecondItem(selectedItem);
        }
        else {
            const findItem = elements.find((item) => item.element === selectedItem.element);
            if (!findItem) {
                return;
            }
            setFirstItem(selectedItem);
        }
    };
    const checkResult = (item1, item2) => {
        let correct = false;
        let unlocked = false;
        // Check if combo exists by seeing if element 1 and 2
        // are a match
        const combo = gameCombinations.find((item) => item.item1 === item1.element && item.item2 === item2.element);
        // Return false if combo doesn't exist
        if (!combo) {
            return {
                correct,
                unlocked,
            };
        }
        correct = true;
        const result = combo.result;
        // Find if unlocked element is in user's collection
        const resultIndex = userElements?.findIndex((item) => item.element === result);
        // If combined element isn't already added to unlocked list,
        // then add element to user's collection
        if (!resultIndex) {
            unlocked = true;
            const resultFind = elements.find((item) => item.element === result);
            if (!resultFind) {
                return;
            }
            setUserElements((prev) => prev && [...prev, resultFind]);
            setUnlockedResult(resultFind);
        }
        return {
            correct,
            unlocked,
        };
    };
    const showElement = (item1, item2) => {
        if (isCorrect === undefined || isUnlocked === undefined) {
            return;
        }
        const combo = gameCombinations.find((item) => item.item1 === item1.element && item.item2 === item2.element);
        if (!combo) {
            return;
        }
        if (isCorrect && isUnlocked) {
            return `You have discovered ${combo.result}!`;
        }
        else if (isCorrect && !isUnlocked) {
            return `${capitalize(combo.result)} has already been discovered. Select another match`;
        }
        else {
            return `Elements do not match. Please try again`;
        }
    };
    // useEffect(() => {
    //   if (userElements) {
    //     localStorage.setItem(storage_title, JSON.stringify(userElements));
    //     const collection = localStorage.getItem(storage_title);
    //     if (collection) {
    //       setUserElements(JSON.parse(collection));
    //     }
    //   }
    // }, [userElements]);
    useEffect(() => {
        if (firstItem && secondItem) {
            const result = checkResult(firstItem, secondItem);
            if (result) {
                setIsCorrect(result.correct);
                setIsUnlocked(result.unlocked);
                const wait = setTimeout(() => {
                    setFirstItem(undefined);
                    setSecondItem(undefined);
                }, 4000);
                return () => clearTimeout(wait);
            }
        }
    }, [firstItem, secondItem]);
    return (_jsxs(Widget, { className: "overflow-hidden h-full", children: [_jsxs("div", { className: "h-[75%] flex flex-col items-center", children: [_jsx("div", { className: "flex-[10%] flex justify-end w-full", children: _jsx("button", { className: "text-[4.5vw] hover:opacity-100 opacity-90 duration-300 cursor-pointer px-2 font-light rounded-sm", style: {
                                backgroundColor: userData?.secondary_color,
                                color: userData?.primary_color,
                            }, children: "Collection" }) }), _jsxs("div", { className: "flex-[90%] flex flex-col justify-center items-center", children: [_jsx("div", { className: "", children: firstItem && secondItem ? (_jsx(Paragraph, { text: showElement(firstItem, secondItem) ?? "", className: "text-center leading-[1]" })) : null }), _jsxs("div", { className: "mt-2 flex gap-2 items-center justify-center", children: [_jsx(Slot, { children: _jsx("div", { children: firstItem ? (_jsx("img", { src: firstItem.icon, alt: firstItem.element, className: "w-full h-full" })) : null }) }), _jsx("div", { className: `${firstItem &&
                                            secondItem &&
                                            checkResult(firstItem, secondItem)?.correct === false
                                            ? "rotate-45"
                                            : "rotate-0 "} duration-300`, children: firstItem ? (_jsx(Plus, { className: "w-[7vw] h-[7vw]" })) : (_jsx("div", { className: "w-[7vw] h-[7vw]" })) }), _jsx(Slot, { children: _jsx("div", { children: secondItem ? (_jsx("img", { src: secondItem.icon, alt: secondItem.element, className: "w-full h-full" })) : null }) })] })] })] }), _jsxs("div", { className: "h-[25%] mt-2", children: [_jsx(Paragraph, { text: "Click an element", className: "text-center opacity-80 font-light" }), _jsx("div", { children: _jsx("div", { className: "mt-1 flex items-end gap-5 overflow-auto", children: userElements ? (userElements.map((item) => {
                                return (_jsxs("button", { className: `${firstItem && secondItem
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"} flex flex-col items-center cursor-pointer`, onClick: () => selectElement(item), disabled: firstItem !== undefined && secondItem !== undefined, children: [_jsx("div", { className: "w-[12vw] h-[12vw] object-cover object-center", children: _jsx("img", { className: "w-full h-full", src: item.icon, alt: item.element }) }), _jsx(Paragraph, { text: item.element, className: "font-light" })] }, item.element));
                            })) : (_jsx("div", { className: "w-full mt-2 flex items-center justify-center overflow-y-hidden", children: _jsx(Loader, {}) })) }) })] })] }));
}
function Slot({ children }) {
    const { userData } = useAuth();
    return (_jsx("div", { className: "w-[35vw] h-[35vw] border-[1.5px] rounded-full flex justify-center items-center", style: { borderColor: userData?.secondary_color + "30" }, children: _jsx("div", { className: "w-[20vw] h-[20vw] object-cover object-center", children: children }) }));
}
