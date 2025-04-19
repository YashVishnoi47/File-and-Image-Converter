import { PDFDocument } from "pdf-lib";
import { NextResponse, NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  const formData = await req.formData();
  const files = formData.getAll("file");

  if (files.length <= 0) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const imageBytes = new Uint8Array(arrayBuffer);
    const fileType = file.type;

    let image, page;

    if (fileType === "image/jpeg") {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (fileType === "image/png") {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      console.error(`Only PNG and JPG File types are Supported. ${fileType}`);
      // Optionally, you can handle unsupported file types here
      continue; // skip unsupported file types
    }

    page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="converted.pdf"',
      // "Content-Length": pdfBytes.length.toString(),
    },
  });
};
