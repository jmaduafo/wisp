import Paragraph from "@/components/ui/headings/Paragraph";
import Widget from "@/components/ui/widget/Widget";
import { exchangeCodeForTokens } from "@/lib/spotify/spotifyAuth";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect } from "react";

function MusicCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const stateParam = params.get("state");

    const { uid, ver } = JSON.parse(atob(stateParam!));

    console.log("Spotify code:", code);
    console.log("PKCE verifier:", ver);

    if (!code || !ver) {
      console.error("Missing code or PKCE verifier in callback URL");
      return;
    }

    exchangeCodeForTokens(code, ver, uid)
      .then((data) => {
        console.log("Access token:", data.access_token);
        console.log("Refresh token:", data.refresh_token);

        // ngrok callback page
        window.location.replace(
          `/music-player`
        );
      })
      .catch(console.error);
  }, []);

  return (
    <Widget className="flex justify-center items-center">
      <div className="flex items-center gap-[3vw]">
        <div className="animate-spin">
          <Loader2 className="w-[6vw] h-[6vw]" />
        </div>
        <p className="text-[6vw]">Finalizing Spotify login</p>
      </div>
    </Widget>
  );
}

export default MusicCallback;
