import React from "react";
import {NavLink} from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";

const MilitaryPatents = () => {
  return (
    <div className="military-patents-body">
      <NavBar factionPart="military" pageActive={"militaryPatents"} />
      <NavLink className="come-back-btn-container" to="/militaryMenu">
        <i className="fa-sharp fa-solid fa-chevron-left"></i>
        <h4 className="come-back">menu précédent</h4>
      </NavLink>
    </div>
  );
};

export default MilitaryPatents;
