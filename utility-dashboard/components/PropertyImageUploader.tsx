"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyImageUploaderProps {
  onFileSelect: (file: File) => void; // callback to send file to parent
}

export default function PropertyImageUploader({ onFileSelect }: PropertyImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  

  const handleFile = (file: File | null) => {
    if (file) {
      setImage(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div 
    className="border border-black flex-1 min-h-[16rem] w-full bg-[#D9D9D980] rounded-xl flex items-center justify-center text-gray-500 font-bold text-center p-4"
    onDrop={handleDrop}
    onDragOver={handleDragOver}>
      <div>
        {image ? (
          <img src={image} alt="Uploaded" className="max-h-64 object-contain" />
        ) : (
          <label className="cursor-pointer flex flex-col items-center">
            <span className="text-3xl text-black">Property Image</span>
            <Image
              src="/images/propImageIcon.png"
              alt="Property Image Icon"
              width={80}
              height={80}
              className="mt-4"
            />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" onChange={handleImageChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}