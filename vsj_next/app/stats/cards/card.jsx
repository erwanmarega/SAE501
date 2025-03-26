import "./card.scss";
import React from "react";
import ArrowVariant from "../../../assets/img/arrow-variant.svg";
import MySmallAreaChart from "../charts/AreaChart/myarea-small-chart";
import InformationIcon from "../../../assets/img/icon-information.svg";
import { Tooltip } from "@mui/material";

const Card = ({ title, image, value, variation }) => {
  const arrowStyle = {
    transform: variation > 0 ? "rotate(0deg)" : "rotate(180deg)",
    width: "16px",
    height: "16px",
  };
  return (
    <section id="card-container">
      <Tooltip
        title="Cette indicateur est basé sur les données du mois actuel, par comparaison au mois dernier, au même jour"
        placement="top"
      >
        <img src={InformationIcon} alt="" className="information-icon" />
      </Tooltip>
      <div className="row-card">
        <div className="badgeCircle-container">
          <div className="great-circle">
            <div className="small-circle">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <h3 className="title-card">{title}</h3>
      </div>

      <main>
        <div className="row-card">
          <h1>{value}</h1>
        </div>
        <div className="row-card" style={{ gap: "5px" }}>
          <img src={ArrowVariant} alt="" style={arrowStyle} />
          <p className="bottom-text">
            <span className="blue">{variation}%</span> vs mois dernier
          </p>
        </div>
      </main>
    </section>
  );
};

export default Card;
