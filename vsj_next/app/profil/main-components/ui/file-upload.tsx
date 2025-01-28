import React, { useState } from "react";

interface FileItem {
  file: File;
  preview: string;
}

const FileUpload = () => {
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
    <div className="max-w-lg mx-auto">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition duration-300"
      >
        <p className="text-gray-500 mb-2">
          Glissez-déposez vos fichiers ici ou cliquez pour en ajouter.
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          id="fileInput"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Ajouter des fichiers
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-4">
        {files.map((fileItem, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-2"
          >
            {fileItem.file.type.startsWith("image/") ? (
              <img
                src={fileItem.preview}
                alt={fileItem.file.name}
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-300 text-gray-600 rounded">
                PDF
              </div>
            )}
            <div className="flex-1 ml-4">
              <p className="text-gray-800 text-sm">{fileItem.file.name}</p>
              <p className="text-gray-500 text-xs">
                {(fileItem.file.size / 1024 / 1024).toFixed(2)} Mo
              </p>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
