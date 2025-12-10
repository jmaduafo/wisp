import Paragraph from "@/components/ui/headings/Paragraph";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { Alchemy } from "@/types/types";
import { elements, gameCombinations } from "@/utils/data";
import { capitalize } from "@/utils/helper";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function MiniGame() {
  const [userElements, setUserElements] = useState<Alchemy[] | undefined>();

  const [firstItem, setFirstItem] = useState<Alchemy | undefined>();
  const [secondItem, setSecondItem] = useState<Alchemy | undefined>();

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isUnlocked, setIsUnlocked] = useState<boolean | undefined>();

  const [unlockedResult, setUnlockedResult] = useState<Alchemy | undefined>();

  const { userData } = useAuth();
  const STORAGE_TITLE = "wisp_unlocked_collection";

  const getUnlockedElements = () => {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage === "undefined"
    ) {
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
          } else {
            console.warn(
              "Stored unlocked elements invalid shape, resetting.",
              parsed
            );
          }
        } catch (parseErr) {
          console.warn(
            "Failed to parse stored unlocked elements, resetting.",
            parseErr
          );
        }
      }

      // No valid storage; set initial default
      const initial = Array.isArray(elements) ? elements.slice(0, 4) : [];
      localStorage.setItem(STORAGE_TITLE, JSON.stringify(initial));
      setUserElements(initial);
    } catch (err) {
      console.error("Error accessing localStorage:", err);
      // fallback
      const fallback = Array.isArray(elements) ? elements.slice(0, 4) : [];
      setUserElements(fallback);
    }
  };

  useEffect(() => {
    getUnlockedElements();
  }, []);

  const selectElement = (selectedItem: Alchemy) => {
    if (firstItem) {
      setSecondItem(selectedItem);
    } else {
      const findItem = elements.find(
        (item) => item.element === selectedItem.element
      );

      if (!findItem) {
        return;
      }

      setFirstItem(selectedItem);
    }
  };

  const checkResult = (item1: Alchemy, item2: Alchemy) => {

    // Check if combo exists by seeing if element 1 and 2
    // are a match
    const combo = gameCombinations.find(
      (item) => item.item1 === item1.element && item.item2 === item2.element
    );

    // Return false if combo doesn't exist
    if (!combo) {
      return {
        correct: false,
        unlocked: false,
      };
    }

    const result = combo.result;

    // Find if unlocked element is in user's collection
    const resultIndex = userElements?.findIndex(
      (item) => item.element === result
    );

    if (resultIndex && resultIndex > 0) {
      return {
        correct: true,
        unlocked: false,
      };
    }

    // If combined element isn't already added to unlocked list,
    // then add element to user's collection

    const resultFind = elements.find((item) => item.element === result)

    if (!resultFind) {
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
      const updated = [...user_elements, resultFind];

      // persist if you use localStorage / electron store
      try {
        localStorage.setItem(STORAGE_TITLE, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to persist unlocked elements:", err);
      }
      
      return updated;
    });

    // set the unlocked result for UI effects
    setUnlockedResult(resultFind);

    return {
      correct: true,
      unlocked: true,
    };
  };

  const showElement = (item1: Alchemy, item2: Alchemy) => {
    if (isCorrect === undefined || isUnlocked === undefined) {
      return;
    }

    const combo = gameCombinations.find(
      (item) => item.item1 === item1.element && item.item2 === item2.element
    );

    if (isCorrect && isUnlocked) {
      return `You have discovered ${combo?.result}!`;
    } else if (isCorrect === true && isUnlocked === false) {
      return `${capitalize(
        combo?.result ?? ""
      )} has already been discovered. Select another match`;
    } else if (isCorrect === false && isUnlocked === false) {
      return `Elements do not match. Please try again`;
    }
  };

  useEffect(() => {
    if (firstItem && secondItem) {
      const result = checkResult(firstItem, secondItem);

      if (result) {
        setIsCorrect(result.correct);
        setIsUnlocked(result.unlocked);

        const wait = setTimeout(() => {
          setFirstItem(undefined);
          setSecondItem(undefined);
          setUnlockedResult(undefined);

          setIsCorrect(undefined);
          setIsUnlocked(undefined);
        }, 4000);

        return () => clearTimeout(wait);
      }
    }
  }, [firstItem, secondItem]);

  return (
    <Widget className="overflow-hidden h-full">
      <div className="h-[75%] flex flex-col items-center">
        <div className="flex-[10%] flex justify-end w-full">
          <button
            className="text-[4.5vw] hover:opacity-100 opacity-90 duration-300 cursor-pointer px-2 font-light rounded-sm"
            style={{
              backgroundColor: userData?.secondary_color,
              color: userData?.primary_color,
            }}
          >
            Collection
          </button>
        </div>
        <div className="flex-[90%] flex flex-col justify-center items-center">
          <div className="w-full flex justify-center">
            {firstItem && secondItem ? (
              <p className="text-center font-light leading-[1] text-[5.5vw] w-[75%]">
                {showElement(firstItem, secondItem) ?? ""}
              </p>
            ) : null}
          </div>
          <div className="mt-4 flex gap-1.5 items-center justify-center">
            {unlockedResult ? (
              <Slot>
                <img
                  src={unlockedResult.icon}
                  alt={unlockedResult.element}
                  className="w-full h-full"
                />
              </Slot>
            ) : (
              <>
                <Slot>
                  {firstItem ? (
                    <img
                      src={firstItem.icon}
                      alt={firstItem.element}
                      className="w-full h-full"
                    />
                  ) : null}
                </Slot>
                <div
                  className={`${
                    isCorrect === false && isUnlocked === false
                      ? "rotate-45"
                      : "rotate-0 "
                  } duration-300`}
                >
                  {firstItem ? (
                    <Plus className="w-[9vw] h-[9vw]" />
                  ) : (
                    <div className="w-[9vw] h-[9vw]"></div>
                  )}
                </div>
                <Slot>
                  {secondItem ? (
                    <img
                      src={secondItem.icon}
                      alt={secondItem.element}
                      className="w-full h-full"
                    />
                  ) : null}
                </Slot>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-[25%] mt-2">
        <Paragraph
          text="Click an element"
          className="text-center opacity-80 font-light"
        />
        <div>
          <div className="mt-1 flex items-end gap-5 overflow-auto">
            {userElements ? (
              userElements.map((item) => {
                return (
                  <button
                    key={item.element}
                    className={`${
                      firstItem && secondItem
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } flex flex-col items-center cursor-pointer`}
                    onClick={() => selectElement(item)}
                    disabled={
                      firstItem !== undefined && secondItem !== undefined
                    }
                  >
                    <div className="w-[12vw] h-[12vw] object-cover object-center">
                      <img
                        className="w-full h-full"
                        src={item.icon}
                        alt={item.element}
                      />
                    </div>
                    <Paragraph text={item.element} className="font-light" />
                  </button>
                );
              })
            ) : (
              <div className="w-full mt-2 flex items-center justify-center overflow-y-hidden">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </Widget>
  );
}

function Slot({ children }: { readonly children: React.ReactNode }) {
  const { userData } = useAuth();

  return (
    <div
      className="w-[35vw] h-[35vw] border-[1.5px] rounded-full flex justify-center items-center"
      style={{ borderColor: userData?.secondary_color + "30" }}
    >
      <div className="w-[20vw] h-[20vw] object-cover object-center">
        {children}
      </div>
    </div>
  );
}
