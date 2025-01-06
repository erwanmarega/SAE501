import React from "react";
import Header from "../components/header/header";

import TopBar from "./top-bar";
import RightBar from "./right-bar";
import EditEffectif from "./edit-effectif";

const GroupAdmin02Page = () => {
  return (
    <div className=" lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden">
      <Header />
      <section className="2xl:h-[700px] 2xl:w-[1500px] w-full h-5/6 lg:flex lg:items-center lg:justify-center lg:mt-16 mt-20">
        <div className="h-[550px] w-[1500px] grid grid-rows-8 grid-cols-[1fr_350px] gap-6">
          <TopBar />
          <EditEffectif />
          <RightBar />
        </div>
      </section>
    </div>
  );
};

export default GroupAdmin02Page;
