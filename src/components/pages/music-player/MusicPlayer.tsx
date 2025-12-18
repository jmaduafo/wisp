import Widget from "@/components/ui/widget/Widget";
import React from "react";
import NowPlaying from "./NowPlaying";
import { loginWithSpotify } from "@/lib/spotify/spotifyAuth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function MusicPlayer() {
  const token = localStorage.getItem("spotify_access_token");
  const { userData } = useAuth();

  if (!token) {
    return (
      <Widget className="flex justify-center items-center">
        <Button
          className=""
          onClick={loginWithSpotify}
          style={{
            backgroundColor: userData?.secondary_color,
            color: userData?.primary_color,
          }}
        >
          Connect Spotify
        </Button>
      </Widget>
    );
  }

  return (
    <div className="h-full w-full">
      <NowPlaying />
    </div>
  );
}

export default MusicPlayer;
