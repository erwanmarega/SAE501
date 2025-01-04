import React from "react";
import Card from "../components/ui/card";
import Profil from "../components/profil/profil";
import H4 from "../components/ui/texts/h4";
import Image from "next/image";
import MessageCard from "./message-card";

interface ContainerMessageProps {
  messages: Message[];
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  text: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  selectedDiscussion: string;
}

const ContainerMessage: React.FC<ContainerMessageProps> = ({
  messages,
  textareaRef,
  text,
  handleTextChange,
  handleSendMessage,
  isRecording,
  startRecording,
  stopRecording,
  selectedDiscussion,
  discussions,
}) => {
  return (
    <Card className="col-start-2 col-end-5 w-full h-full grid-rows-[50px_1fr_50px]">
      {/* En-tête de la conversation */}
      <header className="flex justify-between p-2 border-b-2 border-[#EBEBEB]">
        <div className="flex gap-2">
          <Profil size={65} />
          <div>
            <H4 className="!text-2xl">Erwan</H4>
            <div className="flex gap-2 items-center">
              <div className="bg-primary h-3 w-3 rounded-full"></div>
              <p className="font-mona font-light text-[#3B3B3B]">active</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Image
            src="/assets/icons/settingmessage.svg"
            alt="Paramètres message"
            width={5}
            height={5}
          />
        </div>
      </header>

      {/* Conteneur des messages, scrollable */}
      <main
        className="h-[425px] w-full flex flex-col gap-2 p-4 overflow-y-scroll [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {discussions[selectedDiscussion].map((msg) => (
          <MessageCard
            key={msg.id}
            sender={msg.sender}
            time={msg.time}
            text={msg.text}
            fromMe={msg.fromMe}
          />
        ))}
      </main>

      {/* Footer d’envoi de message */}
      <footer className="h-max w-[98%] relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="bg-[#f7f7f7] w-full rounded-lg text-lg font-medium font-mona pl-16 pr-20 py-3 absolute -bottom-12"
          rows={1}
          style={{
            resize: "none",
            overflow: "hidden",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Image
          src="/assets/icons/add_file.svg"
          alt="Ajouter un fichier"
          width={25}
          height={25}
          className="absolute left-4 top-3"
        />
        {!isRecording ? (
          <button onClick={startRecording} className="absolute right-14 top-3">
            <Image
              src="/assets/icons/voice_message.svg"
              alt="Message vocal"
              width={15}
              height={15}
            />
          </button>
        ) : (
          <button onClick={stopRecording} className="absolute right-14 top-3">
            <video
              src="/assets/gifs/voice_animation02.webm"
              width="500"
              height="300"
              controls
              autoPlay
              loop
              muted
            >
              Your browser does not support the video tag.
            </video>
          </button>
        )}

        <Image
          src="/assets/icons/send_active_message.svg"
          alt="Envoyer le message"
          width={22}
          height={22}
          className="absolute right-4 top-[15px] cursor-pointer"
          onClick={handleSendMessage}
        />
      </footer>
    </Card>
  );
};

export default ContainerMessage;
