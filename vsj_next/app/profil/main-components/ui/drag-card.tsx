"use client";
import React, { useState } from "react";

interface FileItem {
  file: File;
  preview: string;
}

const DragCard = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 25 * 1024 * 1024;
  const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"];

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;

    const newFiles: FileItem[] = [];
    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];

      
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Seuls les fichiers PDF, PNG ou JPG sont autorisés.");
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("La taille maximale autorisée est de 5 Mo.");
        continue;
      }

      const preview = URL.createObjectURL(file);
      newFiles.push({ file, preview });
    }

    setError(null); 
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <div
        className="bg-[#f7f7f7] rounded-xl border-dashed border-[#C9C9C9] border-[1px] h-5/6 relative cursor-pointer hover:bg-gray-100"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          id="fileInput"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <section className="m-auto text-center absolute bottom-4 left-[25%]">
          <p className="font-outfit font-semibold text-xs">
            <span className="text-primary ">Click to upload</span> or drag and
            drop
          </p>
          <p className="font-outfit text-5xs">FORMAT PDF</p>
        </section>
      </div>
    </>
  );
};

export default DragCard;
