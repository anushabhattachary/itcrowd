import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Google Apps Script Web App URL — writes directly to the Google Sheet
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxOJubT5fXEf32LuDcI9OU4NiR3a5bPqikxRZ5g47hhNA7WZthlb8GZ7tOqY0qzP3qZDw/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      name:         body.name         ?? "",
      companyName:  body.companyName  ?? "",
      timeToMarket: body.timeToMarket ?? "",
      hasWebsite:   body.hasWebsite   ?? "",
      websiteLink:  body.hasWebsite === "Yes" ? (body.websiteLink ?? "") : "",
      targetNiche:  body.targetNiche  ?? "",
      brandRep:     body.brandRep     ?? "",
      budget:       body.budget       ?? "",
      deliverable:  body.deliverable  ?? "",
      goal:         body.goal         ?? "",
    };

    // Dual-write into Supabase intake (admins review + convert into accounts).
    // Non-fatal: a failure here must not break the existing Sheets flow.
    try {
      const supabase = await createClient();
      await supabase.from("business_interest_submissions").insert({
        name: payload.name,
        company_name: payload.companyName,
        time_to_market: payload.timeToMarket,
        has_website: payload.hasWebsite,
        website_link: payload.websiteLink,
        target_niche: payload.targetNiche,
        brand_rep: payload.brandRep,
        budget: payload.budget,
        deliverable: payload.deliverable,
        goal: payload.goal,
      });
    } catch (dbErr) {
      console.error("[submit-business-interest] Supabase insert failed:", dbErr);
    }

    // Apps Script returns a 302 redirect to the actual response.
    // We must NOT auto-follow redirects — instead we follow manually
    // so we can read the JSON from the redirected URL.
    const firstRes = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "manual", // Don't auto-follow — 302 would lose the body
    });

    // Follow the redirect manually (GET the echo URL)
    const redirectUrl =
      firstRes.headers.get("location") ?? "";

    if (!redirectUrl) {
      // If no redirect, try reading the body directly
      const text = await firstRes.text();
      console.log("[submit-business-interest] Direct response:", text);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const echoRes = await fetch(redirectUrl);
    const result  = await echoRes.json();

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.error("[submit-business-interest] Apps Script error:", result.error);
    return NextResponse.json(
      { success: false, error: result.error ?? "Unknown error from Apps Script" },
      { status: 500 }
    );
  } catch (error) {
    console.error("[submit-business-interest] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
