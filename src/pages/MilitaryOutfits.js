import React, {useState} from "react";

import NavBar from "../components/Navbar/NavBar";
import MilitaryOutfitsCards from "../components/MilitaryPart/MilitaryOutfitsCards";

const MilitaryOutfits = () => {
  const [camoActive, setCamoActive] = useState("urban");
  const staffOutfits = ["primarque", "executeur-militaire", "polemarque"];
  const aerospatialOutfits = [
    "chef-d'escadrille",
    "pilote-instructeur",
    "pilote",
    // "pilote-urgentiste",
  ];
  const infantryOutfits = [
    "officier-marine",
    "marine",
    "marine-close-combat",
    "mitrailleur",
    "tireur-longue-distance",
    "grenadier",
  ];
  const logisticOutfits = ["ingenieur", "transporteur"];

  return (
    <div className="military-outfits-body">
      <NavBar factionPart="military" pageActive={"militaryOutfits"} />
      <div className="outfits-main-container">
        <div className="department-outfits-container staff">
          <h3 className="department-title">Etat-major</h3>
          <div className="outfits-cards-container">
            {staffOutfits.map((outfit) => (
              <MilitaryOutfitsCards
                key={outfit}
                outfit={outfit}
                departmentOutfits={"staff"}
                camoActive={""}
              />
            ))}{" "}
          </div>
        </div>
        <div className="department-outfits-container ">
          <div className="header-department-outfits-container aerospatial">
            <h3 className="department-title">Aerospatial</h3>
          </div>
          <div className="outfits-cards-container">
            {aerospatialOutfits.map((outfit) => (
              <MilitaryOutfitsCards
                key={outfit}
                outfit={outfit}
                departmentOutfits={"aerospatial"}
                camoActive={""}
              />
            ))}
          </div>
        </div>
        <div className="department-outfits-container ">
          <div className="header-department-outfits-container infantry">
            <h3 className="department-title">infantrie de marine</h3>

            <div className="camo-btn-container">
              <div className="camo-btn-container-wrapper">
                <div className="btn-container">
                  <div
                    className={
                      camoActive === "urban" ? ` urban-active` : `light`
                    }
                  ></div>
                  <span className="btn" onClick={() => setCamoActive("urban")}>
                    Urbain
                  </span>
                </div>
                <div className="btn-container">
                  <div
                    className={
                      camoActive === "arctic" ? ` arctic-active` : `light`
                    }
                  ></div>
                  <span className="btn" onClick={() => setCamoActive("arctic")}>
                    Arctique
                  </span>
                </div>
                <div className="btn-container">
                  <div
                    className={
                      camoActive === "woodland" ? ` woodland-active` : `light`
                    }
                  ></div>
                  <span
                    className="btn"
                    onClick={() => setCamoActive("woodland")}
                  >
                    Forêt
                  </span>
                </div>
                <div className="btn-container">
                  <div
                    className={
                      camoActive === "desert" ? ` desert-active` : `light`
                    }
                  ></div>
                  <span className="btn" onClick={() => setCamoActive("desert")}>
                    Desert
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="outfits-cards-container">
            {infantryOutfits.map((outfit) => (
              <MilitaryOutfitsCards
                key={outfit}
                outfit={outfit}
                departmentOutfits={"infantry"}
                camoActive={camoActive}
              />
            ))}
          </div>
        </div>
        <div className="department-outfits-container ">
          <div className="header-department-outfits-container logistics">
            <h3 className="department-title">Logistique</h3>
          </div>
          <div className="outfits-cards-container">
            {logisticOutfits.map((outfit) => (
              <MilitaryOutfitsCards
                key={outfit}
                outfit={outfit}
                departmentOutfits={"logistics"}
                camoActive={""}
              />
            ))}
          </div>
        </div>
        {/* <div className="department-outfits-container military-research">
          <div className="outfits-cards-container"></div>{" "}
        </div>
        <div className="department-outfits-container military-academy">
          <div className="outfits-cards-container"></div>{" "}
        </div>
        <div className="department-outfits-container military-medicine">
          <div className="outfits-cards-container"></div>{" "}
        </div> */}
        {/* <div className="department-outfits-container black-ops">
          <div className="outfits-cards-container"></div>{" "}
        </div> */}
      </div>
    </div>
  );
};

export default MilitaryOutfits;
