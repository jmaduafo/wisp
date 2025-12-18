const CLIENT_ID = "999f019e84634d128182f1748626c875";
const CLIENT_SECRET = "d6f8ca45fc44486999008ee5007d4f1e";
const REDIRECT_URI = `${import.meta.env.VITE_HOST_URL}/callback`;
const SCOPES = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
];
const authUrl = new URL("https://accounts.spotify.com/authorize");
// Utils
const generateRandomString = (length) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
const verifier = generateRandomString(64);
function base64urlencode(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    return window.crypto.subtle.digest("SHA-256", data);
}
export async function loginWithSpotify() {
    // Instead of localStorage, we’ll pass it via query string
    const challenge = base64urlencode(await sha256(verifier));
    localStorage.setItem("code_verifier", verifier);
    const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPES.join(" "),
        redirect_uri: REDIRECT_URI,
        code_challenge_method: "S256",
        code_challenge: challenge,
        verifier, // pass PKCE verifier to callback
    });
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
    // window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}
// Step 2: Exchange code for tokens
export async function exchangeCodeForTokens(code, verifier) {
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier,
        }),
    });
    const data = await res.json();
    console.log("Token exchange response:", data);
    const { access_token, refresh_token } = data;
    localStorage.setItem('spotify_access_token', access_token);
    localStorage.setItem('spotify_refresh_token', refresh_token);
    return { access_token, refresh_token };
}
// Refresh access token using the stored refresh token
export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("spotify_refresh_token");
    if (!refreshToken)
        throw new Error("No refresh token available");
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'refresh_token',
            code_verifier: refreshToken,
        }),
    });
    const data = await res.json();
    if (!data.access_token)
        throw new Error("Failed to refresh token");
    localStorage.setItem("spotify_access_token", data.access_token);
    if (data.refresh_token) {
        localStorage.setItem('spotify_refresh_token', data.refresh_token);
    }
    return data.access_token;
}
