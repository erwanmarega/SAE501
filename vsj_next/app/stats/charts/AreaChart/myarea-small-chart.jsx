import "./areachart.scss";
import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const MySmallAreaChart = () => {
  const data = [
    {
      name: "Janvier",
      savedKM: 750,
    },
    {
      name: "Février",
      savedKM: 400,
    },
    {
      name: "Mars",
      savedKM: 500,
    },
    {
      name: "Avril",
      savedKM: 750,
    },
    {
      name: "Mai",
      savedKM: 350,
    },
    {
      name: "Juin",
      savedKM: 550,
    },
    {
      name: "Juillet",
      savedKM: 150,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return <p className="text-tooltip">{payload[0].value}</p>;
    }

    return null;
  };

  return (
    <section id="areasmallchart-container">
      <AreaChart
        width={120}
        height={50}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="savedKM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d8cec" stopOpacity={0.25} />
            <stop offset="20%" stopColor="#1d8cec" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#1d8cec" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip content={<CustomTooltip />} />
        <Area
          type="linear"
          dataKey="savedKM"
          stroke="#1d8cec"
          fillOpacity={1}
          strokeWidth={2}
          fill="url(#savedKM)"
        />
      </AreaChart>
    </section>
  );
};

export default MySmallAreaChart;
