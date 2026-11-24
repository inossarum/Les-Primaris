import React from "react";
import {NavLink} from "react-router-dom";

const CareerBtn = ({factionPart, pageActive}) => {
  let btnClasseName = "";
  let navLinkTo = "";
  let btnTitle = "";

  switch (factionPart) {
    case "civilian":
      btnClasseName = "civilian-btn";
      navLinkTo = `${
        pageActive === "civilianCareers" ? "/" : "/civilianCareers"
      }`;
      btnTitle = `${
        pageActive === "civilianCareers" ? "Accueil" : "Départements Civils"
      }`;
      break;
    case "military":
      btnClasseName = "military-btn";
      navLinkTo = `${
        pageActive === "militaryMenu" ? "/militaryHome" : "/militaryMenu"
      }`;
      btnTitle = `${
        pageActive === "militaryMenu" ? "Accueil" : "Menu Militaire"
      }`;
      break;
    case "battlefield":
      btnClasseName = "bf2042-btn";
      navLinkTo = `/civilianCareers`;
      btnTitle = `carrières`;
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

  return (
    <NavLink to={navLinkTo} className={btnClasseName}>
      {btnTitle}
    </NavLink>
  );
};

export default CareerBtn;
