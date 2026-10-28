import { NextRequest, NextResponse } from "next/server";
import { getProperties, saveProperty, deleteProperty } from "@/lib/db";

export async function GET() {
  try {
    const list = getProperties();
    return NextResponse.json({ success: true, properties: list });
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

