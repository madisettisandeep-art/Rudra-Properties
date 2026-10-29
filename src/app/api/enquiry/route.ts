import { NextRequest, NextResponse } from "next/server";
import { getEnquiries, saveEnquiry, updateEnquiryStatus, deleteEnquiry } from "@/lib/db";

export async function GET() {
  try {
    const list = getEnquiries();
    return NextResponse.json(
      { success: true, enquiries: list },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: "Privacy consent is required." },
        { status: 400 }
      );
    }

    const record = saveEnquiry({
      name: String(body.name).slice(0, 100),
      phone: String(body.phone).slice(0, 50),
      email: body.email ? String(body.email).slice(0, 100) : undefined,
      enquiryType: String(body.enquiryType || "General Enquiry"),
      budget: body.budget ? String(body.budget) : undefined,
      location: body.location ? String(body.location).slice(0, 100) : undefined,
      message: body.message ? String(body.message).slice(0, 1000) : undefined,
      consent: Boolean(body.consent),
      source: body.source ? String(body.source) : "Website Contact Form",
    });

    return NextResponse.json({ success: true, enquiry: record });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id || !body.status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required." },
        { status: 400 }
      );
    }

    const updated = updateEnquiryStatus(body.id, body.status);
    return NextResponse.json({ success: updated });
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
    const deleted = deleteEnquiry(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

