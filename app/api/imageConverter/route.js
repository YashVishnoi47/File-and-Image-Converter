import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get("image");
  const converFileType = formData.get("convertImageType");

  const buffer = Buffer.from(await image.arrayBuffer());

  let convertedBuffer;
  let contentType;
  let newExtension;

  if (converFileType === "png-jpeg") {
    convertedBuffer = await sharp(buffer).jpeg().toBuffer();
    contentType = "image/jpeg";
    newExtension = "jpg";
  }

  if (converFileType === "jpeg-png") {
    convertedBuffer = await sharp(buffer).png().toBuffer();
    contentType = "image/png";
    newExtension = "png";
  }

  return new Response(convertedBuffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${image.name.replace(
        /\.\w+$/,
        ""
      )}.${newExtension}"`,
    },
  });
}
