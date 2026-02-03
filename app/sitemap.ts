import { MetadataRoute } from 'next';
import { getApiUrl } from '@/utils/api';
import { slugify } from '@/utils/seo';

/**
 * Dynamic Sitemap implementation for Unite Kenyans
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://unitekenyans.co.ke';

    // 1. Fetch Dynamic Content in parallel
    const [videosRes, blogsRes] = await Promise.all([
        fetch(getApiUrl('/api/videos'), { next: { revalidate: 3600 } }).then(res => res.json()).catch(() => ({ success: false })),
        fetch(getApiUrl('/api/blogs'), { next: { revalidate: 3600 } }).then(res => res.json()).catch(() => ({ success: false }))
    ]);

    const videos = videosRes.success ? videosRes.data : [];
    const blogs = blogsRes.success ? blogsRes.data : [];

    // 2. Map videos to sitemap format
    const videoEntries = videos.map((video: any) => ({
        url: `${baseUrl}/watch/${slugify(video.title)}-${video._id}`,
        lastModified: new Date(video.updatedAt || video.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 3. Map blogs to sitemap format
    const blogEntries = blogs.map((blog: any) => ({
        url: `${baseUrl}/blogs/${slugify(blog.title)}-${blog._id}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 4. Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
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
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/dmca`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ];

    return [...staticPages, ...videoEntries, ...blogEntries];
}
