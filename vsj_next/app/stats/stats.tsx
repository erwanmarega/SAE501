import React from "react";
import BottomBar from "../components/bottombar/bottom-bar";
import StatsIcon from "../components/ui/interactive-icons/statsIcon";
import H4 from "../components/ui/texts/h4";

const Stats = () => {
  return (
    <div>
      <div className="flex items-center">
        <StatsIcon color="true" />
        <H4>Statistiques</H4>
      </div>
      <section>
        <p>Semaine du 30 janvier</p>
        <div></div>
        <div></div>
      </section>
    </div>
  );
};

export default Stats;
