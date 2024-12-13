import React from "react";

interface BlockStatsProps {
  color: string;
}

const BlockStats: React.FC<BlockStatsProps> = ({ color }) => {
  return (
    <div className="rounded h-4 w-4" style={{ backgroundColor: color }}></div>
  );
};

export default BlockStats;
