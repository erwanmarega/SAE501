import React from "react";
import Card from "@/app/components/ui/card";
import H4 from "@/app/components/ui/texts/h4";
import Profil from "@/app/components/profil/profil";

const SidebarCard = () => {
  const tabTest = [1, 2, 3, 4];
  return (
    <Card className="h-full rounded-3xl px-0 py-0">
      <header className="py-2">
        <H4 className="text-center text-xl ">Mes séances types</H4>
      </header>
      <main className="flex flex-wrap justify-center gap-4 px-0">
        {tabTest.map(() => {
          return (
            <div className="bg-gray-100 rounded-lg p-2 w-32 h-28 flex flex-col justify-between">
              <header className="flex justify-between items-center">
                <div className="flex gap-2">
                  {" "}
                  <Profil size={25} />
                  <Profil size={25} />
                </div>
                <div>
                  <div className="bg-primary/15 rounded-full py-1 px-2">
                    <p className="text-primary font-mona font-medium text-5xs text-center">
                      Crawl
                    </p>
                  </div>
                </div>
              </header>
              <main className="flex flex-col items-center">
                <div className="w-full flex justify-between">
                  <p className="font-mona font-light text-2xs text-[#4D4D4D]">
                    Durée <span className="font-semibold">01h30</span>
                  </p>
                  <p>AA</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-mona font-light text-2xs text-[#4D4D4D]">
                    Intensité <span className="font-semibold">élevé</span>
                  </p>
                </div>
              </main>
              <footer className="flex items-center">
                <p className="font-mona font-black text-sm m-auto text-[#484848]">
                  10X200m{" "}
                </p>
              </footer>
            </div>
          );
        })}
      </main>
    </Card>
  );
};

export default SidebarCard;
