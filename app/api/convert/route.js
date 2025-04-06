import Papa from "papaparse";
import sharp from "sharp";
import { parseString } from "xml2js";
import js2xmlparser from "js2xmlparser";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const converFileType = formData.get("converFileType");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  if (converFileType === "CSV-JSON") {
    const buffer = Buffer.from(await file.arrayBuffer());

    const csvText = buffer.toString("utf-8");
    const result = Papa.parse(csvText, {
      header: true,
    });

    const jsonString = JSON.stringify(result.data, null, 2);

    return new Response(jsonString, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${file.name.replace(
          ".csv",
          ".json"
        )}"`,
      },
    });
  }

  if (converFileType === "JSON-CSV") {
    const buffer = Buffer.from(await file.arrayBuffer());

    const JSONText = buffer.toString("utf-8");
    const jsonData = JSON.parse(JSONText);

    const csvString = Papa.unparse(jsonData);

    return new Response(csvString, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${file.name.replace(
          ".json",
          ".csv"
        )}"`,
      },
    });
  }

  if (converFileType === "JSON-TXT") {
    const buffer = Buffer.from(await file.arrayBuffer());

    const JSONText = buffer.toString("utf-8");

    return new Response(JSONText, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${file.name.replace(
          ".json",
          ".txt"
        )}"`,
      },
    });
  }

  if (converFileType === "XML-JSON") {
    const buffer = Buffer.from(await file.arrayBuffer());

    const XMLText = buffer.toString("utf-8");
    const result = parseString(XMLText, (err, result) => {
      if (err) {
        throw new Error("Error parsing XML to JSON");
      }
      return JSON.stringify(result, null, 2);
    });

    return new Response(result, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${file.name.replace(
          ".xml",
          ".json"
        )}"`,
      },
    });
  }

  if (converFileType === "JSON-XML") {
    const buffer = Buffer.from(await file.arrayBuffer());

    const JSONText = buffer.toString("utf-8");
    const result = js2xmlparser.parse("root", JSON.parse(JSONText));

    return new Response(result, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${file.name.replace(
          ".json",
          ".xml"
        )}"`,
      },
    });
  }

  
}
