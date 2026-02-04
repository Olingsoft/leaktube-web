import React from "react";
import { Metadata } from "next";
import SkyscraperAd from "../../components/SkyscraperAd";
import WatchClient from "./WatchClient";
import { getApiUrl, API_BASE_URL } from "@/utils/api";
import { extractIdFromSlug } from "@/utils/seo";

interface Video {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    category: string;
    thumbnailUrl: string;
    views: number;
    createdAt: string;
}

/**
 * SEO Helpers
 */
const getEmbedUrl = (url: string) => {
    if (!url) return "";

    // Handle Mega.nz
    if (url.includes('mega.nz')) {
        // Handle "file" format: https://mega.nz/file/ID#KEY
        if (url.includes('/file/')) {
            return url.replace('/file/', '/embed/');
        }
        // Handle hash format: https://mega.nz/#!ID!KEY
        if (url.includes('#!')) {
            return url.replace('#!', 'embed/#!');
        }
        // Fallback for already correct embed links or unknown formats - try to force embed if not present
        if (!url.includes('/embed/')) {
            return url.replace('mega.nz/', 'mega.nz/embed/');
        }
    }

    return url;
};

const getThumbnailUrl = (url: string) => {
    if (!url) return undefined;
    if (url.includes('localhost:8000')) {
        return url.replace('http://localhost:8000', API_BASE_URL);
    }
    return url;
};

/**
 * Data Fetching
 */
async function getVideoData(id: string) {
    const actualId = id.includes('-') ? extractIdFromSlug(id) : id;
    try {
        const res = await fetch(getApiUrl(`/api/videos/${actualId}`), { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.success ? data.data : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function getRelatedVideos(category: string, currentId: string) {
    try {
        const res = await fetch(getApiUrl(`/api/videos?category=${encodeURIComponent(category)}`), { next: { revalidate: 3600 } });
        const data = await res.json();
        if (data.success) {
            return data.data.filter((v: Video) => v._id !== currentId).slice(0, 10);
        }
        return [];
    } catch (e) {
        console.error(e);
        return [];
    }
}

/**
 * Dynamic Metadata
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const video = await getVideoData(id);
    if (!video) return { title: "Video Not Found - Unite Kenyans" };

    const thumbnail = getThumbnailUrl(video.thumbnailUrl);

    return {
        title: `${video.title} | Unite Kenyans`,
        description: video.description,
        openGraph: {
            title: video.title,
            description: video.description,
            type: "video.other",
            url: `https://unitekenyans.co.ke/watch/${id}`,
            images: thumbnail ? [{ url: thumbnail }] : [],
            siteName: "Unite Kenyans",
        },
        twitter: {
            card: "summary_large_image",
            title: video.title,
            description: video.description,
            images: thumbnail ? [thumbnail] : [],
        },
    };
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const video = await getVideoData(id);

    if (!video) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#070707]">
                <p className="text-white font-black uppercase tracking-widest">Video Not Found</p>
            </div>
        );
    }

    const relatedVideos = await getRelatedVideos(video.category, video._id);

    const processedVideo = {
        ...video,
        thumbnailUrl: getThumbnailUrl(video.thumbnailUrl)
    };
    const processedRelated = relatedVideos.map((v: Video) => ({
        ...v,
        thumbnailUrl: getThumbnailUrl(v.thumbnailUrl)
    }));

    const videoEmbedUrl = getEmbedUrl(video.videoUrl);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": video.title,
        "description": video.description,
        "thumbnailUrl": processedVideo.thumbnailUrl,
        "uploadDate": video.createdAt,
        "duration": "PT5M0S",
        "contentUrl": video.videoUrl,
        "embedUrl": videoEmbedUrl,
        "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": { "@type": "WatchAction" },
            "userInteractionCount": video.views
        },
        "regionsAllowed": "KE"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="flex min-h-screen relative">
<<<<<<< HEAD
                {/* <SkyscraperAd side="left" /> */}
=======
>>>>>>> SEO-brch
                <div className="flex-1 xl:mr-[200px] p-4 md:p-6 pt-0 md:pt-6 pb-20 overflow-x-hidden min-w-0 transition-all duration-300">
                    <WatchClient
                        video={processedVideo}
                        relatedVideos={processedRelated}
                        videoEmbedUrl={videoEmbedUrl}
                        thumbnailUrl={processedVideo.thumbnailUrl || ""}
                    />
                </div>
                <SkyscraperAd side="right" />
            </div>
        </>
    );
}
