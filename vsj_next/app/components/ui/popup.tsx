import React from "react";
import H3 from "./texts/h3";

const Popup = () => {
  return (
    <section className="h-screen w-screen fixed bg-black/25 flex justify-center items-center z-10">
      <div
        className="m-auto border-2 border-gray-300 bg-white flex flex-col"
        id="popup-container"
      >
        <H3>Title</H3>
        <p>Description</p>
      </div>
    </section>
  );
};

export default Popup;
