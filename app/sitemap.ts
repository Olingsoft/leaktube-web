import { MetadataRoute } from 'next';
import { getApiUrl } from '@/utils/api';
import { slugify } from '@/utils/seo';

/**
 * Dynamic Sitemap implementation for Unite Kenyans
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://unitekenyans.co.ke'; // Update with real production domain

    // 1. Fetch all videos to create dynamic links
    let videos = [];
    try {
        const res = await fetch(getApiUrl('/api/videos'), { next: { revalidate: 3600 } });
        const data = await res.json();
        if (data.success) {
            videos = data.data;
        }
    } catch (error) {
        console.error('Error fetching videos for sitemap:', error);
    }

    // 2. Map videos to sitemap format
    const videoEntries = videos.map((video: any) => ({
        url: `${baseUrl}/watch/${slugify(video.title)}-${video._id}`,
        lastModified: new Date(video.updatedAt || video.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // 3. Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ];

    return [...staticPages, ...videoEntries];
}
