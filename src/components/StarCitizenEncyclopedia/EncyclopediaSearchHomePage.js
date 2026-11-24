import React, {useRef} from "react";
import NavBar from "../Navbar/NavBar";
import EncyclopediaNavBar from "./EncyclopediaNavBar/EncyclopediaNavBar";
import {Search} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {
  clearRSISearchResult,
  setRSICelestialObjectsSearchResult,
  setRSIShipsSearchResult,
  setRSIStarSystemsSearchResult,
  setRSIStationsSearchResult,
} from "../../feature/rsi.slice";
import EncyclopediaShipCard from "./EncyclopediaShipCard";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";

const EncyclopediaSearchHomePage = () => {
  const searchValue = useRef();
  const RSIStarSystems = useSelector((state) => state.rsi.starSystems);
  const RSICelestialObjects = useSelector(
    (state) => state.rsi.celestialObjects
  );
  const RSIStations = useSelector((state) => state.rsi.stations);
  const RSIShips = useSelector((state) => state.rsi.ships);
  const RSIStarSystemsSearchResult = useSelector(
    (state) => state.rsi.starSystemsSearchResult
  );
  const RSICelestialObjectsSearchResult = useSelector(
    (state) => state.rsi.celestialObjectsSearchResult
  );
  const RSIStationsSearchResult = useSelector(
    (state) => state.rsi.stationsSearchResult
  );
  const RSIShipsSearchResult = useSelector(
    (state) => state.rsi.shipsSearchResult
  );
  const dispatch = useDispatch();

  const handleRequest = (e) => {
    e.preventDefault();
    dispatch(clearRSISearchResult());

    const query = searchValue.current?.value?.trim().toLowerCase() ?? "";
    if (!query) return;

    const includesQuery = (value) =>
      typeof value === "string" && value.toLowerCase().includes(query);
    const dispatchMatches = (items, matches, action) => {
      (items ?? []).filter(matches).forEach((item) => dispatch(action(item)));
    };

    dispatchMatches(
      RSIStarSystems,
      (system) => includesQuery(system.slug) || includesQuery(system.name),
      setRSIStarSystemsSearchResult
    );
    dispatchMatches(
      RSICelestialObjects,
      (object) => includesQuery(object.slug) || includesQuery(object.name),
      setRSICelestialObjectsSearchResult
    );
    dispatchMatches(
      RSIStations,
      (station) => includesQuery(station.slug) || includesQuery(station.name),
      setRSIStationsSearchResult
    );
    dispatchMatches(
      RSIShips,
      (ship) =>
        includesQuery(ship.slug) ||
        includesQuery(ship.name) ||
        includesQuery(ship.manufacturer?.name) ||
        includesQuery(ship.manufacturer?.slug),
      setRSIShipsSearchResult
    );
  };

  return (
    <div>
      <NavBar factionPart={"civilian"} pageActive={"starCitizenEncyclopedia"} />
      <div className="encyclopedia-home-page-body">
        <EncyclopediaNavBar />
        <div className="encyclopedia-search-container">
          <div className="search-form-container">
            <form
              className="home-form-container"
              onSubmit={(e) =>
                searchValue.current.value !== "" ? handleRequest(e) : ""
              }
            >
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Rechercher dans l'univers... "
                  ref={searchValue}
                />
                <button className="search-button" type="submit">
                  <Search className="search-logo" />
                </button>
              </div>
            </form>
          </div>
          <div className="search-result-container">
            <div className="sub-container">
              {RSIStarSystemsSearchResult && RSIStarSystemsSearchResult[0] ? (
                <>
                  <h3 className="sub-container-title">Systemes Stellaires</h3>
                  <div className="ships-sub-container">
                    {[...RSIStarSystemsSearchResult].map((starSystem) => (
                      <EncyclopediaObjectPageCard
                        data={starSystem}
                        key={starSystem.slug}
                      />
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="sub-container">
              {RSICelestialObjectsSearchResult &&
              RSICelestialObjectsSearchResult[0] ? (
                <>
                  <h3 className="sub-container-title">Corps Celestes</h3>
                  <div className="ships-sub-container">
                    {[...RSICelestialObjectsSearchResult].map(
                      (celestialObject) => (
                        <EncyclopediaObjectPageCard
                          data={celestialObject}
                          key={celestialObject.slug}
                        />
                      )
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="sub-container">
              {RSIStationsSearchResult && RSIStationsSearchResult[0] ? (
                <>
                  <h3 className="sub-container-title">Stations</h3>
                  <div className="ships-sub-container">
                    {[...RSIStationsSearchResult].map((station) => (
                      <EncyclopediaObjectPageCard
                        data={station}
                        key={station.slug}
                      />
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="sub-container">
              {RSIShipsSearchResult && RSIShipsSearchResult[0] ? (
                <>
                  <h3 className="sub-container-title">Vaisseaux</h3>
                  <div className="ships-sub-container">
                    {[...RSIShipsSearchResult].map((ship) => (
                      <EncyclopediaShipCard data={ship} key={ship.id} />
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncyclopediaSearchHomePage;
