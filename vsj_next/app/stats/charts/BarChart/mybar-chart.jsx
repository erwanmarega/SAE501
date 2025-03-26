import "./barchart.scss";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MyBarChart = () => {
  // État pour suivre quelle colonne est survolée
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    {
      name: "Janvier",
      totalRDV: 4000,
      rdvIvalid: 2400,
      rdvEco: 750,
    },
    {
      name: "Février",
      totalRDV: 3000,
      rdvIvalid: 1398,
      rdvEco: 400,
    },
    {
      name: "Mars",
      totalRDV: 2000,
      rdvIvalid: 980,
      rdvEco: 500,
    },
    {
      name: "Avril",
      totalRDV: 2780,
      rdvIvalid: 2208,
      rdvEco: 750,
    },
    {
      name: "Mai",
      totalRDV: 1890,
      rdvIvalid: 1325,
      rdvEco: 900,
    },
    {
      name: "Juin",
      totalRDV: 2390,
      rdvIvalid: 1600,
      rdvEco: 1100,
    },
    {
      name: "Juillet",
      totalRDV: 3490,
      rdvIvalid: 1400,
      rdvEco: 1000,
    },
  ];

  const getRoundedPath = (x, y, width, height) => {
    const radius = 6;

    const safeRadius = Math.min(radius, width / 2, height / 2);

    if (height < 2 * safeRadius) {
      return `M${x},${y + height}
              H${x + width}
              V${y}
              H${x}
              Z`;
    }

    return `M${x},${y + height} 
            H${x + width} 
            V${y + safeRadius}
            Q${x + width},${y} ${x + width - safeRadius},${y}
            H${x + safeRadius}
            Q${x},${y} ${x},${y + safeRadius}
            V${y + height}
            Z`;
  };

  // Gestionnaire d'événements pour le survol
  const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // Fonction de rendu personnalisée pour les barres
  const renderCustomBar = (props, dataKey, normalFill, hoverFill) => {
    const { x, y, width, height, index } = props;
    const isActive = activeIndex === index;

    return (
      <path
        d={getRoundedPath(x, y, width, height)}
        stroke={isActive ? hoverFill : "none"}
        strokeWidth={isActive ? 2 : 0}
        fill={isActive ? hoverFill : normalFill}
        style={{ transition: "all 0.2s ease" }}
      />
    );
  };

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
              {payload[0].value} <span className="light-font">Rdv</span>
            </p>
          </div>
          <div className="block">
            <div
              className="circle"
              style={{ backgroundColor: "#3aacf7" }}
            ></div>
            <p>
              {payload[1].value} <span className="light-font">Rdv iValid</span>
            </p>
          </div>
          <div className="block">
            <div
              className="circle"
              style={{ backgroundColor: "#92ddfe" }}
            ></div>
            <p>
              {payload[2].value}{" "}
              <span className="light-font">Rdv écoresponsable</span>
            </p>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <section id="barchart-container">
      <h3 id="title-barchart">Statistiques de VSJ Natation</h3>

      <BarChart
        width={975}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        cursor={false}
      >
        <CartesianGrid strokeDasharray="2" vertical={false} opacity={0.5} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          label={{
            value: "Nombres de RDV",
            dx: -5,
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: "#666" },
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="totalRDV"
          fill="#1c77d9"
          shape={(props) =>
            renderCustomBar(props, "totalRDV", "#1c77d9", "#0d5eb8")
          }
          onMouseEnter={(data, index) => handleMouseEnter(data, index)}
          onMouseLeave={handleMouseLeave}
        />
        <Bar
          dataKey="rdvIvalid"
          fill="#3aacf7"
          shape={(props) =>
            renderCustomBar(props, "rdvIvalid", "#3aacf7", "#1e90e6")
          }
          onMouseEnter={(data, index) => handleMouseEnter(data, index)}
          onMouseLeave={handleMouseLeave}
        />
        <Bar
          dataKey="rdvEco"
          fill="#92ddfe"
          shape={(props) =>
            renderCustomBar(props, "rdvEco", "#92ddfe", "#65cdfe")
          }
          onMouseEnter={(data, index) => handleMouseEnter(data, index)}
          onMouseLeave={handleMouseLeave}
        />
      </BarChart>
    </section>
  );
};

export default MyBarChart;
