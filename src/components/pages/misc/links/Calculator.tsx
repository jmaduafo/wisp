import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { calculator } from "@/utils/data";
import { calculatorFormat } from "@/utils/misc";
import React, { useState } from "react";

function Calculator() {
  const { userData } = useAuth();

  const [equation, setEquation] = useState("");
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const [isResult, setIsResult] = useState(false);
  const [isPositive, setIsPositive] = useState(true);

  const calculate = (input: string, html: string | null) => {
    setIsResult(false);

    if (input === "delete") {
      setEquation("");
      setDisplay("");
    } else if (input === "switch") {
      setIsPositive((prev) => !prev);

      if (isPositive) {
        setEquation("-" + equation);
        setDisplay("-" + display);
      } else {
        setEquation(equation.slice(1));
        setDisplay(display.slice(1));
      }
    } else if (input === "backspace") {
      setEquation(equation.slice(0, -1));
      setDisplay(display.slice(0, -1));

    } else if (input === "%") {
      if (equation.includes("+") || equation.includes("-")) {
        const split = equation.split(input)

        const percent = split.findIndex(item => item.includes("%"))

        if (percent !== -1) {
          const per = Number(split[percent].slice(0, -1)) * 100

          setEquation(equation + per);
        }
        
      }

    } else if (input === "=") {
      setResult(eval(equation));
      setIsResult(true);
      setEquation("");
      setDisplay("");
    } else {
      setEquation(equation + input);
      setDisplay(display + html);
    }
  };

  const formatResult = () => {
    if (isResult) {
      if (result.toString().includes(".")) {
        return calculatorFormat(+Number(result).toFixed(5))
      }
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
                    equation === "0" && setEquation("");
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
