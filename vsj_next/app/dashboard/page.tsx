import React from "react";
import BottomBar from "@/app/components/bottom-bar";
import Header from "@/app/components/header";

const DashboardPage = () => {
  return (
    <div className="bg-[#F7F7F7] h-screen ">
      <Header />
      <main className="grid grid-cols-5 grid-rows-5 gap-5 w-full h-[73vh]">
        <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-1 row-end-5 col-start-1 col-end-4 flex items-center bg-white">
          <h1 className="m-auto">3D MAP</h1>
        </div>
        <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-5 row-end-6 col-start-1 col-end-4 flex items-center bg-white">
          <h1 className="m-auto">CALENDAR</h1>
        </div>
        <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-1 row-end-2 col-start-4 col-end-5 flex items-center bg-white">
          <h1 className="m-auto">MESSAGE 01</h1>
        </div>
        <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-1 row-end-2 col-start-5 col-end-6 flex items-center bg-white">
          <h1 className="m-auto">MESSAGE 02</h1>
        </div>
        <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-2 row-end-6 col-start-4 col-end-5 flex items-center bg-white">
          <h1 className="m-auto">GROUPE</h1>
        </div>
        <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-2 row-end-4 col-start-5 col-end-6 flex items-center bg-white">
          <h1 className="m-auto">TEMPERATURE</h1>
        </div>
        <div className="rounded-2xl shadow-card-shadow w-full h-full row-start-4 row-end-6 col-start-5 col-end-6 flex items-center bg-white">
          <h1 className="m-auto">STATS</h1>
        </div>
      </main>
      <div className=" flex justify-center">
        <BottomBar isPage={true} />
      </div>
    </div>
  );
};

export default DashboardPage;
