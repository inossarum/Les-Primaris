import React from "react";
import {NavLink} from "react-router-dom";

const ContactBtn = ({factionPart, pageActive}) => {
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
      to={pageActive === "contact" ? "/" : "/contact"}
      className={btnClasseName}
    >
      {pageActive === "contact" ? "Accueil" : "nous contacter"}
    </NavLink>
  );
};

export default ContactBtn;
