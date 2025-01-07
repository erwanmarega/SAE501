import React from "react";
import Card from "../components/ui/card";
import H3 from "../components/ui/texts/h3";
import { CategoryBar } from "./ui/category-bar-template";
import DemiCapacityMeter from "./ui/demi-capacity-meter";

interface TopBarProps {
  swimmerValue: number;
  swimmerEffectif: number;
}

const TopBar = ({ swimmerValue, swimmerEffectif }: TopBarProps) => {
  return (
    <Card className="h-full w-[44%] row-start-1 row-end-3">
      <H3>Effectif</H3>
      <div className="w-full h-full grid grid-cols-[3fr_2fr]">
        <CategoryBar
          values={[10, 10, 20]}
          marker={{
            value: swimmerEffectif,
            tooltip: "68",
            showAnimation: true,
          }}
          className=" w-64"
        />
        <DemiCapacityMeter
          currentValue={swimmerEffectif}
          idealCapacity={swimmerValue}
        />
      </div>
    </Card>
  );
};

export default TopBar;
