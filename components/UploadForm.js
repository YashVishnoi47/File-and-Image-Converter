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
import Loader from "./UtilityComponents/Loader";

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
    <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8">
      {/* Card Wrapper */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 mt-12">
        {/* Dropzone or File Preview */}
        {!file ? (
          <Dropzone onDrop={handleFileChange}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full px-6 py-10 sm:py-16 text-center border-2 border-dashed rounded-2xl transition-all duration-300 ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                } cursor-pointer`}
              >
                <input {...getInputProps()} />
                <div className="space-y-3">
                  <div className="text-4xl">📁</div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
                    {isDragActive
                      ? "Drop your file..."
                      : "Drag & Drop to Upload"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    or click to browse from your device
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-center px-4 py-16 bg-gray-50 rounded-2xl">
            <div className="text-5xl mb-2">✅</div>
            <p className="text-lg font-medium text-gray-700 break-words max-w-full">
              {file.name}
            </p>
            <p className="text-sm text-gray-500 mt-1">Ready for conversion</p>
          </div>
        )}

        {/* Divider */}
        <div className="w-full border-t border-gray-200 my-8" />

        {/* Conversion Options */}
        <div className="w-full max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Conversion Type
          </label>
          <Select value={converFileType} onValueChange={setConverFileType}>
            <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800">
              <SelectValue placeholder="Choose conversion" />
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

        {/* Convert Button */}
        <div className="mt-8 w-full flex justify-center">
          <button
            onClick={() => handleConvert(converFileType)}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {loading ? <Loader /> : "Convert File"}
          </button>
        </div>
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
