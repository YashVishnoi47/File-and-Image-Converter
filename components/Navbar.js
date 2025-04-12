"use client";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import GithubIcon from "./UtilityComponents/GithubIcon";

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <header className="w-full h-16 border-b bg-white shadow-sm px-4 sm:px-6 md:px-8 flex items-center justify-between">
      <div className="left flex items-center gap-6 w-full sm:w-1/2 h-full px-4">
        {/* Logo */}
        <div className="flex items-center h-full">
          <h1 className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight">
            Tools Bucket
          </h1>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm sm:text-base font-medium px-4 py-2 transition-colors hover:text-[#C68EFD] focus:outline-none">
                Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <div className="min-w-80 h-[200px] gap-2 p-4 bg-white rounded-xl shadow-lg border border-gray-200 flex justify-center items-start">
                  <NavigationMenuLink
                    onClick={() => setActiveTab("upload")}
                    className={`text-sm text-gray-700 hover:text-white flex justify-center items-center w-36 transition-colors cursor-pointer hover:bg-[#C68EFD] ${
                      activeTab === "upload"
                        ? "bg-[#C68EFD] text-white font-bold"
                        : "bg-white text-gray-700 hover:bg-[#d1a2ff]"
                    }`}
                  >
                    Files Converter
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className={`text-sm text-gray-700 hover:text-white flex justify-center items-center w-36 transition-colors cursor-pointer hover:bg-[#C68EFD] ${
                      activeTab === "image"
                        ? "bg-[#C68EFD] text-white font-bold"
                        : "bg-white text-gray-700 hover:bg-[#d1a2ff]"
                    }`}
                    onClick={() => setActiveTab("image")}
                  >
                    Image Converter
                  </NavigationMenuLink>

                  <NavigationMenuLink className="text-sm text-gray-700 hover:text-white flex justify-center items-center w-36 transition-colors cursor-pointer hover:bg-[#C68EFD]">
                    Audio Tools
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* GitHub Link */}
      <div className="flex items-center">
        <Link
          href="https://github.com/YashVishnoi47/File-and-Image-Converter.git" // update this URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-colors duration-200"
        >
          <GithubIcon />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
