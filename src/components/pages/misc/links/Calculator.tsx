import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { calculator } from "@/utils/data";
import { calculatorFormat } from "@/utils/misc";
import React, { useState } from "react";

function Calculator() {
  const { userData } = useAuth();

  // THE STRING THAT HAS THE ACTUAL EQUATION
  const [equation, setEquation] = useState("");
  // THE PREVIEW THAT'S SHOWN TO THE USER
  const [display, setDisplay] = useState("");
  // THE FINAL OUTPUT BASED ON THE "EQUATION" STRING
  const [result, setResult] = useState("");

  const [isResult, setIsResult] = useState(false);
  const [isPositive, setIsPositive] = useState(true);

  const calculate = (output: string, html: string | null) => {
    setIsResult(false);

    if (output === "delete") {
      setEquation("");
      setDisplay("");
      setIsPositive(true);
    } else if (output === "switch") {
      setIsPositive((prev) => !prev);

      if (isPositive) {
        setEquation("-" + equation);
        setDisplay("-" + display);
      } else {
        setEquation(equation.slice(1));
        setDisplay(display.slice(1));
      }
    } else if (output === "backspace") {
      // TAKE OUT THE LAST CHARACTER IN STRING
      setEquation(equation.slice(0, -1));
      setDisplay(display.slice(0, -1));

      if (equation === "") {
        setIsPositive(true);
      }
    } else if (output === "=") {
      setResult(eval(equation));
      setIsResult(true);

      setEquation("");
      setDisplay("");
      setIsPositive(true);
    } else {
      setEquation(equation + output);
      setDisplay(display + html);
    }
  };

  const formatResult = () => {
    // SHOW THE FORMATTED FINAL OUTPUT ONCE THE EQUAL SIGN IS PRESSED
    if (isResult) {
      return calculatorFormat(+result);
    } else {
      return display;
    }
  };

  return (
    <Widget padding="px-3 py-4">
      <div className="h-full flex flex-col font-light">
        <div className="mt-auto">
          <div className="mb-[4vh]">
            <p className="text-[13vw] leading-[1] text-right">
              {formatResult()}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-[3.5vw]">
            {calculator.map((item) => {
              return (
                <button
                  key={item.output}
                  onClick={() => {
                    calculate(item.output, item.html);
                  }}
                  className={`${
                    item.category === "inner" ? "shadow-lg" : "shadow-none"
                  } cursor-pointer rounded-2xl h-[11vh] flex justify-center items-center`}
                  style={{
                    backgroundColor:
                      item.category === "outer"
                        ? userData?.secondary_color
                        : userData?.primary_color,
                    color:
                      item.category === "outer"
                        ? userData?.primary_color
                        : userData?.secondary_color,
                  }}
                >
                  {item.text ? (
                    <p className="text-[6vw]">{item.text}</p>
                  ) : (
                    item.icon
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Widget>
  );
}

export default Calculator;
