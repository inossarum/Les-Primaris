import React from "react";
import {useSelector} from "react-redux";
import EncyclopediaCelestialObjectsPlanetPage from "../components/StarCitizenEncyclopedia/EncyclopediaCelestialObjectsPlanetPage";
import EncyclopediaCelestialObjectsMoonPage from "../components/StarCitizenEncyclopedia/EncyclopediaCelestialObjectsMoonPage";
import EncyclopediaStationPage from "../components/StarCitizenEncyclopedia/EncyclopediaStationPage";
import EncyclopediaShopPage from "../components/StarCitizenEncyclopedia/EncyclopediaShopPage";
import EncyclopediaStarSystemPage from "../components/StarCitizenEncyclopedia/EncyclopediaStarSystemPage";
import EncyclopediaCelestialObjectsAsteroidBeltPage from "../components/StarCitizenEncyclopedia/EncyclopediaCelestialObjectsAsteroidBeltPage";
import EncyclopediaShipPage from "../components/StarCitizenEncyclopedia/EncyclopediaShipPage";

const StarCitizenEncyclopediaDetailPage = () => {
  const data = useSelector(
    (state) => state.windowActive.celestialCardContentDeployed
  );

  if (data?.type === "Single star") {
    return <EncyclopediaStarSystemPage data={data} />;
  }
  if (data?.type === "Planet") {
    return <EncyclopediaCelestialObjectsPlanetPage data={data} />;
  }
  if (data?.type === "Asteroid belt" || data?.type === "Asteroid field") {
    return <EncyclopediaCelestialObjectsAsteroidBeltPage data={data} />;
  }
  if (data?.type === "Satellite") {
    return <EncyclopediaCelestialObjectsMoonPage data={data} />;
  }
  if (
    data.type === "station" ||
    data.type === "asteroid_station" ||
    data.type === "outpost" ||
    data.type === "aid_shelter" ||
    data.type === "landing_zone"
  ) {
    return <EncyclopediaStationPage data={data} />;
  }
  if (
    data?.name?.includes("Admin Office") === true ||
    data?.position?.includes("GrimHEX") === true ||
    data?.position?.includes("New Babbage") === true ||
    data?.position?.includes("Area 18") === true ||
    data?.position?.includes("ARC") === true ||
    data?.position?.includes("MIC") === true ||
    data?.position?.includes("CRU") === true ||
    data?.position?.includes("Baijini Point") === true ||
    data?.position?.includes("Everus Harbor") === true ||
    data?.position?.includes("Port") === true ||
    data?.position?.includes("Orison") === true ||
    data?.position?.includes("Lorville") === true ||
    data?.position?.includes("Levski") === true ||
    data?.position?.includes("HUR-L1") === true ||
    data?.position?.includes("HUR-L2") === true
  ) {
    return <EncyclopediaShopPage data={data} />;
  }

  if (data?.manufacturer) {
    return <EncyclopediaShipPage data={data} />;
  }
};

export default StarCitizenEncyclopediaDetailPage;
