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
      {/* Next Update Floating Button */}
      {/* <Dialog>
        <DialogTrigger asChild>
          <button className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-red-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-red-700 transition-colors text-sm font-semibold">
            🔥 NEXT UPDATE
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Next Update: April 5, 2025
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm text-gray-600">
              <p className="mb-2">Here’s what’s coming in the next release:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Dark and light theme support</li>
                <li>Enhanced UI and improved user experience</li>
                <li>Support for additional file formats</li>
                <li>Expanded compatibility with more image types</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}

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
