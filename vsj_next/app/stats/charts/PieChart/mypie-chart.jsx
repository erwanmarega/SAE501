import "./piechart.scss";
import React, { useState, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  const truncateText = (text) => {
    if (text === "Rdv écoresponsable") {
      return "Rdv éco..";
    } else {
      return text;
    }
  };

  return (
    <g>
      <text
        x={cx}
        y={cy - 9}
        dy={8}
        textAnchor="middle"
        fill={"black"}
        className="chartpie-text"
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy + 6}
        dy={8}
        textAnchor="middle"
        fill={"black"}
        className="small-chartpieText"
      >
        {truncateText(payload.name)}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 13}
        fill={fill}
      />
    </g>
  );
};

const MyPieChart = () => {
  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "Rdv totaux",
      value: 4567,
    },
    {
      name: "Rdv via iValid",
      value: 2400,
    },
    {
      name: "Rdv écoresponsable",
      value: 1398,
    },
  ];

  const colors = ["#1c77d9", "#3aacf7", "#92ddfe"];
  const TooltipContent = ({ payload }) => {
    if (!payload || !payload[0]) return null;

    switch (payload[0].name) {
      case "Rdv totaux":
        return (
          <div className="block">
            <div
              className="circle"
              style={{ backgroundColor: "#1c77d9" }}
            ></div>
            <p>
              {payload[0].value} <span className="light-font">Rdv totaux</span>
            </p>
          </div>
        );
      case "Rdv via iValid":
        return (
          <div className="block">
            <div
              className="circle"
              style={{ backgroundColor: "#3aacf7" }}
            ></div>
            <p>
              {payload[0].value}{" "}
              <span className="light-font">Rdv via iValid</span>
            </p>
          </div>
        );
      case "Rdv écoresponsable":
        return (
          <div className="block">
            <div
              className="circle"
              style={{ backgroundColor: "#92ddfe" }}
            ></div>
            <p>
              {payload[0].value}{" "}
              <span className="light-font">Rdv écoresponsable</span>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <section className="custom-tooltip">
          <TooltipContent payload={payload} />
        </section>
      );
    }

    return null;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <section id="piechart-container">
      <PieChart width={200} height={250}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
          startAngle={360}
          endAngle={0}
          paddingAngle={0}
        >
          {data02.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
      <h3 id="title-piechart">Répartition des rendez-vous</h3>
    </section>
  );
};

export default MyPieChart;
