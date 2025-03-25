import React, { useState, useEffect, ChangeEvent, KeyboardEvent, useRef } from "react";
import Image from "next/image";

interface Message {
  content: string;
  sender: string;
  createdAt: string;
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
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/messages/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Erreur lors du chargement des contacts:", error));
  }, []);

  useEffect(() => {
    if (activeContact) {
      fetch(`http://localhost:8000/api/messages?contactId=${activeContact.id}`)
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error("Erreur lors du chargement des messages:", error));
    }
  }, [activeContact]);

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
      createdAt: new Date().toISOString(),
      file: uploadedFile ? URL.createObjectURL(uploadedFile) : null,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
    setUploadedFile(null);

    fetch("http://localhost:8000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newMessage,
        senderEmail: "NextUser", 
        contactId: activeContact?.id,
      }),
    }).catch((error) => console.error("Erreur lors de l'envoi du message:", error));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return ""; 
    }

    const date = new Date(dateString); 
    if (isNaN(date.getTime())) {
      return "Heure invalide"; 
    }

    return date.toLocaleString("fr-FR", {
      weekday: "short", 
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="h-screen w-screen bg-[#F7F7F7] flex justify-center items-start pt-12">
      <div className="w-[85%] h-[85%] bg-transparent flex gap-6">
        {}
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
                onClick={() => setActiveContact(contact)}
                className={`flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer ${
                  activeContact?.id === contact.id ? "bg-gray-100" : ""
                }`}
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
                    {contact.lastMessage || "Aucun message"}
                  </p>
                </div>
                <span className="ml-auto text-sm text-gray-400">
                  {new Date(contact.date).toLocaleDateString("fr-FR", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
          <button className="m-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            + Nouveau Contact
          </button>
        </div>

        <div className="w-[70%] flex flex-col bg-white rounded-lg shadow-lg">
          {activeContact ? (
            <>
              <header className="p-4 bg-white shadow flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={activeContact.avatar}
                    alt={activeContact.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h2 className="text-lg font-bold">{activeContact.name}</h2>
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
                      <small className="block mt-2 text-xs text-gray-400">
                        {formatDate(msg.createdAt)} {}
                      </small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
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
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-gray-500">Sélectionnez un contact pour commencer une discussion.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
