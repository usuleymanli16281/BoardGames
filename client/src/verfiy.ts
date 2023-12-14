import {jwtDecode} from "jwt-decode";
const TOKEN_LIFETIME = 3600

export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if the current time is within the valid period from the iat time
        return decoded.iat && (currentTime - decoded.iat) < TOKEN_LIFETIME;
    } catch (error) {
        return false;
    }
};
