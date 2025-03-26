import "./stats.scss";
import React, { useState, useContext, useEffect } from "react";
import MyBarChart from "./charts/BarChart/mybar-chart";
import MyAreaChart from "./charts/AreaChart/myarea-chart";
import MyPieChart from "./charts/PieChart/mypie-chart";
import Card from "./cards/card";
import MySmallAreaChart from "./charts/AreaChart/myarea-small-chart";

const StatsPage = () => {
  const [internMenu, setInternMenu] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const [startDate, setStartDate] = useState();
  const handleStartDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const [endDate, setEndDate] = useState();
  const handleEndDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const [elementId, setElementId] = useState();

  const [elementType, setElementType] = useState("company");
  const handleTypeChange = (newElementType) => {
    setElementType(newElementType);
  };

  useEffect(() => {
    if (startDate && endDate && elementType && elementId) {
      //handleGetStats(startDate, endDate, elementType, elementId);
    }
  }, [startDate, endDate, elementType, elementId]);

  const [dataStats, setDataStats] = useState(null);
  const handleGetStats = async (from, to, element_id, element_type) => {
    const body = {
      from: from,
      to: to,
      element_id: element_id,
      element_type: element_type,
      filter: "",
    };

    try {
      const response = await fetch("/stats/rdvcount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();

        setDataStats(data);
        console.log("Data récupérée avec succès:", data);
      } else {
        console.error("Erreur serveur:", response.statusText);
        setDataStats({ error: response.statusText });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setDataStats({ error: error.message });
    }
  };

  const [dataCompany, setDataCompany] = useState();
  const fetchCompanyData = async () => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    try {
      const response = await fetch("/user/company", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch error:", response.status, errorText);
        if (response.status === 401) {
          error.log("Token non-valide ou expiré !");
          navigate("/login");
        } else {
          throw new Error(`Erreur de fetch users: ${errorText}`);
        }
      } else {
        const data = await response.json();
        setDataCompany(data);
        error.log("");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setDataCompany([]);
      error.log("not working");
    }
  };

  const [dataProfil, setDataProfil] = useState();
  const fetchProfilData = async () => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    try {
      const response = await fetch("/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch error:", response.status, errorText);
        if (response.status === 401) {
          error.log("Votre session a expiré");
          navigate("/login");
        } else {
          throw new Error(`Erreur de fetch users: ${errorText}`);
        }
      } else {
        const data = await response.json();
        setDataProfil(data);
        error.log("");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setDataProfil([]);
      error.log(error.message);
    }
  };

  useEffect(() => {
    fetchCompanyData();
    fetchProfilData();
  }, []);

  return (
    <div
      className="menu-parent"
      style={{
        paddingLeft: internMenu && !isRecentSmartphone ? "80px" : "0",
        transition: "0.3s",
      }}
    >
      {!isRecentSmartphone ? (
        <LateralMenu
          closeMenu={closeMenu}
          calendarMenu={"standardPages"}
          internMenu={internMenu}
          setInternMenu={setInternMenu}
        />
      ) : (
        <MobileMenu closeMenu={closeMenu} />
      )}
      <section id="stats-page">
        <h1>Statistiques</h1>

        <section id="sortingWrapperStats-container">
          <div className="sorting-wrapper sorting-wrapper-stats">
            <div className="sorting-controls radio-input">
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={elementType === "company"}
                  onChange={() => handleTypeChange("company")}
                />
                <span> Société</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="active"
                  checked={elementType === "agency"}
                  onChange={() => handleTypeChange("agency")}
                />
                <span> Agence</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="type"
                  checked={elementType === "user"}
                  onChange={() => handleTypeChange("user")}
                />
                <span> Utilisateurs</span>
              </label>
              <span className="selection selection-tools"></span>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <DateInput
              label={"Date de début"}
              selectedDate={startDate}
              handleDateChange={handleStartDateChange}
            />
            <DateInput
              label={"Date de fin"}
              selectedDate={endDate}
              handleDateChange={handleEndDateChange}
            />
          </div>
        </section>

        <header>
          <Card title={"Rendez-vous totaux"} value={385} variation={65} />
          <Card title={"Rendez-vous via iValid"} value={350} variation={10} />
          <Card
            title={"Rendez-vous écoresponsable"}
            value={450}
            variation={-24}
          />
        </header>
        <main>
          <div className="barchart-card">
            <MyBarChart />
          </div>
        </main>
        <footer>
          <div className="areachart-card">
            <MyAreaChart />
          </div>
          <div className="piechart-card">
            <MyPieChart />
          </div>
        </footer>
      </section>
      <p style={{ marginBottom: "100px" }}></p>
    </div>
  );
};

export default StatsPage;
