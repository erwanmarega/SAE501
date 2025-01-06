"use client";

import React, { useState, useEffect, useRef } from "react";
import SidebarMessage from "./sidebar-message";
import ContainerMessage from "./container-message";

type Person = {
  id: number;
  name: string;
  text: string;
  date: string;
  icon?: string;
};

type Message = {
  id: number;
  sender: string;
  time: string;
  text: string;
  fromMe?: boolean;
};

const MessageUpdate = () => {
  const [searchValue, setSearchValue] = useState("");
  const [text, setText] = useState(""); 
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [discussions, setDiscussions] = useState<Record<number, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/contacts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des contacts");
      }

      const data = await response.json();
      const formattedContacts = data.map((contact: any) => ({
        id: contact.id,
        name: contact.name,
        text: contact.lastMessage || "Aucun message",
      }));

      setPersons(formattedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    if (selectedDiscussion === null) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/conversation/${selectedDiscussion}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des messages: ${response.status}`);
      }

      const data = await response.json();
      const formattedMessages = data.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender,
        time: new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: msg.content,
        fromMe: msg.isSentByUser,
      }));

      setDiscussions((prev) => ({
        ...prev,
        [selectedDiscussion]: formattedMessages,
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selectedDiscussion]);

  useEffect(() => {
    if (selectedDiscussion === null) return;

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000); 
    return () => {
      clearInterval(intervalId); 
    };
  }, [selectedDiscussion]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!text.trim() || !selectedDiscussion) return;

    const newMessage: Message = {
        id: Date.now(),
        sender: "Moi",
        time: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        text: text.trim(),
        fromMe: true,
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({
                receiverId: selectedDiscussion,
                content: text.trim(),
            }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du message");
        }

        setDiscussions((prevDiscussions) => ({
            ...prevDiscussions,
            [selectedDiscussion]: [
                ...(prevDiscussions[selectedDiscussion] || []),
                newMessage,
            ],
        }));
        setText("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-4 h-[82.5vh] max-h-[575px] w-full max-w-[1500px] gap-5 mt-20">
      <SidebarMessage
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        filteredPersons={persons.filter((person) =>
          person.name.toLowerCase().includes(searchValue.toLowerCase())
        )}
        selectedDiscussion={selectedDiscussion?.toString() || ""}
        setSelectedDiscussion={setSelectedDiscussion}
      />
      <ContainerMessage
        textareaRef={textareaRef}
        text={text}
        handleTextChange={handleTextChange}
        handleSendMessage={handleSendMessage}
        isRecording={false}
        startRecording={() => {}}
        stopRecording={() => {}}
        selectedDiscussion={selectedDiscussion}
        discussions={discussions}
      />
    </div>
  );
};

export default MessageUpdate;
