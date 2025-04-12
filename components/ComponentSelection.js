"use client";

import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import ImageConverter from "@/components/ImageConverter";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ComponentSelection = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 relative px-4 sm:px-6 md:px-8">
      {/* Page Heading */}
      <div className="w-full text-center mt-10 sm:mt-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#C68EFD] transition-all">
          {activeTab === "upload" ? "File Converter" : "Image Converter"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full mt-8 max-w-4xl">
        {activeTab === "upload" ? <UploadForm /> : <ImageConverter />}
      </div>
    </div>
  );
};

export default ComponentSelection;
