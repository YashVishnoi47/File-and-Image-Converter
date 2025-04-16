"use client";

import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import ImageConverter from "@/components/ImageConverter";
import PdfConverter from "./PdfConverter";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ComponentSelection = ({ activeTab, setActiveTab, theme }) => {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-200 ease-in-out min-h-screen bg-gray-50 relative px-4 sm:px-6 md:px-8 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Page Heading */}
      <div className="w-full text-center mt-10 sm:mt-4">
        <h1
          className={`text-3xl sm:text-4xl font-extrabold  transition-all ${
            theme === "dark" ? "text-[#9D3CFF]" : "  text-[#C68EFD]"
          }`}
        >
          {activeTab === "upload"
            ? "File Converter"
            : activeTab === "image"
            ? "Image Converter"
            : "PDF Creator"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full mt-8 max-w-4xl">
        {activeTab === "upload" ? (
          <UploadForm theme={theme} />
        ) : activeTab === "image" ? (
          <ImageConverter theme={theme} />
        ) : (
          <PdfConverter />
        )}
      </div>
    </div>
  );
};

export default ComponentSelection;
