import React from "react";
import {NavLink} from "react-router-dom";

const PrimarisIngameShopBtn = ({factionPart, pageActive}) => {
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

  return (
    <NavLink
      to={pageActive === "primarisIngameShop" ? "/" : "/primarisIngameShop"}
      className={btnClasseName}
    >
      {pageActive === "primarisIngameShop" ? "Accueil" : "Boutique Primaris"}
    </NavLink>
  );
};

export default PrimarisIngameShopBtn;
