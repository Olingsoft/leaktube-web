import React from "react";
import { Metadata } from "next";
import HomeClient from "./HomeClient";
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
async function getVideos(category?: string, search?: string) {
  try {
    let url = getApiUrl("/api/videos");
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

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

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const { category, q } = await searchParams;
  const categoryParam = category;
  const searchParam = q;

  // Fetch data in parallel
  const [videos, trends, rawCategories] = await Promise.all([
    getVideos(categoryParam, searchParam),
    getTrends(),
    getCategories()
  ]);

  const categories = ["All", ...rawCategories];

  return (
    <div className="min-h-screen">
      <HomeClient
        initialVideos={videos}
        trends={trends}
        categories={categories}
        categoryParam={categoryParam}
        initialSearch={searchParam}
      />
    </div>
  );
}
