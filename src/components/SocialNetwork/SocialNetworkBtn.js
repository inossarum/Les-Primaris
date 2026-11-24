import React from "react";
import {NavLink} from "react-router-dom";

const SocialNetworkBtn = ({factionPart, pageActive}) => {
  return factionPart === "military" ? (
    <NavLink to="/socialNetwork" className="military-btn">
      {pageActive === "socialNetwork" ? "Accueil" : "Centre de communication"}
    </NavLink>
  ) : (
    <NavLink
      to={pageActive === "socialNetwork" ? "/" : "/socialNetwork"}
      className="civilian-btn"
    >
      {pageActive === "socialNetwork" ? "Accueil" : "Centre de communication"}
    </NavLink>
  );
};

export default SocialNetworkBtn;
