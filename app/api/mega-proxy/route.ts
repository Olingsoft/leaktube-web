import { NextRequest, NextResponse } from "next/server";
import { File } from "megajs";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
        return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    // Basic security: restrict to known MEGA domains
    const isMega = targetUrl.includes("mega.nz") || targetUrl.includes("mega.io");
    if (!isMega) {
        return NextResponse.json({ error: "Unsupported provider" }, { status: 403 });
    }

    try {
        // Create a File object from the share link
        const file = File.fromURL(targetUrl);
        await file.loadAttributes();

        if (!file) {
            return NextResponse.json({ error: "Could not load MEGA file attributes" }, { status: 404 });
        }

        // Get the file content as a stream/buffer
        const data = await file.downloadBuffer({});

        // Determine content type (default to image/jpeg if not found)
        const contentType = file.name?.toLowerCase().endsWith('.png') ? 'image/png'
            : file.name?.toLowerCase().endsWith('.webp') ? 'image/webp'
                : 'image/jpeg';

        return new NextResponse(new Uint8Array(data), {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
                "Content-Disposition": "inline",
            },
        });
    } catch (error: any) {
        console.error("Mega Proxy Advanced Error:", error);
        return NextResponse.json({
            error: "Failed to fetch or decrypt MEGA image",
            message: error.message
        }, { status: 500 });
    }
}
