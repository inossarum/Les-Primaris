import React from "react";
import NavBar from "../Navbar/NavBar";
import EncyclopediaNavBar from "./EncyclopediaNavBar/EncyclopediaNavBar";
import {useSelector} from "react-redux";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";

const EncyclopediaCelestialObjectsSummury = () => {
  const RSICelestialObjects = useSelector(
    (state) => state.rsi.celestialObjects
  );

  return (
    <div className="encyclopedia-body">
      <NavBar factionPart={"civilian"} pageActive={"starCitizenEncyclopedia"} />
      <EncyclopediaNavBar />
      <div className="encyclopedia-cards-container">
        {RSICelestialObjects &&
          [...RSICelestialObjects]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((celestialObject) => (
              <EncyclopediaObjectPageCard
                data={celestialObject}
                key={celestialObject.name}
              />
            ))}
      </div>
    </div>
  );
};

export default EncyclopediaCelestialObjectsSummury;
