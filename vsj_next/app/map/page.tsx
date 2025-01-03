import React from "react";
import Card from "../components/ui/card";
import Header from "../components/header/header";

const MapPage = () => {
  return (
    <div className="lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden bg-[#F7F7F7] dark:bg-[#262629]">
      {/* Composant d'en-tête */}
      <Header />
      <div className="gap-7 grid grid-cols-[5fr_3fr] h-[85vh] w-[98%] max-w-[1500px] max-h-[700px] mt-7">
        <Card className="!px-0 !py-0 h-full grid grid-rows-[1fr_5fr] select-none">
          <h1>3D MAP</h1>
        </Card>

        <section className="grid grid-rows-2 gap-5">
          <section>
            <Card className="h-full">
              <p>TOP CARD</p>
            </Card>
          </section>
          <section className="grid grid-rows-2 grid-cols-2 gap-5">
            <Card>
              <p>TOP LEFT CARD</p>
            </Card>
            <Card>
              {" "}
              <p>TOP RIGHT CARD</p>
            </Card>
            <Card>
              <p>BOTTOM LEFT CARD</p>
            </Card>
            <Card>
              <p>BOTTOM RIGHT CARD</p>
            </Card>
          </section>
        </section>
      </div>
    </div>
  );
};

export default MapPage;
