"use client";

import Link from "next/link";
import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
// import GithubIcon from "./UtilityComponents/GithubIcon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = ({ activeTab, setActiveTab, theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`w-full shadow-sm px-4 sm:px-6 md:px-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between h-16 w-full">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 sm:gap-8">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#9D3CFF]">
            Tools Bucket
          </h1>

          {/* Desktop Tools Menu */}
          <div className="hidden sm:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm sm:text-base text-black font-medium px-3 py-2">
                    Tools
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-white flex justify-center items-center rounded-xl">
                    <div className="p-2 flex sm:flex-wrap justify-start items-center flex-col sm:flex-row gap-2 w-72 sm:w-[500px]">
                      <NavigationMenuLink
                        onClick={() => setActiveTab("upload")}
                        className={`w-full sm:w-36 flex justify-center items-center text-sm px-4 py-2 rounded-md text-center transition-all cursor-pointer ${
                          activeTab === "upload"
                            ? "bg-[#C68EFD] text-white font-semibold"
                            : "bg-white text-gray-800 hover:bg-[#e5d0ff]"
                        }`}
                      >
                        Files Converter
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        onClick={() => setActiveTab("image")}
                        className={`w-full sm:w-36 flex justify-center items-center text-sm px-4 py-2 rounded-md text-center transition-all cursor-pointer ${
                          activeTab === "image"
                            ? "bg-[#C68EFD] text-white font-semibold"
                            : "bg-white text-gray-800 hover:bg-[#e5d0ff]"
                        }`}
                      >
                        Image Converter
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        onClick={() => {
                          setActiveTab("PdfConverter");
                          setIsMenuOpen(false);
                        }}
                        className={`w-full sm:w-36 flex justify-center items-center text-sm px-4 py-2 rounded-md text-center transition-all cursor-pointer ${
                          activeTab === "pdfcreator"
                            ? "bg-[#C68EFD] text-white font-semibold"
                            : "bg-white text-gray-800 hover:bg-[#e5d0ff]"
                        }`}
                      >
                        PDF Creater
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        onClick={() => {
                          setActiveTab("ImageSizeReducer");
                          setIsMenuOpen(false);
                        }}
                        className={`w-full sm:w-36 flex justify-center items-center text-sm px-4 py-2 rounded-md text-center transition-all cursor-pointer ${
                          activeTab === "ImageSizeReducer"
                            ? "bg-[#C68EFD] text-white font-semibold"
                            : "bg-white text-gray-800 hover:bg-[#e5d0ff]"
                        }`}
                      >
                        Image Compressor
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Desktop Right */}
        <div className="hidden sm:flex items-center gap-6 ml-auto">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Theme"
            className={`text-2xl transition-colors ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            <MdDarkMode />
          </button>
          <Link
            href="https://github.com/YashVishnoi47/File-and-Image-Converter.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl"
            aria-label="GitHub"
          >
            <FaGithub className="hover:scale-110 text-2xl transition-scale duration-200" />
            {/* <GithubIcon className="hover:scale-110 transition-transform" /> */}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-4 ml-auto">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Theme"
            className="text-2xl"
          >
            <MdDarkMode />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="text-2xl"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab("upload");
                setIsMenuOpen(false);
              }}
              className={`text-sm px-4 py-2 rounded-md text-left ${
                activeTab === "upload"
                  ? "bg-[#C68EFD] text-white font-semibold"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Files Converter
            </button>
            <button
              onClick={() => {
                setActiveTab("image");
                setIsMenuOpen(false);
              }}
              className={`text-sm px-4 py-2 rounded-md text-left ${
                activeTab === "image"
                  ? "bg-[#C68EFD] text-white font-semibold"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Image Converter
            </button>

            <button
              onClick={() => {
                setActiveTab("PdfConverter");
                setIsMenuOpen(false);
              }}
              className={`text-sm px-4 py-2 rounded-md text-left ${
                activeTab === "PdfConverter"
                  ? "bg-[#C68EFD] text-white font-semibold"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              PDF creater
            </button>
          </div>

          <Link
            href="https://github.com/YashVishnoi47/File-and-Image-Converter.git"
            target="_blank"
            className="flex items-center gap-2 text-sm px-4"
          >
            <FaGithub className="hover:scale-110 text-2xl transition-scale duration-200" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
