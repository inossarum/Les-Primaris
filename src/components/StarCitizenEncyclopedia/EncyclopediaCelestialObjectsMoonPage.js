import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {celestialCardContentDeployed} from "../../feature/window.slice";
import {NavLink} from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import DecorationBar1 from "../Decorations/DecorationBar1";
import DecorationBar2 from "../Decorations/DecorationBar2";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";
import {getRSIActualCelestialObjectInterestPoints} from "../../feature/rsi.slice";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";

const EncyclopediaCelestialObjectsMoonPage = () => {
  const dispatch = useDispatch();
  const RSICelestialObjects = useSelector(
    (state) => state.rsi.celestialObjects
  );
  const RSIStarSystems = useSelector((state) => state.rsi.starSystems);
  const RSIStations = useSelector((state) => state.rsi.stations);
  const data = useSelector(
    (state) => state.windowActive.celestialCardContentDeployed
  );
  const RSIActualCelestialObjectStations = useSelector(
    (state) => state.rsi.actualCelestialObjectStations
  );
  const RSIActualCelestialObjectOutposts = useSelector(
    (state) => state.rsi.actualCelestialObjectOutposts
  );

  useEffect(() => {
    if (RSIStations && data) {
      dispatch(getRSIActualCelestialObjectInterestPoints([RSIStations, data]));
    }
    window.scrollTo(0, 0);
  }, [RSIStations, data, dispatch]);

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
                {
                  <>
                    <NavLink
                      to="/starCitizenEncyclopediaDetailPage"
                      className="celestial-object-details"
                      onClick={() =>
                        RSIStarSystems.filter(
                          (starSystem) =>
                            starSystem.name === data.starsystem.name
                        ).map((starSystem) =>
                          dispatch(celestialCardContentDeployed(starSystem))
                        )
                      }
                    >
                      {data?.starsystem.name} /
                    </NavLink>
                    <NavLink
                      to="/starCitizenEncyclopediaDetailPage"
                      className="celestial-object-details"
                      onClick={() => {
                        RSICelestialObjects.filter(
                          (celestialObject) =>
                            celestialObject.name === data.parent.name
                        ).map((celestialObject) =>
                          dispatch(
                            celestialCardContentDeployed(celestialObject)
                          )
                        );
                      }}
                    >
                      {data?.parent.name} /
                    </NavLink>
                    <h2>{data?.name}</h2>{" "}
                  </>
                }
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

        {RSIActualCelestialObjectStations &&
        RSIActualCelestialObjectStations[0] ? (
          <div className="encyclopedia-celestial-objects-page-sub-container">
            <div className="encyclopedia-celestial-objects-page-container-title">
              <DecorationBar2 />
              <h2>STATIONS</h2>
            </div>
            <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
              <div className="encyclopedia-celestial-objects-page-moons-container">
                {RSIActualCelestialObjectStations.map((station) => (
                  <>
                    <EncyclopediaObjectPageCard
                      data={station}
                      key={station.name}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {RSIActualCelestialObjectOutposts &&
        RSIActualCelestialObjectOutposts[0] ? (
          <div className="encyclopedia-celestial-objects-page-sub-container">
            <div className="encyclopedia-celestial-objects-page-container-title">
              <DecorationBar2 />
              <h2>AVANT-POSTES</h2>
            </div>
            <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
              <div className="encyclopedia-celestial-objects-page-moons-container">
                {RSIActualCelestialObjectOutposts.map((station) => (
                  <>
                    <EncyclopediaObjectPageCard
                      data={station}
                      key={station.name}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EncyclopediaCelestialObjectsMoonPage;
