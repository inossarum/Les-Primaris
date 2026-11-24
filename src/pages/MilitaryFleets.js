import React from "react";
import NavBar from "../components/Navbar/NavBar";
import {NavLink} from "react-router-dom";

const MilitaryFleets = () => {
    return (
        <div className="military-fleet-body">
            <NavBar pageActive={"militaryCrew"} factionPart={"military"} />
            <div className="military-fleet-title-container">
                <h2>Flottes Militaires</h2>
            </div>
            <div className="military-department-title-container">
                <span className="navlink" aria-disabled="true">État-Major — indisponible</span>
                <NavLink className="navlink" to="/aerospatialFleetsHome">
                    Aerospatial
                </NavLink>
                <span className="navlink" aria-disabled="true">Logistique — indisponible</span>
                <span className="navlink" aria-disabled="true">Forces spéciales — indisponible</span>
            </div>
        </div>
    );
};

export default MilitaryFleets;
