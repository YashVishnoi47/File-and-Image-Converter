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
  const [theme, setTheme] = useState("light");

  return (
    <div className="w-full h-full">
      <Navbar
        theme={theme}
        setTheme={setTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ComponentSelection
        theme={theme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
    </div>
  );
}
