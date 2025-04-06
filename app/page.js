"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import ImageConverter from "@/components/ImageConverter";

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");
  // const [activeTab, setActiveTab] = useState(second)

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <Navbar />

      {/* Toggle Buttons */}
      <div className="flex justify-center mt-6 space-x-4 w-full px-4 sm:px-6 md:px-8">
        <button
          onClick={() => setActiveTab("upload")}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === "upload"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          File Converter
        </button>

        <button
          onClick={() => setActiveTab("image")}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === "image"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          Image Converter
        </button>
      </div>

      {/* Dynamic Section Rendering */}
      <div className="w-full px-4 sm:px-6 md:px-8 mt-6">
        {activeTab === "upload" ? <UploadForm /> : <ImageConverter />}
      </div>
    </div>
  );
}
