"use client";
import Link from "next/link";
import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import GithubIcon from "./UtilityComponents/GithubIcon";
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
        theme === "dark" ? "bg-gray-900" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between h-16 w-full flex-wrap sm:flex-nowrap">
        {/* Left side: Logo & Tools */}
        <div className="flex items-center gap-8 w-full sm:w-auto">
          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#9D3CFF]">
            Tools Bucket
          </h1>

          {/* Tools Menu (Dropdown) */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm sm:text-base font-medium px-3 py-2">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg border border-gray-200 rounded-xl mt-2">
                  <div className="p-4 flex flex-col sm:flex-row gap-2 w-72 sm:w-auto">
                    <NavigationMenuLink
                      onClick={() => setActiveTab("upload")}
                      className={`w-full sm:w-36 text-sm px-4 py-2 rounded-md text-center transition-all cursor-pointer ${
                        activeTab === "upload"
                          ? "bg-[#C68EFD] text-white font-semibold"
                          : "bg-white text-gray-800 hover:bg-[#e5d0ff]"
                      }`}
                    >
                      Files Converter
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      onClick={() => setActiveTab("image")}
                      className={`w-full sm:w-36 text-sm px-4 py-2 rounded-md text-center transition-all cursor-pointer ${
                        activeTab === "image"
                          ? "bg-[#C68EFD] text-white font-semibold"
                          : "bg-white text-gray-800 hover:bg-[#e5d0ff]"
                      }`}
                    >
                      Image Converter
                    </NavigationMenuLink>
                    <NavigationMenuLink className="relative w-full sm:w-36 px-4 py-2 text-sm bg-white text-gray-700 cursor-not-allowed rounded-md flex justify-center items-center gap-2">
                      PDF Creator
                      <span className="text-xs bg-yellow-400 text-black font-semibold px-2 py-0.5 rounded-md">
                        Coming Soon
                      </span>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile menu toggle */}
        <div className="sm:hidden flex items-center gap-4 mt-2 w-full justify-between">
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

        {/* Right side: Dark mode & GitHub (Desktop Only) */}
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
            <GithubIcon className="hover:scale-110 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden w-full flex flex-col gap-2 py-4">
          <Link
            href="https://github.com/YashVishnoi47/File-and-Image-Converter.git"
            target="_blank"
            className="flex items-center gap-2 text-sm"
          >
            <GithubIcon className="text-lg" />
            GitHub
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
