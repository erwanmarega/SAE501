import React from "react";
import BottomBar from "../components/bottombar/bottom-bar";
import StatsIcon from "../components/ui/interactive-icons/statsIcon";
import H4 from "../components/ui/texts/h4";
import Header from "../components/header/header";
import MyBarChart from "./charts/BarChart/mybar-chart";
import MyAreaChart from "./charts/AreaChart/myarea-chart";
import MyPieChart from "./charts/PieChart/mypie-chart";
import Card from "../components/ui/card";
import clsx from "clsx";

const StatsPage = () => {
  const stats = [
    { status: 0, date: "2023-10-01" },
    { status: 1, date: "2023-10-08" },
    { status: 2, date: "2023-10-15" },
    { status: 3, date: "2023-10-22" },
    { status: 0, date: "2023-10-29" },
    { status: 1, date: "2023-11-05" },
    { status: 2, date: "2023-11-12" },
    { status: 3, date: "2023-11-19" },
    { status: 0, date: "2023-11-26" },
    { status: 1, date: "2023-12-03" },
    { status: 2, date: "2023-12-10" },
    { status: 3, date: "2023-12-17" },
    { status: 0, date: "2023-12-24" },
    { status: 1, date: "2023-12-31" },
    { status: 2, date: "2024-01-07" },
    { status: 3, date: "2024-01-14" },
    { status: 0, date: "2024-01-21" },
    { status: 1, date: "2024-01-28" },
    { status: 2, date: "2024-02-04" },
    { status: 3, date: "2024-02-11" },
    { status: 0, date: "2024-02-18" },
    { status: 1, date: "2024-02-25" },
    { status: 2, date: "2024-03-03" },
    { status: 3, date: "2024-03-10" },
    { status: 0, date: "2024-03-17" },
    { status: 1, date: "2024-03-24" },
    { status: 2, date: "2024-03-31" },
    { status: 3, date: "2024-04-07" },
    { status: 0, date: "2024-04-14" },
    { status: 1, date: "2024-04-21" },
    { status: 2, date: "2024-04-28" },
    { status: 3, date: "2024-05-05" },
    { status: 0, date: "2024-05-12" },
    { status: 1, date: "2024-05-19" },
    { status: 2, date: "2024-05-26" },
    { status: 3, date: "2024-06-02" },
    { status: 0, date: "2024-06-09" },
    { status: 1, date: "2024-06-16" },
    { status: 2, date: "2024-06-23" },
    { status: 3, date: "2024-06-30" },
    { status: 0, date: "2024-07-07" },
    { status: 1, date: "2024-07-14" },
    { status: 2, date: "2024-07-21" },
    { status: 3, date: "2024-07-28" },
    { status: 0, date: "2024-08-04" },
  ];

  return (
    <div className=" lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden">
      <Header />
      <section className="w-[90vw] h-5/6 lg:flex lg:items-center lg:justify-center lg:mt-16 mt-20">
        <div className="gap-4 2xl:gap-6 3xl:gap-8 mt-4 grid grid-rows-2 grid-cols-5 h-full w-full">
          <section className="flex row-start-1 row-end-1 col-start-1 col-end-4 h-full w-full m-auto items-end justify-center">
            <h1>POSITION 01</h1>
          </section>
          <section className="flex row-start-1 row-end-1 col-start-4 col-end-6 h-full w-full m-auto items-end justify-center">
            <Card className="w-full h-full">
              <div className="flex items-center justify-between flex-wrap gap-1">
                {stats.map((stat, index) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        "w-4 h-4 rounded-md",
                        stat.status === 0 && "bg-red-500",
                        stat.status === 1 && "bg-yellow-500",
                        stat.status === 2 && "bg-green-500",
                        stat.status === 3 && "bg-blue-500"
                      )}
                    ></div>
                  );
                })}
              </div>
            </Card>
          </section>
          <section className="flex row-start-2 row-end-2 col-start-1 col-end-3 h-full w-full m-auto items-end justify-center">
            <Card>
              <MyBarChart />
            </Card>
          </section>
          <section className="flex row-start-2 row-end-2 col-start-3 col-end-6 h-full w-full m-auto items-end justify-center">
            <Card>
              <MyPieChart />
            </Card>
          </section>
        </div>
      </section>
    </div>
  );
};

export default StatsPage;
