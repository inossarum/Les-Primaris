import React from "react";
import NavBar from "../Navbar/NavBar";
import EncyclopediaNavBar from "./EncyclopediaNavBar/EncyclopediaNavBar";
import {useSelector} from "react-redux";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";

const EncyclopediaStationsSummury = () => {
  const RSIStations = useSelector((state) => state.rsi.stations);

  return (
    <div className="encyclopedia-body">
      <NavBar factionPart={"civilian"} pageActive={"starCitizenEncyclopedia"} />
      <EncyclopediaNavBar />
      <div className="encyclopedia-cards-container">
        {RSIStations &&
          [...RSIStations]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((station) => (
              <EncyclopediaObjectPageCard data={station} key={station.name} />
            ))}
      </div>
    </div>
  );
};

export default EncyclopediaStationsSummury;
