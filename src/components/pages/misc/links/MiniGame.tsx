import Header2 from "@/components/ui/headings/Header2";
import Header3 from "@/components/ui/headings/Header3";
import Paragraph from "@/components/ui/headings/Paragraph";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { Alchemy, AlchemyCollection } from "@/types/types";
import { elements, gameCombinations } from "@/utils/data";
import { capitalize, sortArray } from "@/utils/helper";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Equal, Plus, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const STORAGE_TITLE = "wisp_unlocked_collection";
const STORAGE_COMBOS = "wisp_combination_list";

export default function MiniGame() {
  const [userElements, setUserElements] = useState<Alchemy[] | undefined>();
  const [filteredElements, setFilteredElements] = useState<Alchemy[]>([]);

  const [userCollection, setUserCollection] = useState<AlchemyCollection[]>([]);

  const [firstItem, setFirstItem] = useState<Alchemy | undefined>();
  const [secondItem, setSecondItem] = useState<Alchemy | undefined>();

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isUnlocked, setIsUnlocked] = useState<boolean | undefined>();

  const [unlockedResult, setUnlockedResult] = useState<Alchemy | undefined>();

  const [searchValue, setSearchValue] = useState("");

  const [openSettings, setOpenSettings] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);

  const [isRestarted, setIsRestarted] = useState(false);

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
      const rawCombo = localStorage.getItem(STORAGE_COMBOS);

      if (raw && rawCombo) {
        try {
          const parsed = JSON.parse(raw);
          const parsedCombo = JSON.parse(rawCombo);

          if (Array.isArray(parsed)) {
            setUserElements(sortArray(parsed, "element"));
            setFilteredElements(sortArray(parsed, "element"));

            setUserCollection(parsedCombo);
            return;
          } else {
            console.warn(
              "Stored unlocked elements invalid shape, resetting.",
              parsed
            );
          }
        } catch (err: any) {
          console.warn(
            "Failed to parse stored unlocked elements, resetting.",
            err
          );
        }
      }

      // No valid storage; set initial default
      const initial = Array.isArray(elements) ? elements.slice(0, 4) : [];

      localStorage.setItem(STORAGE_TITLE, JSON.stringify(initial));
      localStorage.setItem(STORAGE_COMBOS, JSON.stringify([]));

      setUserElements(sortArray(initial, "element"));
      setFilteredElements(sortArray(initial, "element"));
      setUserCollection([]);
    } catch (err) {
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
  const selectElement = (selectedItem: Alchemy) => {
    // If there's an element already added to the first slot,
    // add the selected item to the second slot

    if (firstItem) {
      setSecondItem(selectedItem);
    } else {
      setFirstItem(selectedItem);
    }
  };

  // EVALUATES IF THERE'S A MATCH OR NOT
  const checkResult = (item1: Alchemy, item2: Alchemy) => {
    // Check if combo exists by seeing if element 1 and 2
    // are a match
    const combo = gameCombinations.find(
      (item) =>
        (item.item1 === item1.element && item.item2 === item2.element) ||
        (item.item1 === item2.element && item.item2 === item1.element)
    );

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
    const resultIndex = userElements?.findIndex(
      (item) => item.element === result
    );

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

      setFilteredElements(
        sortArray([...filteredElements, resultFind], "element")
      );

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

    setUserCollection([combo, ...userCollection]);
    localStorage.setItem(
      STORAGE_COMBOS,
      JSON.stringify([combo, ...userCollection])
    );

    return {
      correct: true,
      unlocked: true,
    };
  };

  // DISPLAYS A MESSAGE ONCE A COMBINATION IS MADE
  const showElement = (item1: Alchemy, item2: Alchemy) => {
    if (isCorrect === undefined || isUnlocked === undefined) {
      return;
    }

    const combo = gameCombinations.find(
      (item) =>
        (item.item1 === item1.element && item.item2 === item2.element) ||
        (item.item1 === item2.element && item.item2 === item1.element)
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

  // SEARCH ELEMENTS AND FILTER BY SEARCH VALUE
  const filterElements = (value: string) => {
    setSearchValue(value);

    if (!userElements) {
      return;
    }

    if (value === "") {
      setFilteredElements(userElements);
    } else {
      const filter = userElements.filter((item) =>
        item.element.toLowerCase().includes(value.toLowerCase())
      );

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

  return (
    <Widget className="overflow-hidden h-full">
      <div className="h-[75%] flex flex-col items-center">
        <div className="flex-[10%] flex items-center w-full">
          <div className="flex-[1] flex items-center gap-2">
            <Search className="w-[6.5vw] h-[6.5vw]" strokeWidth={1} />
            <input
              placeholder="Search"
              className="text-[5vw] flex-[1] outline-none border-none"
              onChange={(e) => filterElements(e.target.value)}
              value={searchValue}
            />
          </div>
          <button
            className="cursor-pointer"
            onClick={() => setOpenSettings(true)}
          >
            <Cog8ToothIcon className="w-5.5" />
          </button>
          {openSettings && (
            <Settings
              setOpenCollection={setOpenCollection}
              setOpenSettings={setOpenSettings}
              setIsRestarted={setIsRestarted}
              userElements={userElements}
            />
          )}
          {openCollection && (
            <Collection
              setOpenCollection={setOpenCollection}
              setOpenSettings={setOpenSettings}
              collectionList={userCollection}
            />
          )}
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
        {firstItem && secondItem ? (
          <div className="h-4"></div>
        ) : (
          <Paragraph
            text={`Select the ${firstItem ? "second" : "first"} element`}
            className="text-center opacity-80 font-light"
          />
        )}
        <div>
          <div className="mt-1 flex items-end gap-5 overflow-auto scrollBar">
            {userElements ? (
              filteredElements.map((item) => {
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
                    <span className="w-[12vw] h-[12vw] object-cover object-center">
                      <img
                        className="w-full h-full"
                        src={item.icon}
                        alt={item.element}
                      />
                    </span>
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

function Container({ children }: { readonly children: React.ReactNode }) {
  const { userData } = useAuth();

  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-50 p-2"
      style={{ backgroundColor: userData?.primary_color }}
    >
      {children}
    </div>
  );
}

function Settings({
  setOpenSettings,
  setIsRestarted,
  setOpenCollection,
  userElements,
}: {
  readonly setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setOpenCollection: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setIsRestarted: React.Dispatch<React.SetStateAction<boolean>>;
  readonly userElements: Alchemy[] | undefined;
}) {
  return (
    <Container>
      <div className="h-full">
        <div className="flex justify-end h-[10%]">
          <button
            className="cursor-pointer"
            onClick={() => setOpenSettings(false)}
          >
            <X className="w-6 h-6" strokeWidth={1} />
          </button>
        </div>
        <div className=" h-[90%] flex flex-col gap-2 justify-center items-center">
          <div>
            <button
              onClick={() => {
                setOpenCollection(true);
                setOpenSettings(false);
              }}
              className="hover:opacity-70 opacity-100 duration-300"
            >
              <Header3 text="View Collection" />
            </button>
          </div>
          <div>
            <button
              className="text-red-600 hover:opacity-70 opacity-100 duration-300"
              onClick={() => setIsRestarted(true)}
            >
              <Header3 text="Restart" />
            </button>
          </div>
          <div className="mt-[8vh]">
            <Header2
              text={`${userElements?.length} / ${elements.length}`}
              className="text-center"
            />
            <Paragraph text={`elements found`} className="text-center opacity-60" />
          </div>
        </div>
      </div>
    </Container>
  );
}

function Collection({
  setOpenSettings,
  setOpenCollection,
  collectionList,
}: {
  readonly setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setOpenCollection: React.Dispatch<React.SetStateAction<boolean>>;
  readonly collectionList: AlchemyCollection[];
}) {
  return (
    <Container>
      <div className="h-full overflow-y-auto verticalScroll">
        <div className="flex justify-end h-[10%]">
          <button
            className="cursor-pointer"
            onClick={() => {
              setOpenSettings(true);
              setOpenCollection(false);
            }}
          >
            <X className="w-6 h-6" strokeWidth={1} />
          </button>
        </div>
        <div className="w-[90%] mx-auto flex flex-col gap-2">
          {collectionList.map((item) => {
            const findItem1 = elements.find((el) => el.element === item.item1);
            const findItem2 = elements.find((el) => el.element === item.item2);
            const findResult = elements.find(
              (el) => el.element === item.result
            );
            return (
              <div
                key={item.id}
                className="flex justify-between items-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-[11vw] h-[11vw] object-cover objectt-center">
                      <img
                        src={findItem1?.icon}
                        alt={item.item1}
                        className="w-full h-full"
                      />
                    </div>
                    <Paragraph text={item.item1} />
                  </div>
                  <Plus className="w-4 h-4" strokeWidth={1} />
                  <div className="flex flex-col items-center">
                    <div className="w-[11vw] h-[11vw] object-cover objectt-center">
                      <img
                        src={findItem2?.icon}
                        alt={item.item2}
                        className="w-full h-full"
                      />
                    </div>
                    <Paragraph text={item.item2} />
                  </div>
                </div>
                <Equal className="w-4 h-4" strokeWidth={1} />
                <div className="flex flex-col items-center">
                  <div className="w-[11vw] h-[11vw] object-cover objectt-center">
                    <img
                      src={findResult?.icon}
                      alt={item.result}
                      className="w-full h-full"
                    />
                  </div>
                  <Paragraph text={item.result} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
