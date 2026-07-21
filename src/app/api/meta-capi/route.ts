import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1570990667738831";
    const accessToken = process.env.META_CONVERSION_API_TOKEN;

    if (accessToken) {
      try {
        await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                event_name: body.event_name || "Lead",
                event_time: body.event_time || Math.floor(Date.now() / 1000),
                action_source: "website",
                event_source_url: body.event_source_url,
                user_data: body.user_data || {},
                custom_data: body.custom_data || {},
              },
            ],
          }),
        });
      } catch (err) {
        console.error("[meta-capi] API dispatch error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: true }); // Always return 200 to beacon calls
  }
}
