import { NextRequest, NextResponse } from "next/server";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe2rvJoIqMfXwnb0OPJUi6LMO0Z69CaM5zfmeYT-4ZxrBEpwA/formResponse";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const formData = new URLSearchParams();
    formData.append("entry.711067904", body.name ?? "");
    formData.append("entry.573063937", body.companyName ?? "");
    formData.append("entry.916226803", body.timeToMarket ?? "");
    formData.append("entry.1524423916", body.hasWebsite ?? "");
    if (body.hasWebsite === "Yes") {
      formData.append("entry.1475748518", body.websiteLink ?? "");
    }
    formData.append("entry.112368477", body.targetNiche ?? "");
    formData.append("entry.785964323", body.brandRep ?? "");
    formData.append("entry.36609408", body.budget ?? "");
    formData.append("entry.1500590143", body.deliverable ?? "");
    formData.append("entry.369205800", body.goal ?? "");

    // Server-side fetch — no CORS restrictions
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    // Google Forms redirects on success (status 200 or 302).
    // Any non-5xx response is treated as success.
    if (response.ok || response.status === 302 || response.redirected) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: `Google Forms returned status ${response.status}` },
      { status: 500 }
    );
  } catch (error) {
    console.error("Startup interest form submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
