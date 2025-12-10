import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { decodeHTML, difficulty } from "@/utils/misc";
import { CircleCheck, CircleX, Flame } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";

function Quiz() {
  const [data, setData] = useState<any | undefined>();
  const [allAnswers, setAllAnswers] = useState<any[]>([]);
  const [checkedValue, setCheckedValue] = useState("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const api_url = "https://opentdb.com/api.php?amount=1&type=multiple";

  const { userData } = useAuth();

  async function getAPI() {
    try {
      const response = await fetch(api_url);

      if (response.ok) {
        const data = await response.json();

        if (!data) {
          return;
        }

        const data_obj = data.results[0];
        setData(data_obj);

        const answers = [...data_obj.incorrect_answers];
        // [index to place item, how many indexes you want to remove after placing the item, value to place in array]
        answers.splice(
          Math.floor(Math.random() * (data_obj.incorrect_answers?.length + 1)),
          0,
          data_obj.correct_answer
        );

        setAllAnswers(answers);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getAPI();
  }, []);

  const letters = ["A", "B", "C", "D"];

  return (
    <Widget padding="py-3 px-4">
      {data ? (
        <div>
          <div className="flex justify-end gap-1">
            {/* LEVEL OF DIFFICULTY DISPLAY */}
            <div className="flex items-center">
              {Array.from({ length: difficulty(data.difficulty) }).map(
                (_, i) => {
                  return (
                    <Fragment key={`item_${i + 1}`}>
                      <Flame className="w-[5.5vw] h-[5.5vw]" strokeWidth={2} />
                    </Fragment>
                  );
                }
              )}
              {Array.from({ length: 3 - difficulty(data.difficulty) }).map(
                (_, i) => {
                  return (
                    <Fragment key={`item_i_${i + 1}`}>
                      <Flame
                        className="w-[5.5vw] h-[5.5vw] opacity-50"
                        strokeWidth={2}
                      />
                    </Fragment>
                  );
                }
              )}
            </div>
          </div>
          <p className="text-[4.9vw] mt-1">{decodeHTML(data.question)}</p>
          {/* ALL ANSWERS  */}
          <div className="flex flex-col gap-1 mt-1.5">
            {allAnswers.map((item, i) => {
              return (
                <button
                  onClick={() => setCheckedValue(item)}
                  style={{
                    backgroundColor:
                      checkedValue === item
                        ? userData?.secondary_color
                        : "transparent",
                    color:
                      checkedValue === item
                        ? userData?.primary_color
                        : userData?.secondary_color,
                  }}
                  className={`flex gap-2 items-center justify-between py-2 px-3 rounded-full ${
                    isSubmit ? "cursor-default" : "cursor-pointer"
                  }`}
                  key={item}
                  disabled={isSubmit}
                >
                  <span className={`flex gap-3 items-center`}>
                    <span
                      className="w-[7vw] h-[7vw] rounded-full flex justify-center items-center font-light"
                      style={{
                        backgroundColor: userData?.secondary_color,
                        color: userData?.primary_color,
                      }}
                    >
                      <p className="text-[4vw]">{letters[i]}</p>
                    </span>
                    <p className="text-[5vw] leading-[1] text-left">
                      {decodeHTML(item)}
                    </p>
                  </span>
                  {isSubmit && (
                    <span>
                      {data.correct_answer === item && (
                        <CircleCheck
                          strokeWidth={1.5}
                          className="w-[6.5vw] h-[6.5vw]"
                        />
                      )}
                      {data.correct_answer !== checkedValue &&
                        checkedValue === item && (
                          <CircleX
                            strokeWidth={1.5}
                            className="w-[6.5vw] h-[6.5vw]"
                          />
                        )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <button
              className="mt-1 cursor-pointer px-2 py-1 rounded-lg text-[5vw] font-medium hover:opacity-100 opacity-80 duration-300"
              onClick={() => setIsSubmit(true)}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Widget>
  );
}

export default Quiz;
