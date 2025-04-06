"use client";
import { useState } from "react";
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");
  // const [activeTab, setActiveTab] = useState(second)

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <Dialog>
        <DialogTrigger asChild>
          <button className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors">
            🔥 NEXT UPDATE
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Next Update: April 5, 2025</DialogTitle>
            <DialogDescription className="space-y-2 mt-2">
              <div>Here’s what’s coming in the next release:</div>
              <div className="list-disc list-inside text-sm text-gray-600">
                <div>1. Dark and light theme support</div>
                <div>2. Enhanced UI and improved user experience</div>
                <div>3. Support for additional file formats</div>
                <div>4. Expanded compatibility with more image types</div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
