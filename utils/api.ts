// export const API_BASE_URL = "https://leaktubeservice.onrender.com";
export const PRODUCTION_API_BASE_URL = "https://leaktubeservice.onrender.com";

//local 
export const API_BASE_URL = "http://localhost:8000";

export const getApiUrl = (endpoint: string) => {
    return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
