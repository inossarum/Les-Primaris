import React from "react";
import NavBar from "../Navbar/NavBar";
import EncyclopediaNavBar from "./EncyclopediaNavBar/EncyclopediaNavBar";
import {useSelector} from "react-redux";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";

const EncyclopediaStarSystemSummury = () => {
  const RSIStarSystems = useSelector((state) => state.rsi.starSystems);

  return (
    <div className="encyclopedia-body">
      <NavBar factionPart={"civilian"} pageActive={"starCitizenEncyclopedia"} />
      <EncyclopediaNavBar />
      <div className="encyclopedia-cards-container">
        {RSIStarSystems &&
          [...RSIStarSystems]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((starSystem) => (
              <EncyclopediaObjectPageCard
                data={starSystem}
                key={starSystem.name}
              />
            ))}
      </div>
    </div>
  );
};

export default EncyclopediaStarSystemSummury;
