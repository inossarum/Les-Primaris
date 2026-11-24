import React from "react";
import {NavLink} from "react-router-dom";

const AdministrationBtn = ({factionPart, pageActive}) => {
  let btnClasseName = "";

  switch (factionPart) {
    case "civilian":
      btnClasseName = "civilian-btn";
      break;
    case "military":
      btnClasseName = "military-btn";
      break;
    case "battlefield":
      btnClasseName = "bf2042-btn";
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

  if (pageActive === "administrationHome") {
    return (
      <NavLink to={"/"} className={btnClasseName}>
        {"Accueil"}
      </NavLink>
    );
  } else if (pageActive === "administrationUsers") {
    return (
      <NavLink to={"/administrationHome"} className={btnClasseName}>
        {"Administration Centrale"}
      </NavLink>
    );
  } else {
    return (
      <NavLink to={"/administrationHome"} className={btnClasseName}>
        {"Administration Centrale"}
      </NavLink>
    );
  }
};

export default AdministrationBtn;
