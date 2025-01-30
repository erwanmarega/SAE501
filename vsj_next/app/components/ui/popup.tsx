import React from "react";
import H3 from "./texts/h3";
import DeleteElement from "./delete-element";
import InputSelectImage from "./input-select-image";
import Button from "./button";

interface PopupProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Popup = ({ close, children }: PopupProps) => {
  return (
    <section className="h-screen w-screen fixed bg-black/25 flex justify-center items-center z-10 top-0 left-0">
      <div
        className="m-auto border-[1px] border-gray-300 bg-white h-max w-[450px] flex flex-col items-center p-4 rounded-xl shadow-card relative gap-6 "
        id="popup-container"
      >
        <DeleteElement
          className="z-10 top-2 right-2 h-max w-max"
          onClick={() => close(false)}
        />
        <section className="flex flex-col gap-4">{children}</section>
        <Button className="!w-36">Enregistrez</Button>
      </div>
    </section>
  );
};

export default Popup;
