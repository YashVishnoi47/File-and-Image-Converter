"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Loader from "./UtilityComponents/Loader";

const PdfConverter = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("No files selected.");

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    setLoading(true);

    try {
      const res = await fetch("/api/pdftools", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "converted.pdf";
      a.click();
    } catch (error) {
      alert("Error converting files. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8">
      <div
        className={`w-full max-w-3xl rounded-3xl shadow-2xl border p-6 sm:p-10 mt-2 ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-600 shadow-[0_10px_20px_rgba(255,255,255,_0.2)]"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        {files.length === 0 ? (
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full px-6 py-10 sm:py-16 text-center border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer shadow-xl ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : theme === "dark"
                    ? "bg-white/10 border-gray-400"
                    : "bg-white border-gray-300"
                }`}
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "16px",
                }}
              >
                <input {...getInputProps()} />
                <div className="space-y-3">
                  <div className="text-4xl">📁</div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {isDragActive
                      ? "Drop your files..."
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
          <div className="flex flex-col items-center justify-center w-full text-center px-4 py-16 bg-gray-50 dark:bg-white/10 rounded-2xl">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-lg font-medium mb-2">
              Files Ready for Conversion
            </p>
            <ul className="text-sm max-h-40 overflow-y-auto w-full max-w-md mx-auto text-left">
              {files.map((file, idx) => (
                <li key={idx} className="truncate">
                  📄 {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        <div className="w-full border-t border-gray-200 dark:border-gray-600 my-8" />

        {/* Convert Button */}
        <div className="mt-4 w-full flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading || files.length === 0}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              loading || files.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#9d3cff] hover:bg-[#bc78ff] text-white"
            }`}
          >
            {loading ? <Loader /> : "Convert to PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfConverter;
