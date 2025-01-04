"use client";

import React, { useState, useRef } from "react";
import SidebarMessage from "./sidebar-message";
import ContainerMessage from "./container-message";

// Type pour la liste de personnes
type Person = {
  id: number;
  name: string;
  text: string;
  date: string;
  icon?: string;
};

// Type pour la liste de messages
type Message = {
  id: number;
  sender: string;
  time: string;
  text: string;
  fromMe?: boolean; // booléen pour savoir si c'est "moi"
};

const MessageUpdate = () => {
  const [searchValue, setSearchValue] = useState("");
  const [text, setText] = useState(""); // État pour le contenu du textarea
  const [textareaHeight, setTextareaHeight] = useState("auto"); // Hauteur dynamique
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ton tableau de personnes (exemple)
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
      {
        id: 3,
        sender: "Moi",
        time: "03:18",
        text: "Ceci est un nouveau message",
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

  // Filtre les personnes en fonction de la recherche
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
      textareaRef.current.style.height = "auto"; // Réinitialise pour recalculer
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  };

  // Fonction pour envoyer le message
  const handleSendMessage = () => {
    if (!text.trim()) return; // Si le message est vide, on ne fait rien

    const newMessage: Message = {
      id: Date.now(), // ID unique basé sur le timestamp
      sender: "Moi",
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: text.trim(),
      fromMe: true,
    };

    // Met à jour l'état "discussions" pour la discussion sélectionnée
    setDiscussions((prevDiscussions) => ({
      ...prevDiscussions,
      [selectedDiscussion]: [
        ...prevDiscussions[selectedDiscussion],
        newMessage,
      ],
    }));

    // Vide le champ de texte
    setText("");

    // Réinitialise la hauteur du textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // API Voice
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Fonction pour démarrer l'enregistrement
  const startRecording = async () => {
    setTranscription("");
    setIsRecording(true);
    audioChunksRef.current = [];

    // Demander l'autorisation d'utiliser le micro
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Créer une instance de MediaRecorder
    const mediaRecorder = new MediaRecorder(stream);

    // Dès qu’on reçoit des données audio, on les empile dans audioChunksRef
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    // Lorsqu’on arrête l’enregistrement
    mediaRecorder.onstop = async () => {
      // Construire un blob à partir des chunks
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/ogg; codecs=opus",
      });

      // Option 1 : Convertir en Base64 (pour l’envoyer dans req.body)
      const base64Audio = await blobToBase64(audioBlob);

      // Appel à l'API Next.js
      try {
        const response = await fetch("../../public/assets/api/transcribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ audio: base64Audio.split("base64,")[1] }),
        });
        const data = await response.json();
        if (data.transcription) {
          setTranscription(data.transcription);
          setText(data.transcription); // Ajout de cette ligne pour mettre à jour le textarea
        } else {
          console.error("Erreur lors de la transcription", data);
        }
      } catch (err) {
        console.error("Erreur fetch:", err);
      }
    };

    // Lancer l’enregistrement
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
  };

  // Fonction pour arrêter l'enregistrement
  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // Convertir Blob en Base64
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
        selectedDiscussion={selectedDiscussion}
        setSelectedDiscussion={setSelectedDiscussion}
      />

      <ContainerMessage
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
