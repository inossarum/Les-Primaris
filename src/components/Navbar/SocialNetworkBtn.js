import React from "react";
import {NavLink} from "react-router-dom";

const SocialNetworkBtn = ({factionPart, pageActive}) => {
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
      to={pageActive === "socialNetwork" ? "/" : "/socialNetwork"}
      className={btnClasseName}
    >
      {pageActive === "socialNetwork" ? "Accueil" : "centre de communication"}
    </NavLink>
  );
};

export default SocialNetworkBtn;
