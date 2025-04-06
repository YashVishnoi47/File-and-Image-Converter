"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [converFileType, setConverFileType] = useState("JSON-XML");
  const [loading, setLoading] = useState(false);

  //   function for selecting uploaded file.
  const handleFileChange = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
  };

  //   function for sending file to the api and fetching the converted file.
  const handleConvert = async (e) => {
    if (!file) return alert("Please upload a file first");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("converFileType", converFileType);

    const response = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setLoading(false);
      return alert("Error converting file");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;

    const ext =
      converFileType === "JSON-CSV"
        ? "csv"
        : converFileType === "CSV-JSON"
        ? "json"
        : converFileType === "JSON-XML"
        ? "xml"
        : converFileType === "XML-JSON"
        ? "json"
        : converFileType === "JSON-TXT"
        ? "txt"
        : converFileType === "png"
        ? "png"
        : "jpg";

    a.download = `${file.name}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center w-[95%] max-w-3xl mx-auto border-2 border-gray-300 rounded-2xl  p-4 sm:p-6 md:p-8 bg-white shadow-md">
      {!file ? (
        <Dropzone onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section className="w-full">
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] w-full rounded-xl transition-all duration-200 border-2 border-dashed ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                } cursor-pointer px-4 py-8 sm:py-12`}
              >
                <input {...getInputProps()} />
                <div className="text-center space-y-2 sm:space-y-3">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-700">
                    {isDragActive
                      ? "Drop the file here..."
                      : "Upload your file to convert"}
                  </p>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Drag & drop a file here, or click to browse
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] w-full text-center px-4">
          <p className="text-base sm:text-lg text-gray-700 font-medium break-words max-w-full">
            📄 {file.name}
          </p>
          <p className="text-sm text-gray-500 mt-2">File ready to convert</p>
        </div>
      )}

      {/* Select conversion type */}
      <div className="mt-6 w-full max-w-sm ">
        <Select value={converFileType} onValueChange={setConverFileType}>
          <SelectTrigger className="w-full text-black">
            <p1>Select file conversion type  </p1>
            <SelectValue placeholder="Select conversion type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="csv-json">CSV → JSON</SelectItem>
            <SelectItem value="json-csv">JSON → CSV</SelectItem>
            <SelectItem value="json-txt">JSON → TXT</SelectItem>
            <SelectItem value="xml-json">XML → JSON</SelectItem>
            <SelectItem value="json-xml">JSON → XML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Convert button */}
      <div className="mt-6 w-full flex justify-center">
        <button
          onClick={() => handleConvert(conversionType)}
          disabled={loading}
          className={`w-full sm:w-auto px-5 py-2 rounded-xl font-semibold transition-colors duration-200 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      </div>
    </div>
  );
};

export default UploadForm;

{
  /* <input
        type="file"
        onChange={handleFileChange}
        className="w-full border-2 h-[90%]"
      /> */
}
