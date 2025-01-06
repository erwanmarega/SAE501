import React from "react";
import Card from "../components/ui/card";
import H3 from "../components/ui/texts/h3";
import { CategoryBar } from "./ui/category-bar-template";
import DemiCapacityMeter from "./ui/demi-capacity-meter";

const TopBar = () => {
  return (
    <Card className="h-full w-[44%] row-start-1 row-end-3">
      <H3>Effectif</H3>
      <div className="w-full h-full grid grid-cols-[3fr_2fr]">
        <CategoryBar
          values={[10, 10, 20]}
          marker={{ value: 17, tooltip: "68", showAnimation: true }}
          className=" w-64"
        />
        <DemiCapacityMeter currentValue={17} idealCapacity={25} />
      </div>
    </Card>
  );
};

export default TopBar;
