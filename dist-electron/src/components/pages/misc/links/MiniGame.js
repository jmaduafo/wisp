import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Header3 from "@/components/ui/headings/Header3";
import Paragraph from "@/components/ui/headings/Paragraph";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { elements, gameCombinations } from "@/utils/data";
import { capitalize, sortArray } from "@/utils/helper";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
const STORAGE_TITLE = "wisp_unlocked_collection";
const STORAGE_COMBOS = "wisp_combination_list";
export default function MiniGame() {
    const [userElements, setUserElements] = useState();
    const [filteredElements, setFilteredElements] = useState([]);
    const [userCollection, setUserCollection] = useState([]);
    const [firstItem, setFirstItem] = useState();
    const [secondItem, setSecondItem] = useState();
    const [isCorrect, setIsCorrect] = useState();
    const [isUnlocked, setIsUnlocked] = useState();
    const [unlockedResult, setUnlockedResult] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [openSettings, setOpenSettings] = useState(false);
    const [openCollection, setOpenCollection] = useState(false);
    const [isRestarted, setIsRestarted] = useState(false);
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
            const rawCombo = localStorage.getItem(STORAGE_COMBOS);
            if (raw && rawCombo) {
                try {
                    const parsed = JSON.parse(raw);
                    const parsedCombo = JSON.parse(rawCombo);
                    if (Array.isArray(parsed)) {
                        setUserElements(sortArray(parsed, "element"));
                        setFilteredElements(sortArray(parsed, "element"));
                        setFilteredElements(parsedCombo);
                        return;
                    }
                    else {
                        console.warn("Stored unlocked elements invalid shape, resetting.", parsed);
                    }
                }
                catch (err) {
                    console.warn("Failed to parse stored unlocked elements, resetting.", err);
                }
            }
            // No valid storage; set initial default
            const initial = Array.isArray(elements) ? elements.slice(0, 4) : [];
            localStorage.setItem(STORAGE_TITLE, JSON.stringify(initial));
            localStorage.setItem(STORAGE_COMBOS, JSON.stringify([]));
            setUserElements(sortArray(initial, "element"));
            setFilteredElements(sortArray(initial, "element"));
            setUserCollection([]);
        }
        catch (err) {
            console.error("Error accessing localStorage:", err);
            // fallback
            const fallback = Array.isArray(elements) ? elements.slice(0, 4) : [];
            setUserElements(fallback);
            setFilteredElements(fallback);
            setUserCollection([]);
        }
    };
    useEffect(() => {
        getUnlockedElements();
    }, []);
    // ALLOWS USER TO SELECT THE ELEMENTS AND ADD THEM TO
    // APPROPRIATE SLOTS
    const selectElement = (selectedItem) => {
        // If there's an element already added to the first slot,
        // add the selected item to the second slot
        if (firstItem) {
            setSecondItem(selectedItem);
        }
        else {
            setFirstItem(selectedItem);
        }
    };
    // EVALUATES IF THERE'S A MATCH OR NOT
    const checkResult = (item1, item2) => {
        // Check if combo exists by seeing if element 1 and 2
        // are a match
        const combo = gameCombinations.find((item) => (item.item1 === item1.element && item.item2 === item2.element) ||
            (item.item1 === item2.element && item.item2 === item1.element));
        // Return false if combo doesn't exist
        if (!combo) {
            return {
                correct: false,
                unlocked: false,
            };
        }
        const result = combo.result;
        // Checks if combination result is contained in element list
        const resultFind = elements.find((item) => item.element === result);
        if (!resultFind) {
            return {
                correct: true,
                unlocked: false,
            };
        }
        // Find if unlocked element is in user's collection
        const resultIndex = userElements?.findIndex((item) => item.element === result);
        if (resultIndex && resultIndex > 0) {
            setUnlockedResult(resultFind);
            return {
                correct: true,
                unlocked: false,
            };
        }
        setUserElements((prev) => {
            const user_elements = Array.isArray(prev) ? prev : [];
            // still double-check by element to avoid duplicates
            if (user_elements.some((item) => item.element === resultFind.element)) {
                return user_elements;
            }
            const updated = sortArray([...user_elements, resultFind], "element");
            setFilteredElements(sortArray([...filteredElements, resultFind], "element"));
            // persist if you use localStorage / electron store
            try {
                localStorage.setItem(STORAGE_TITLE, JSON.stringify(updated));
            }
            catch (err) {
                console.error("Failed to persist unlocked elements:", err);
            }
            return updated;
        });
        // set the unlocked result for UI effects
        setUnlockedResult(resultFind);
        setUserCollection([resultFind, ...userCollection]);
        localStorage.setItem(STORAGE_COMBOS, JSON.stringify([resultFind, ...userCollection]));
        return {
            correct: true,
            unlocked: true,
        };
    };
    // DISPLAYS A MESSAGE ONCE A COMBINATION IS MADE
    const showElement = (item1, item2) => {
        if (isCorrect === undefined || isUnlocked === undefined) {
            return;
        }
        const combo = gameCombinations.find((item) => (item.item1 === item1.element && item.item2 === item2.element) ||
            (item.item1 === item2.element && item.item2 === item1.element));
        if (isCorrect && isUnlocked) {
            return `You have discovered ${combo?.result}!`;
        }
        else if (isCorrect === true && isUnlocked === false) {
            return `${capitalize(combo?.result ?? "")} has already been discovered. Select another match`;
        }
        else if (isCorrect === false && isUnlocked === false) {
            return `Elements do not match. Please try again`;
        }
    };
    // SEARCH ELEMENTS AND FILTER BY SEARCH VALUE
    const filterElements = (value) => {
        setSearchValue(value);
        if (!userElements) {
            return;
        }
        if (value === "") {
            setFilteredElements(userElements);
        }
        else {
            const filter = userElements.filter((item) => item.element.toLowerCase().includes(value.toLowerCase()));
            setFilteredElements(filter);
        }
    };
    useEffect(() => {
        // Runs condition after two elements are selected
        if (firstItem && secondItem) {
            // Check and return the result if it's a match or not
            const result = checkResult(firstItem, secondItem);
            if (result) {
                setIsCorrect(result.correct);
                setIsUnlocked(result.unlocked);
                // Displays message to user if there's a match or not and
                // sets all values to undefined after 3 seconds
                const wait = setTimeout(() => {
                    setFirstItem(undefined);
                    setSecondItem(undefined);
                    setUnlockedResult(undefined);
                    setIsCorrect(undefined);
                    setIsUnlocked(undefined);
                }, 3000);
                return () => clearTimeout(wait);
            }
        }
    }, [firstItem, secondItem]);
    const restartGame = () => {
        // Remove items for storage once selected
        localStorage.removeItem(STORAGE_TITLE);
        // Close settings page
        setOpenSettings(false);
        // Get elements again with just the first four elements
        getUnlockedElements();
        // Reset restart state
        setIsRestarted(false);
    };
    useEffect(() => {
        if (isRestarted) {
            restartGame();
        }
    }, [isRestarted]);
    return (_jsxs(Widget, { className: "overflow-hidden h-full", children: [_jsxs("div", { className: "h-[75%] flex flex-col items-center", children: [_jsxs("div", { className: "flex-[10%] flex items-center w-full", children: [_jsxs("div", { className: "flex-[1] flex items-center gap-2", children: [_jsx(Search, { className: "w-[6.5vw] h-[6.5vw]", strokeWidth: 1 }), _jsx("input", { placeholder: "Search", className: "text-[5vw] flex-[1] outline-none border-none", onChange: (e) => filterElements(e.target.value), value: searchValue })] }), _jsx("button", { className: "cursor-pointer", onClick: () => setOpenSettings(true), children: _jsx(Cog8ToothIcon, { className: "w-5.5" }) }), openSettings && (_jsx(Settings, { setOpenCollection: setOpenCollection, setOpenSettings: setOpenSettings, setIsRestarted: setIsRestarted })), openCollection && (_jsx(Collection, { setOpenCollection: setOpenCollection, setOpenSettings: setOpenSettings, collectionList: userCollection }))] }), _jsxs("div", { className: "flex-[90%] flex flex-col justify-center items-center", children: [_jsx("div", { className: "w-full flex justify-center", children: firstItem && secondItem ? (_jsx("p", { className: "text-center font-light leading-[1] text-[5.5vw] w-[75%]", children: showElement(firstItem, secondItem) ?? "" })) : null }), _jsx("div", { className: "mt-4 flex gap-1.5 items-center justify-center", children: unlockedResult ? (_jsx(Slot, { children: _jsx("img", { src: unlockedResult.icon, alt: unlockedResult.element, className: "w-full h-full" }) })) : (_jsxs(_Fragment, { children: [_jsx(Slot, { children: firstItem ? (_jsx("img", { src: firstItem.icon, alt: firstItem.element, className: "w-full h-full" })) : null }), _jsx("div", { className: `${isCorrect === false && isUnlocked === false
                                                ? "rotate-45"
                                                : "rotate-0 "} duration-300`, children: firstItem ? (_jsx(Plus, { className: "w-[9vw] h-[9vw]" })) : (_jsx("div", { className: "w-[9vw] h-[9vw]" })) }), _jsx(Slot, { children: secondItem ? (_jsx("img", { src: secondItem.icon, alt: secondItem.element, className: "w-full h-full" })) : null })] })) })] })] }), _jsxs("div", { className: "h-[25%] mt-2", children: [firstItem && secondItem ? (_jsx("div", { className: "h-4" })) : (_jsx(Paragraph, { text: `Select the ${firstItem ? "second" : "first"} element`, className: "text-center opacity-80 font-light" })), _jsx("div", { children: _jsx("div", { className: "mt-1 flex items-end gap-5 overflow-auto scrollBar", children: userElements ? (filteredElements.map((item) => {
                                return (_jsxs("button", { className: `${firstItem && secondItem
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"} flex flex-col items-center cursor-pointer`, onClick: () => selectElement(item), disabled: firstItem !== undefined && secondItem !== undefined, children: [_jsx("span", { className: "w-[12vw] h-[12vw] object-cover object-center", children: _jsx("img", { className: "w-full h-full", src: item.icon, alt: item.element }) }), _jsx(Paragraph, { text: item.element, className: "font-light" })] }, item.element));
                            })) : (_jsx("div", { className: "w-full mt-2 flex items-center justify-center overflow-y-hidden", children: _jsx(Loader, {}) })) }) })] })] }));
}
function Slot({ children }) {
    const { userData } = useAuth();
    return (_jsx("div", { className: "w-[35vw] h-[35vw] border-[1.5px] rounded-full flex justify-center items-center", style: { borderColor: userData?.secondary_color + "30" }, children: _jsx("div", { className: "w-[20vw] h-[20vw] object-cover object-center", children: children }) }));
}
function Container({ children }) {
    const { userData } = useAuth();
    return (_jsx("div", { className: "absolute top-0 left-0 w-full h-full z-50 p-2", style: { backgroundColor: userData?.primary_color }, children: children }));
}
function Settings({ setOpenSettings, setIsRestarted, setOpenCollection, }) {
    return (_jsx(Container, { children: _jsxs("div", { className: "h-full", children: [_jsx("div", { className: "flex justify-end h-[10%]", children: _jsx("button", { className: "cursor-pointer", onClick: () => setOpenSettings(false), children: _jsx(X, { className: "w-6 h-6", strokeWidth: 1 }) }) }), _jsxs("div", { className: "pb-[8vh] h-[90%] flex flex-col gap-4 justify-center items-center", children: [_jsx("div", { children: _jsx("button", { onClick: () => {
                                    setOpenCollection(true);
                                    setOpenSettings(false);
                                }, className: "hover:opacity-70 opacity-100 duration-300", children: _jsx(Header3, { text: "View Collection" }) }) }), _jsx("div", { children: _jsx("button", { className: "hover:opacity-70 opacity-100 duration-300", onClick: () => setIsRestarted(true), children: _jsx(Header3, { text: "Restart" }) }) })] })] }) }));
}
function Collection({ setOpenSettings, setOpenCollection, collectionList, }) {
    return (_jsx(Container, { children: _jsxs("div", { className: "h-full", children: [_jsx("div", { className: "flex justify-end h-[10%]", children: _jsx("button", { className: "cursor-pointer", onClick: () => {
                            setOpenSettings(true);
                            setOpenCollection(false);
                        }, children: _jsx(X, { className: "w-6 h-6", strokeWidth: 1 }) }) }), _jsx("div", { children: collectionList.map(item => {
                        return (_jsx("div", {}, item.element));
                    }) })] }) }));
}
