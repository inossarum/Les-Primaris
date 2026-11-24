import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {celestialCardContentDeployed} from "../../feature/window.slice";
import {NavLink} from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import DecorationBar1 from "../Decorations/DecorationBar1";
import DecorationBar2 from "../Decorations/DecorationBar2";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";

const EncyclopediaStarSystemPage = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.windowActive.celestialCardContentDeployed
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="encyclopedia-star-system-page-body">
      <NavBar factionPart="civilian" pageActive={"starCitizenEncyclopedia"} />
      <div className="encyclopedia-star-system-page-main-container">
        <div className="encyclopedia-star-system-page-image-wrapper">
          <span
            className="encyclopedia-star-system-page-image"
            style={{
              background: `url(${data.storeImageLarge}) center/cover no-repeat `,
            }}
          >
            <div className="encyclopedia-star-system-page-header">
              <div className="encyclopedia-star-system-page-path">
                <>
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
            <div className="encyclopedia-star-systems-page-description-container">
              <DecorationBorderThick />
              <p className="encyclopedia-star-systems-page-description">
                {data?.description}
              </p>
            </div>
          </span>
        </div>
        <>
          <div className="encyclopedia-star-system-page-sub-container">
            <div className="encyclopedia-star-system-page-container-title">
              <DecorationBar2 />
              <h2>PLANETES</h2>
            </div>
            <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
              <div className="encyclopedia-star-system-page-moons-container">
                {data.celestialObjects &&
                  data.celestialObjects.map((celestialObject) => (
                    <EncyclopediaObjectPageCard
                      data={celestialObject}
                      key={celestialObject.id ?? celestialObject.name}
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default EncyclopediaStarSystemPage;
