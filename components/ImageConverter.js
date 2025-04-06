"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageConverter = () => {
  const [image, setImage] = useState(null);
  const [convertImageType, setConvertImageType] = useState("JSON-XML");
  const [loading, setLoading] = useState(false);

  //   function for selecting uploaded image.
  const handleFileChange = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setImage(selectedFile);
  };

  //   function for sending image to the api and fetching the converted image.
  const handleConvert = async (e) => {
    if (!image) return alert("Please upload a image first");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("convertImageType", convertImageType);

    const response = await fetch("/api/imageConverter", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setLoading(false);
      return alert("Error converting image");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;

    const ext = convertImageType === "png-jpeg" ? "jpg" : "png";

    a.download = `${image.name}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setLoading(false);
  };
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center w-[95%] max-w-3xl mx-auto border-2 border-gray-300 rounded-2xl p-4 sm:p-6 md:p-8 bg-white shadow-md">
      {!image ? (
        <Dropzone onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section className="w-full">
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] w-full rounded-xl transition-all duration-200 border-2 border-dashed ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                } cursor-pointer px-4 py-8 sm:py-12`}
              >
                <input {...getInputProps()} />
                <div className="text-center space-y-2 sm:space-y-3">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-700">
                    {isDragActive
                      ? "Drop the Picture here..."
                      : "Upload your Picture to convert"}
                  </p>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Drag & drop a Picture here, or click to browse
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] w-full text-center px-4">
          <p className="text-base sm:text-lg text-gray-700 font-medium break-words max-w-full">
            📄 {image.name}
          </p>
          <p className="text-sm text-gray-500 mt-2">File ready to convert</p>
        </div>
      )}

      {/* Select conversion type */}
      <div className="mt-6 w-full max-w-sm ">
        <Select value={convertImageType} onValueChange={setConvertImageType}>
          <SelectTrigger className="w-full text-black">
            <p1>Select image conversion type </p1>
            <SelectValue placeholder="Select conversion type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={"uppercase"} value="jpeg-png">
              jpeg → png
            </SelectItem>
            <SelectItem className={"uppercase"} value="png-jpeg">
              png → jpeg
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Convert button */}
      <div className="mt-6 w-full flex justify-center">
        <button
          onClick={() => handleConvert(convertImageType)}
          disabled={loading}
          className={`w-full sm:w-auto px-5 py-2 rounded-xl font-semibold transition-colors duration-200 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      </div>
    </div>
  );
};

export default ImageConverter;
