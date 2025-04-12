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
import ComponentSelection from "@/components/ComponentSelection";

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="w-full h-full">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ComponentSelection activeTab={activeTab} setActiveTab={setActiveTab} />;
    </div>
  );
}
