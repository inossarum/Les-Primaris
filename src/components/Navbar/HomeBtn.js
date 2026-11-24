import {Home} from "@mui/icons-material";
import React from "react";
import {NavLink} from "react-router-dom";

const HomeBtn = ({factionPart, pageActive}) => {
  return (
    <>
      <div className="home-button-container">
        {
          (pageActive?.includes("administration") === true ? (
            <span className={`home-switch-shutter administration`}>
              <Home className={`home-icon administration`} />
            </span>
          ) : (
            <span className={`home-switch-shutter ${factionPart}`}>
              <Home className={`home-icon ${factionPart}`} />
            </span>
          ),
          pageActive?.includes("Shop") === true ? (
            <span className={`home-switch-shutter primaris-ingame-shop`}>
              <Home className={`home-icon primaris-ingame-shop`} />
            </span>
          ) : (
            <span className={`home-switch-shutter ${factionPart}`}>
              <Home className={`home-icon ${factionPart}`} />
            </span>
          ),
          pageActive?.includes("Diablo") === true ? (
            <span className={`home-switch-shutter diabloIV`}>
              <Home className={`home-icon diabloIV`} />
            </span>
          ) : (
            <span className={`home-switch-shutter ${factionPart}`}>
              <Home className={`home-icon ${factionPart}`} />
            </span>
          ))
        }
        <div className="img-wrapper-container">
          <NavLink to="/" className="img-container">
            <img
              className="civilian-img"
              src={`./assets/img/phoenix.webp`}
              alt="logo Primaris"
            />
          </NavLink>
          <NavLink to="/militaryHome" className="img-container">
            <img
              className="military-img"
              src={`./assets/img/exercitusPrimaris.webp`}
              alt="logo Exercitus"
            />
          </NavLink>
          <NavLink to="/battlefield" className="img-container">
            <img
              className="bf2042-img"
              src={`./assets/img/bf2042.webp`}
              alt="Logo Battelfield 2042"
            />
          </NavLink>
          {/* <NavLink to="/diabloIVHome" className="img-container">
            <img
              className="diabloIV-img"
              src={`./assets/img/diabloIV.webp`}
              alt="Logo Diablo IV"
            />
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default HomeBtn;
