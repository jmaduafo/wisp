import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { RandQuote } from "@/types/types";
import React, { useEffect, useState } from "react";

function Quote() {
  const [data, setData] = useState<RandQuote | undefined>();
  const api_url = "https://random-quotes-freeapi.vercel.app/api/random";

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
    <Widget padding="p-4">
      {!data ? (
        <Loader />
      ) : (
        <div className="flex flex-col h-full">
          <div>
            <p className="text-[6vw] leading-[1] font-light">{data.quote}</p>
          </div>
          <p className="mt-auto text-right italic text-[5.5vw]">- {data.author}</p>
        </div>
      )}
    </Widget>
  );
}

export default Quote;
