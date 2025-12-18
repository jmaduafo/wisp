import { refreshAccessToken } from "./spotifyAuth";
const API = "https://api.spotify.com/v1";
function authHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
    };
}
// Get currently playing track
export async function getNowPlaying() {
    try {
        let accessToken = localStorage.getItem("spotify_access_token");
        if (!accessToken)
            throw new Error("No access token found");
        const res = await fetch(`${API}/me/player/currently-playing`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.status === 401) {
            // Token expired, refresh and retry
            accessToken = await refreshAccessToken();
            return getNowPlaying();
        }
        if (res.status === 204)
            return null; // nothing is playing
        return await res.json();
    }
    catch (err) {
        console.error("Error Playing: " + err);
    }
}
// Control playback
export async function playPause() {
    const state = await fetch(`${API}/me/player`, { headers: authHeaders() }).then((r) => r.json());
    const endpoint = state.is_playing ? "pause" : "play";
    await fetch(`${API}/me/player/${endpoint}`, {
        method: "PUT",
        headers: authHeaders(),
    });
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
