import React from "react";
import H4 from "./texts/h4";

const Notification = () => {
  return (
    <section className="h-screen w-screen fixed z-10">
      <div id="notif-container" className="bg-white w-48 h-20">
        <H4>Notifications</H4>
      </div>
    </section>
  );
};

export default Notification;
