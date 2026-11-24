import React from "react";
import {NavLink} from "react-router-dom";

const SCEncyclopediaBtn = ({factionPart, pageActive}) => {
  let btnClasseName = "";
  let navLinkTo = "";
  let btnTitle = "";

  switch (factionPart) {
    case "civilian":
      btnClasseName = "civilian-btn";
      navLinkTo = `${
        pageActive === "starCitizenEncyclopedia"
          ? "/"
          : "/starCitizenEncyclopedia"
      }`;
      btnTitle = `${
        pageActive === "starCitizenEncyclopedia" ? "Accueil" : "Encyclopédie SC"
      }`;
      break;
    case "military":
      btnClasseName = "military-btn";
      navLinkTo = `${
        pageActive === "starCitizenEncyclopedia"
          ? "/militaryHome"
          : "/starCitizenEncyclopedia"
      }`;
      btnTitle = `${
        pageActive === "starCitizenEncyclopedia" ? "Accueil" : "Encyclopédie SC"
      }`;
      break;
    case "primarisIngameShop":
      btnClasseName = "primaris-ingame-shop-btn";
      break;
    case "administration":
      btnClasseName = "administration-btn";
      break;
    case "diabloIV":
      btnClasseName = "diabloIV-btn";
      break;
    default:
  }

  if (factionPart === "battlefield") {
    return <NavLink></NavLink>;
  } else {
    return (
      <NavLink to={navLinkTo} className={btnClasseName}>
        {btnTitle}
      </NavLink>
    );
  }
};

export default SCEncyclopediaBtn;
