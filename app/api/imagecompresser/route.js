import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get("image");
  const quality = parseInt(formData.get("quality"), 10) || 80;

  if (!image || !quality) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const compressed = await sharp(buffer).jpeg({ quality }).toBuffer();
//   contentType = "image/jpeg";

  return new Response(compressed, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `attachment; filename="${"Compressed-",image.name}`,
    },
  });
}
