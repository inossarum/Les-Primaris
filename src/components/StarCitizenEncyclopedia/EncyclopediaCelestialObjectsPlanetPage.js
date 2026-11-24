import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {celestialCardContentDeployed} from "../../feature/window.slice";
import {NavLink} from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import DecorationBar1 from "../Decorations/DecorationBar1";
import DecorationBar2 from "../Decorations/DecorationBar2";

import {
  getRSIActualCelestialObjectInterestPoints,
  getRSIActualCelestialObjectMoons,
} from "../../feature/rsi.slice";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";

const EncyclopediaCelestialObjectsPlanetPage = () => {
  const dispatch = useDispatch();
  const RSIStarSystems = useSelector((state) => state.rsi.starSystems);
  const RSICelestialObjects = useSelector(
    (state) => state.rsi.celestialObjects
  );
  const RSIStations = useSelector((state) => state.rsi.stations);
  const data = useSelector(
    (state) => state.windowActive.celestialCardContentDeployed
  );

  const RSIActualCelestialMoons = useSelector(
    (state) => state.rsi.actualCelestialObjectMoons
  );
  const RSIActualCelestialObjectStations = useSelector(
    (state) => state.rsi.actualCelestialObjectStations
  );
  const RSIActualCelestialObjectOutposts = useSelector(
    (state) => state.rsi.actualCelestialObjectOutposts
  );
  const RSIActualCelestialObjectLandingZones = useSelector(
    (state) => state.rsi.actualCelestialObjectLandingZones
  );

  useEffect(() => {
    dispatch(getRSIActualCelestialObjectInterestPoints([RSIStations, data]));
    dispatch(getRSIActualCelestialObjectMoons([RSICelestialObjects, data]));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="encyclopedia-celestial-objects-page-body">
      <NavBar factionPart="civilian" pageActive={"starCitizenEncyclopedia"} />
      <div className="encyclopedia-celestial-objects-page-main-container">
        <div className="encyclopedia-celestial-objects-page-image-wrapper">
          <span
            className="encyclopedia-celestial-objects-page-image"
            style={{
              background: `url(${data.storeImageLarge}) center/cover no-repeat `,
            }}
          >
            <div className="encyclopedia-celestial-objects-page-header">
              <div className="encyclopedia-celestial-objects-page-path">
                <>
                  <NavLink
                    to="/starCitizenEncyclopediaDetailPage"
                    className="celestial-object-details"
                    onClick={() =>
                      RSIStarSystems?.filter(
                        (starSystem) => starSystem.name === data.starsystem.name
                      ).map((starSystem) =>
                        dispatch(celestialCardContentDeployed(starSystem))
                      )
                    }
                  >
                    {data?.starsystem?.name} /
                  </NavLink>
                  <h2>{data?.name}</h2>
                </>
              </div>

              <NavLink
                to="/starCitizenEncyclopedia"
                className="close-btn-container"
                onClick={() => dispatch(celestialCardContentDeployed(false))}
              >
                <span className="first-bar"></span>
                <span className="second-bar"></span>
              </NavLink>

              <DecorationBar1 />
            </div>
            <div className="encyclopedia-celestial-objects-page-description-container">
              <DecorationBorderThick />
              <p className="encyclopedia-celestial-objects-page-description">
                {data?.description}
              </p>
            </div>
          </span>
        </div>
        <>
          {/* MOONS */}
          {RSIActualCelestialMoons && RSIActualCelestialMoons[0] ? (
            <div className="encyclopedia-celestial-objects-page-sub-container">
              <div className="encyclopedia-celestial-objects-page-container-title">
                <DecorationBar2 />
                <h2>LUNES</h2>
              </div>
              <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
                <div className="encyclopedia-celestial-objects-page-moons-container">
                  {RSIActualCelestialMoons.map((CelestialObject, index) => (
                    <>
                      <EncyclopediaObjectPageCard
                        data={CelestialObject}
                        key={index}
                      />
                    </>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* STATIONS */}
          {RSIActualCelestialObjectStations &&
          RSIActualCelestialObjectStations[0] ? (
            <div className="encyclopedia-celestial-objects-page-sub-container">
              <div className="encyclopedia-celestial-objects-page-container-title">
                <DecorationBar2 />
                <h2>STATIONS</h2>
              </div>
              <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
                <div className="encyclopedia-celestial-objects-page-moons-container">
                  {RSIActualCelestialObjectStations.map((station, index) => (
                    <>
                      <EncyclopediaObjectPageCard data={station} key={index} />
                    </>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* LANDING ZONES */}
          {RSIActualCelestialObjectLandingZones &&
          RSIActualCelestialObjectLandingZones[0] ? (
            <div className="encyclopedia-celestial-objects-page-sub-container">
              <div className="encyclopedia-celestial-objects-page-container-title">
                <DecorationBar2 />
                <h2>ZONES D'ATERRISSAGE</h2>
              </div>
              <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
                <div className="encyclopedia-celestial-objects-page-moons-container">
                  {RSIActualCelestialObjectLandingZones.map(
                    (station, index) => (
                      <>
                        <EncyclopediaObjectPageCard
                          data={station}
                          key={index}
                        />
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* OUTPOSTS */}
          {RSIActualCelestialObjectOutposts &&
          RSIActualCelestialObjectOutposts[0] ? (
            <div className="encyclopedia-celestial-objects-page-sub-container">
              <div className="encyclopedia-celestial-objects-page-container-title">
                <DecorationBar2 />
                <h2>AVANT-POSTES</h2>
              </div>
              <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
                <div className="encyclopedia-celestial-objects-page-moons-container">
                  {RSIActualCelestialObjectOutposts.map((station, index) => (
                    <>
                      <EncyclopediaObjectPageCard data={station} key={index} />
                    </>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
};

export default EncyclopediaCelestialObjectsPlanetPage;
