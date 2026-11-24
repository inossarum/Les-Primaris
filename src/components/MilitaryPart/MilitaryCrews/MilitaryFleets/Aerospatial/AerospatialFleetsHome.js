import React from "react";
import {useDispatch, useSelector} from "react-redux";
import NavBar from "../../../../Navbar/NavBar";
import {NavLink} from "react-router-dom";

const AerospatialFleetsHome = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const militaryShips = useSelector((state) =>
        state.sharedShips.sharedShipsList
            .filter((ship) => ship.factionPart === "militaire")
            .map((ship) => ship.id)
    );

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
                <NavLink className="navlink" to="">
                    Flottes d'Attaque
                </NavLink>
                <NavLink className="navlink" to="/EX1RcFleetPanel">
                    Flottes de Reconnaissance
                </NavLink>
                <NavLink className="navlink" to="">
                    Flottes de Défense
                </NavLink>
            </div>
            <div className="aerospatial-fleets-home-body"></div>
        </div>
    );
};

export default AerospatialFleetsHome;
