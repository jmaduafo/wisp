import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { RandQuote } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

function Quote() {
  const [data, setData] = useState<RandQuote | undefined>();
  const api_url = "https://random-quotes-freeapi.vercel.app/api/random";

  const { userData } = useAuth()

  async function getAPI() {
    try {
      const response = await fetch(api_url);
      const d = await response.json();
      setData(d);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <Widget padding="py-3 px-4">
      {!data ? (
        <Loader />
      ) : (
        <div className="flex flex-col h-full">
          <div>
            {/* QUOTATION MARK ICON */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill={userData?.secondary_color + "60"}
              className="bi bi-quote"
              viewBox="0 0 16 16"
            >
              <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
            </svg>
            <p className="text-[5.5vw] leading-[1] font-light">{data.quote}</p>
          </div>
          <p className="mt-auto text-right italic text-[5.5vw]">
            - {data.author}
          </p>
        </div>
      )}
    </Widget>
  );
}

export default Quote;
