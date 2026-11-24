import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {celestialCardContentDeployed} from "../../feature/window.slice";
import {NavLink} from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import DecorationBar1 from "../Decorations/DecorationBar1";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";

const EncyclopediaCelestialObjectsAsteroidBeltPage = () => {
  const dispatch = useDispatch();

  const RSIStarSystems = useSelector((state) => state.rsi.starSystems);

  const data = useSelector(
    (state) => state.windowActive.celestialCardContentDeployed
  );

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
      </div>
    </div>
  );
};

export default EncyclopediaCelestialObjectsAsteroidBeltPage;
