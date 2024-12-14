import clsx from "clsx";
import React from "react";

interface BlockDayProps {
  isTrainning: string;
}

const BlockDay = ({ isTrainning }: BlockDayProps) => {
  return (
    <div
      className={clsx(
        "bg-[F8F9FB] dark:bg-[#545454] rounded-lg relative grid grid-rows-3"
      )}
    >
      <header>
        <span>21</span>
        <span>18:20</span>
      </header>
      <main>
        <div></div>
        <p>
          Entrainement <span>10x200m</span>
        </p>
      </main>
      <footer>
        <p>
          <span>Coach</span> Marega
        </p>
      </footer>
    </div>
  );
};

export default BlockDay;
