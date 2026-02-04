import React from "react";
import { Metadata } from "next";
import HomeClient from "./HomeClient";
import SkyscraperAd from "./components/SkyscraperAd";
import { getApiUrl, API_BASE_URL } from "@/utils/api";

/**
 * Static Metadata for SEO
 */
export const metadata: Metadata = {
  title: "Unite Kenyans | Home of Viral & Trending Content in Kenya",
  description: "Browse the latest trending and viral videos across Kenya. Stay updated with what's happening in the community, from entertainment to social awareness.",
  openGraph: {
    title: "Unite Kenyans | Trending Content",
    description: "Kenya's hub for viral trends and digital awareness.",
    type: "website",
    url: "https://unitekenyans.co.ke", // Update with real domain
    siteName: "Unite Kenyans",
  }
};

/**
 * Helpers
 */

/**
 * Data Fetching (Server Side)
 */
async function getVideos(category?: string) {
  try {
    let url = getApiUrl("/api/videos");
    if (category) url += `?category=${encodeURIComponent(category)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getTrends() {
  try {
    const res = await fetch(getApiUrl("/api/trends"), { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(getApiUrl("/api/categories"), { next: { revalidate: 3600 * 24 } });
    const data = await res.json();
    return data.success ? data.data.map((c: any) => c.name) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const categoryParam = category;

  // Fetch data in parallel
  const [videos, trends, rawCategories] = await Promise.all([
    getVideos(categoryParam),
    getTrends(),
    getCategories()
  ]);

  const categories = ["All", ...rawCategories];

  return (
    <div className="min-h-screen flex relative">
      <SkyscraperAd side="left" />
      <div className="flex-1 w-full min-w-0 md:ml-[180px] xl:ml-[200px] xl:mr-[200px] transition-all duration-300">
        <HomeClient
          initialVideos={videos}
          trends={trends}
          categories={categories}
          categoryParam={categoryParam}
        />
      </div>
      <SkyscraperAd side="right" />
    </div>
  );
}
