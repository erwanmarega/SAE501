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

const MyAreaChart = () => {
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
      savedKM: 1100,
    },
    {
      name: "Juillet",
      savedKM: 1000,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <section className="custom-tooltip">
          <div className="block">
            <div
              className="circle"
              style={{ backgroundColor: "#1c77d9" }}
            ></div>
            <p>
              {payload[0].value}{" "}
              <span className="light-font">Km économisés</span>
            </p>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <section className="areachart-container">
      <h3 id="title-areachart">Nombres de rendez-vous iValid</h3>

      <AreaChart
        width={650}
        height={240}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="savedKM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d8cec" stopOpacity={0.4} />
            <stop offset="20%" stopColor="#1d8cec" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#1d8cec" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          label={{
            value: "Rendez-vous iValid",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: "#666" },
          }}
        />
        <CartesianGrid strokeDasharray="0" vertical={false} opacity={0.25} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="bumpX"
          dataKey="savedKM"
          stroke="#1d8cec"
          fillOpacity={1}
          strokeWidth={3}
          fill="url(#savedKM)"
        />
      </AreaChart>
    </section>
  );
};

export default MyAreaChart;
