import React from "react";
import BottomBar from "../components/bottombar/bottom-bar";
import StatsIcon from "../components/ui/interactive-icons/statsIcon";
import H4 from "../components/ui/texts/h4";
import Header from "../components/header/header";


const StatsPage = () => {
  return (
    <div className=" lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden">
        <Header />
        <section className="2xl:h-[700px] 2xl:w-[1500px] w-full h-5/6 lg:flex lg:items-center lg:justify-center lg:mt-16 mt-20">
          <div className="flex flex-col gap-4  2xl:gap-6 3xl:gap-8 mt-4 ">
           <section>
            <p>POSITION 01</p>
           </section>
           <section>
            <p>POSITION 02</p>
           </section>
           <section>
            <p>POSITION 03</p>
           </section>
           <section>
            <p>POSITION 04</p>
           </section>

          </div>
        </section>
      </div>
  );
};

export default StatsPage;
