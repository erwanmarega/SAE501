"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import H3 from "../components/ui/texts/h3";

type Message = {
  id: number;
  sender: string;
  time: string;
  text: string;
  fromMe?: boolean;
};

interface User {
  prenom: string;
  nom: string;
}

interface ContainerMessageProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  text: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  selectedDiscussion: string | number | null;
  discussions: Record<number, Message[]>;
}

const ContainerMessage = ({
  textareaRef,
  text,
  handleTextChange,
  handleSendMessage,
  isRecording,
  startRecording,
  stopRecording,
  selectedDiscussion,
  discussions,
}: ContainerMessageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const messages = discussions[Number(selectedDiscussion)] || [];

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!selectedDiscussion) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/conversation/${selectedDiscussion}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations de l'utilisateur");
        }

        const data = await response.json();

        setUser({
          prenom: data[0]?.receiverPrenom || data[0]?.senderPrenom,
          nom: data[0]?.receiverNom || data[0]?.senderNom,
        });
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchUserInfo();
  }, [selectedDiscussion]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="col-span-3 flex flex-col h-full border rounded-lg overflow-hidden bg-white">
      <header className="flex items-center justify-between p-4 border-b bg-gray-100">
        <H3 className="text-lg font-semibold">
          {user
            ? ` ${user.prenom} ${user.nom}`
            : selectedDiscussion
            ? "Chargement des informations..."
            : "Aucune discussion sélectionnée"}
        </H3>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.fromMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.fromMe
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {message.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Aucun message dans cette conversation.
          </p>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="flex items-center p-4 border-t bg-white gap-2">
        <TextareaAutosize
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Écrivez un message..."
          className="flex-1 p-2 border rounded-lg resize-none overflow-hidden"
          minRows={1}
          maxRows={5}
        />

        <button
          onClick={handleSendMessage}
          disabled={!text.trim()}
          className={`p-2 rounded-lg ${
            text.trim() ? "bg-blue-500" : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          <Image
            src="/assets/icons/send.svg"
            alt="Envoyer"
            width={24}
            height={24}
          />
        </button>
      </footer>
    </div>
  );
};

export default ContainerMessage;
