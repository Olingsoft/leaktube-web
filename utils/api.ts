// export const API_BASE_URL = "http://localhost:8000";
export const API_BASE_URL = "https://c05c4189af96.ngrok-free.app";

export const getApiUrl = (endpoint: string) => {
    return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
 