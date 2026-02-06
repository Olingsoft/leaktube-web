import { API_BASE_URL, PRODUCTION_API_BASE_URL } from "./api";

export const getThumbnailUrl = (url: string) => {
    if (!url) return undefined;

    // 1. Handle remote/external URLs
    if (url.startsWith("http") && !url.includes("localhost:8000")) {
        return url;
    }

    // 2. Handle relative paths (e.g., /uploads/...)
    if (url.startsWith("/")) {
        return `${API_BASE_URL}${url}`;
    }

    // 3. Handle legacy hardcoded localhost URLs - point to production as fallback
    if (url.includes("localhost:8000")) {
        return url.replace("http://localhost:8000", PRODUCTION_API_BASE_URL);
    }

    return url;
};

export const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return "Just now";
};

export const calculateViews = (id: string, base = 0) => {
    if (!id) return "0";
    const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (base + ((seed % 43000) + 7000)).toLocaleString();
};

export const calculateLikes = (id: string, base = 0) => {
    if (!id) return "0";
    const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (base + ((seed % 8000) + 850)).toLocaleString();
};
