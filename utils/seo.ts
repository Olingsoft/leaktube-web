/**
 * Generates a URL-friendly slug from a string.
 */
export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-')     // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
};

/**
 * Extracts the ID from a slugified URL (assuming ID is the last part after the last dash).
 * Example: 'my-video-title-65b12abc...' -> '65b12abc...'
 */
export const extractIdFromSlug = (slug: string): string => {
    const parts = slug.split('-');
    return parts[parts.length - 1];
};
