import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="w-full h-16 border-b bg-white shadow-sm px-4 sm:px-6 md:px-8 flex items-center justify-between">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600">File Converter</h1>
      </div>

      {/* GitHub Link */}
      <div className="flex items-center">
        <Link
          href="https://github.com/yourusername" // update this URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-colors duration-200"
        >
          <FaGithub className="text-2xl" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
