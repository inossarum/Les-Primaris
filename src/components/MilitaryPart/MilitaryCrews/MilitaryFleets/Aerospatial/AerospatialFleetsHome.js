import React from "react";
import NavBar from "../../../../Navbar/NavBar";
import {NavLink} from "react-router-dom";

const AerospatialFleetsHome = () => {
    return (
        <div className="military-fleet-body">
            <NavBar
                pageActive={"aerospatialFleetsHome"}
                factionPart={"military"}
            />
            <div className="military-fleet-title-container">
                <h2>Flottes du département de l'Aerospatial</h2>
            </div>
            <div className="military-department-title-container ">
                <span className="navlink" aria-disabled="true">Flottes d’attaque — indisponibles</span>
                <NavLink className="navlink" to="/EX1RcFleetPanel">
                    Flottes de Reconnaissance
                </NavLink>
                <span className="navlink" aria-disabled="true">Flottes de défense — indisponibles</span>
            </div>
            <div className="aerospatial-fleets-home-body"></div>
        </div>
    );
};

export default AerospatialFleetsHome;
