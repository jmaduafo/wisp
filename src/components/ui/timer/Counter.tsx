import { Minus, Plus } from "lucide-react";
import React from "react";

function Counter({
  count,
  setCount,
  secondary_color,
  max_count,
  title
}: {
  readonly count: number;
  readonly setCount: React.Dispatch<React.SetStateAction<number>>;
  readonly secondary_color: string;
  readonly max_count?: number;
  readonly title: string;
}) {
    function customMaxCount() {
        if (max_count) {
            if (count === max_count) {
                return "invisible"
            } else {
                return "visible"
            }
        }
    }
  return (
    <div>
        <div className="mb-0.5">
            <p className="text-[0.8em] text-center opacity-70">{title}</p>
        </div>
      <div
        className="flex items-center gap-2 font-light rounded-md border px-1 py-0.5"
        style={{ borderColor: secondary_color + "30" }}
      >
        <button
          className={`${
            count === 0 ? "invisible" : "visible"
          } cursor-pointer opacity-70`}
          onClick={() => setCount((prev) => prev - 1)}
        >
          <Minus className="w-[0.75em] h-[0.75em]"/>
        </button>
        <p className="text-[0.75em]">{count < 10 ? "0" + count : count}</p>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className={ `${customMaxCount()} cursor-pointer opacity-70`}
        >
          <Plus className="w-[0.75em] h-[0.75em]"/>
        </button>
      </div>
    </div>
  );
}

export default Counter;
