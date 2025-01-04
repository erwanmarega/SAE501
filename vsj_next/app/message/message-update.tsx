"use client";

import React, { useState, useRef } from "react";
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

  const persons: Person[] = [
    {
      id: 1,
      name: "Erwan",
      text: "Salut, c’est Erwan, je suis pas le meilleur...",
      date: "Dec 12",
      icon: "1",
    },
    {
      id: 2,
      name: "Alice",
      text: "Hello, je suis Alice, enchantée de vous rencontrer !",
      date: "Dec 13",
      icon: "1",
    },
    {
      id: 3,
      name: "Bob",
      text: "Salut, moi c’est Bob, j'adore coder en Next.js !",
      date: "Dec 14",
      icon: "2",
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Erwan",
      time: "03:16",
      text: `Je suis anglais les jours off, j’essaye un peu de show off 
             pour montrer ma supériorité c’est comme ça, je suis 
             meilleur et je le dis. Malheureusement y’a encore des pauvres 
             mais c’est comme ça, on va créer une île pour rester 
             entre personnes dignes.`,
      fromMe: false,
    },
    {
      id: 2,
      sender: "Moi",
      time: "03:18",
      text: "Et voilà comment on fait pour répondre…",
      fromMe: true,
    },
    {
      id: 3,
      sender: "Erwan",
      time: "03:20",
      text: "T’as vu ça ? La classe hein !",
      fromMe: false,
    },
  ]);

  const [selectedDiscussion, setSelectedDiscussion] = useState("Erwan");
  const [discussions, setDiscussions] = useState<Record<string, Message[]>>({
    Erwan: [
      {
        id: 1,
        sender: "Erwan",
        time: "03:16",
        text: "Message de Erwan",
        fromMe: false,
      },
      {
        id: 2,
        sender: "Moi",
        time: "03:18",
        text: "Réponse à Erwan",
        fromMe: true,
      },
    ],
    Alice: [
      {
        id: 1,
        sender: "Alice",
        time: "03:16",
        text: "Message de Alice",
        fromMe: false,
      },
    ],
    Bob: [
      {
        id: 1,
        sender: "Bob",
        time: "03:16",
        text: "Message de Bob",
        fromMe: false,
      },
    ],
  });

  const filteredPersons = persons.filter((person) => {
    const lowerSearch = searchValue.toLowerCase();
    return (
      person.name.toLowerCase().includes(lowerSearch) ||
      person.text.toLowerCase().includes(lowerSearch)
    );
  });

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

  const handleSendMessage = () => {
    if (!text.trim()) return; 

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

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setTranscription("");
    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/ogg; codecs=opus",
      });

      const base64Audio = await blobToBase64(audioBlob);

      try {
        const response = await fetch("../api/transcribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ audio: base64Audio.split("base64,")[1] }),
        });
        const data = await response.json();
        if (data.transcription) {
          setTranscription(data.transcription);
          setText(data.transcription); 
        } else {
          console.error("Erreur lors de la transcription", data);
        }
      } catch (err) {
        console.error("Erreur fetch:", err);
      }
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="grid grid-cols-4 h-[82.5vh] max-h-[575px] w-full max-w-[1500px] gap-5 mt-20">
      <SidebarMessage
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        filteredPersons={filteredPersons}
      />

      <ContainerMessage
        messages={messages}
        textareaRef={textareaRef}
        text={text}
        handleTextChange={handleTextChange}
        handleSendMessage={handleSendMessage}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        selectedDiscussion={selectedDiscussion}
        discussions={discussions}
      />
    </div>
  );
};

export default MessageUpdate;
