import { SpotifyDevice } from "@/types/types";
import { refreshAccessToken } from "./spotifyAuth";

const API = "https://api.spotify.com/v1";

function authHeaders() {
  const token = localStorage.getItem("spotify_access_token");

  if (!token) throw new Error("No access token found");

  return {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// Get currently playing track
export async function getNowPlaying() {
  try {
    let accessToken = localStorage.getItem("spotify_access_token");
    if (!accessToken) throw new Error("No access token found");

    const res = await fetch(`${API}/me/player/currently-playing`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 401) {
      // Token expired, refresh and retry
      accessToken = await refreshAccessToken();
      return getNowPlaying();
    }

    if (res.status === 204) return null; // nothing is playing

    return await res.json();
  } catch (err) {
    console.error("Error Playing: " + err);
  }
}

export async function getActiveDevice(): Promise<SpotifyDevice | null> {
  const res = await fetch(`${API}/me/player/devices`, {
    headers: authHeaders(),
  });

  if (!res.ok) return null;

  const data = await res.json();

  const active = data.devices.find((d: SpotifyDevice) => d.is_active);

  if (active) {
    localStorage.setItem("spotify_active_device", active.id);
    return active;
  }

  return null;
}

// Control playback
export async function playPause(isPlaying: boolean) {
  const deviceId =
    localStorage.getItem("spotify_active_device") ||
    (await getActiveDevice())?.id;

  if (!deviceId) {
    throw new Error("No active Spotify device");
  }

  const endpoint = isPlaying ? "pause" : "play";

  await fetch(
    `https://api.spotify.com/v1/me/player/${endpoint}?device_id=${deviceId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
      },
    }
  );
}

export async function nextTrack() {
  await fetch(`${API}/me/player/next`, {
    method: "POST",
    headers: authHeaders(),
  });
}

export async function prevTrack() {
  await fetch(`${API}/me/player/previous`, {
    method: "POST",
    headers: authHeaders(),
  });
}
