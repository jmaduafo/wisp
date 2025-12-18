import Widget from "@/components/ui/widget/Widget";
import { useCurrentlyPlaying } from "@/hooks/useCurrentlyPlaying";
import { getNowPlaying } from "@/lib/spotify/spotifyApi";
import React, { useEffect, useState } from "react";

function NowPlaying() {
  const track = useCurrentlyPlaying();

  if (!track) {
    return (
      <Widget>
        <div>
          <p>No music playing</p>
        </div>
      </Widget>
    );
  }

//   console.log(track)

//   const { item, is_playing } = track;



  return (
    <Widget>
      <div>
      </div>
    </Widget>
  );
}

export default NowPlaying;
