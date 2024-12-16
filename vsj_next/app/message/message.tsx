import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";

interface Message {
  content: string;
  sender: string;
  createdAt: Date;
  file?: string | null;
}

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  date: string;
  avatar: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Erwan",
      lastMessage: "Salut, c'est Erwan...",
      date: "Dec 12",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Erwan 02",
      lastMessage: "Salut, c'est Erwan 02...",
      date: "Nov 26",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Erwan 03",
      lastMessage: "Salut, c'est Erwan 03...",
      date: "Sept 12",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8000/api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Erreur lors du chargement des messages:", error));
  }, []);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() === "" && !uploadedFile) return;

    const newMsg: Message = {
      content: newMessage,
      sender: "NextUser",
      createdAt: new Date(),
      file: uploadedFile ? URL.createObjectURL(uploadedFile) : null,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
    setUploadedFile(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen w-screen bg-[#F7F7F7] flex justify-center items-end pb-6">
      <div className="w-[85%] h-[90%] bg-transparent flex gap-6">
        {/* Liste des contacts */}
        <div className="w-[30%] flex flex-col bg-white border-r border-gray-200 rounded-lg shadow-lg">
          <header className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Mes contacts</h1>
          </header>
          <div className="flex-1 overflow-y-auto">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border-b focus:outline-none"
            />
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h2 className="text-lg font-semibold">{contact.name}</h2>
                  <p className="text-sm text-gray-500 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
                <span className="ml-auto text-sm text-gray-400">{contact.date}</span>
              </div>
            ))}
          </div>
          <button className="m-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            + Nouveau Contact
          </button>
        </div>

        {/* Section principale */}
        <div className="w-[70%] flex flex-col bg-white rounded-lg shadow-lg">
          <header className="p-4 bg-white shadow flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="https://via.placeholder.com/40"
                alt="Erwan"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h2 className="text-lg font-bold">Erwan</h2>
                <p className="text-sm text-green-500">active</p>
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "NextUser" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow ${
                    msg.sender === "NextUser"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {msg.content && <p>{msg.content}</p>}
                  {msg.file && (
                    <Image
                      src={msg.file}
                      alt="Uploaded"
                      width={200}
                      height={200}
                      className="mt-2 w-full rounded"
                    />
                  )}
                  <small className="block mt-2 text-xs text-white">
                    {new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </div>
              </div>
            ))}
          </div>
          <footer className="p-4 bg-white shadow flex items-center space-x-3">
            <button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              📎
            </button>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez un message..."
              className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              ➤
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Chat;
