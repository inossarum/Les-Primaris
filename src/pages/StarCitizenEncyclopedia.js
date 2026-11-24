import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
  getRSICelestialObjects,
  getRSIShips,
  getRSIStarSystems,
  getRSIStations,
} from "../feature/rsi.slice";

import EncyclopediaShipsSummury from "../components/StarCitizenEncyclopedia/EncyclopediaShipsSummury";
import EncyclopediaSearchHomePage from "../components/StarCitizenEncyclopedia/EncyclopediaSearchHomePage";
import EncyclopediaCelestialObjectsSummury from "../components/StarCitizenEncyclopedia/EncyclopediaCelestialObjectsSummury";
import EncyclopediaStationsSummury from "../components/StarCitizenEncyclopedia/EncyclopediaStationsSummury";
import EncyclopediaStarSystemSummury from "../components/StarCitizenEncyclopedia/EncyclopediaStarSystemSummury";
import EncyclopediaPrimarisLorePage from "../components/StarCitizenEncyclopedia/EncyclopediaPrimarisLorePage/EncyclopediaPrimarisLorePage";

const StarCitizenEncyclopedia = () => {
  const dispatch = useDispatch();
  const RSIEncyclopediaPage = useSelector(
    (state) => state.rsi.encyclopediaPage
  );
  const RSIStarSystems = useSelector((state) => state.rsi.starSystems);
  const RSICelestialObjects = useSelector(
    (state) => state.rsi.celestialObjects
  );
  const RSIStations = useSelector((state) => state.rsi.stations);
  const RSIShips = useSelector((state) => state.rsi.ships);

  let encylopediaDisplayer = "";

  useEffect(() => {
    if (RSIStarSystems === null) {
      axios
        .get("https://api.fleetyards.net/v1/starsystems/?perPage=20")
        .then((res) => dispatch(getRSIStarSystems(res.data)));
    }

    if (RSICelestialObjects === null) {
      axios
        .get("https://api.fleetyards.net/v1/celestial-objects/?perPage=70")
        .then((res) => dispatch(getRSICelestialObjects(res.data)));
    }

    if (RSIStations === null) {
      axios
        .get("https://api.fleetyards.net/v1/stations/?perPage=100")
        .then((res) => dispatch(getRSIStations(res.data)));
    }

    if (RSIShips === null) {
      axios
        .get(`https://api.fleetyards.net/v1/models/?perPage=200`)
        .then((res) => dispatch(getRSIShips(res.data)));
    }
  }, []);

  switch (RSIEncyclopediaPage) {
    case "home":
      encylopediaDisplayer = (
        <>
          <EncyclopediaSearchHomePage />
        </>
      );

      break;
    case "starSystems":
      encylopediaDisplayer = (
        <>
          <EncyclopediaStarSystemSummury />
        </>
      );
      break;
    case "celestialObjects":
      encylopediaDisplayer = (
        <>
          <EncyclopediaCelestialObjectsSummury />
        </>
      );

      break;
    case "stations":
      encylopediaDisplayer = (
        <>
          <EncyclopediaStationsSummury />
        </>
      );

      break;
    case "ships":
      encylopediaDisplayer = (
        <>
          <EncyclopediaShipsSummury />
        </>
      );
      break;
    case "lore":
      encylopediaDisplayer = (
        <>
          <EncyclopediaPrimarisLorePage />
        </>
      );
      break;

    default:
  }

  return <>{encylopediaDisplayer}</>;
};

export default StarCitizenEncyclopedia;
