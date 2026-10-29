import { NextRequest, NextResponse } from "next/server";
import { queryProperties, saveProperty, deleteProperty, getPropertyById } from "@/lib/db";

// API Response Caching & Compression Headers
const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "CDN-Cache-Control": "max-age=3600",
  "Vary": "Accept-Encoding",
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Single item O(1) indexed lookup (Zero N+1 query overhead)
    if (id) {
      const item = getPropertyById(id);
      if (!item) {
        return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, property: item }, { headers: CACHE_HEADERS });
    }

    // Paginated & indexed query
    const category = searchParams.get("category") || undefined;
    const location = searchParams.get("location") || undefined;
    const search = searchParams.get("search") || undefined;
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;

    const result = queryProperties({ category, location, search, page, limit });

    return NextResponse.json(
      {
        success: true,
        properties: result.items,
        pagination: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
        },
      },
      { headers: CACHE_HEADERS }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.category || !body.location) {
      return NextResponse.json(
        { success: false, error: "Title, category, and location are required." },
        { status: 400 }
      );
    }

    const saved = saveProperty(body);
    return NextResponse.json({ success: true, property: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "ID required." }, { status: 400 });
    }
    const deleted = deleteProperty(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
