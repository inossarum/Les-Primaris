import React from "react";
import NavBar from "../../../../../Navbar/NavBar";
import {useSelector} from "react-redux";
import FleetCard from "../../../FleetCard";
import AdmiralCard from "../../../AdmiralCard";
import {NavLink} from "react-router-dom";

export default function EX1RcFleetPanel() {
    const firstReconFleet = useSelector(
        (state) => state.sharedShips.firstReconFleet
    );

    const aerospatial = useSelector(
        (state) => state.sharedShips.aerospatialShips
    );

    console.log(
        aerospatial?.filter(
            (ship) =>
                ship.rank === "" ||
                (ship.rank !== "" &&
                    ship.oldShipHierarchicalSuperior !== "" &&
                    ship.newShipHierarchicalSuperior === "") ||
                (ship.rank !== "" &&
                    ship.oldShipHierarchicalSuperior === "" &&
                    ship.newShipHierarchicalSuperior === "" &&
                    ship.rank !== "01 - vaisseau amiral")
        )
    );

    return (
        <div className="military-fleet-body">
            <NavBar
                pageActive={"aerospatialFleetsHome"}
                factionPart={"military"}
            />
            <div className="military-fleet-title-container">
                <h2>1ère flotte de reconnaissance</h2>
            </div>
            <div className="military-department-title-container ">
                <NavLink className="navlink" to="">
                    1ère flotte
                </NavLink>
                <NavLink className="navlink" to="/EX1RcFleetPanel">
                    2ème flotte
                </NavLink>
                <NavLink className="navlink" to="">
                    3ème flotte
                </NavLink>
            </div>
            <div>
                <div className="military-fleet-main-container">
                    <div className="military-fleet-sub-container">
                        {/* {user.webSiteRole === "administrateur" ? (
                                <>
                                    <h4>
                                        Supprimer tous les vaisseaux de la DB
                                    </h4>
                                    <div className="military-fleet-card-admiral-ship-main-container">
                                        <Close
                                            onClick={() =>
                                                handleRemoveShipsFromDB()
                                            }
                                        />
                                    </div>{" "}
                                </>
                            ) : (
                                ""
                            )} */}

                        <div className="military-fleet-card-admiral-ship-main-container">
                            {/* Vaisseau Amiral */}
                            <h3>Batiments non affectés</h3>
                            <div className="military-fleet-card-sub-container">
                                {aerospatial && aerospatial?.[0]
                                    ? aerospatial
                                          ?.filter(
                                              (ship) =>
                                                  ship.rank === "" ||
                                                  (ship.rank !== "" &&
                                                      ship.oldShipHierarchicalSuperior !==
                                                          "" &&
                                                      ship.newShipHierarchicalSuperior ===
                                                          "") ||
                                                  (ship.rank !== "" &&
                                                      ship.oldShipHierarchicalSuperior ===
                                                          "" &&
                                                      ship.newShipHierarchicalSuperior ===
                                                          "" &&
                                                      ship.rank !==
                                                          "01 - vaisseau amiral")
                                          )
                                          .map((fleetCard) => (
                                              <FleetCard
                                                  fleetCard={fleetCard}
                                                  key={Math.random()}
                                              />
                                          ))
                                    : ""}
                            </div>
                        </div>
                        <div className="military-fleet-card-admiral-ship-main-container">
                            {/* Vaisseau Amiral */}
                            <div className="military-fleet-card-sub-container">
                                <h4>Vaisseau Amiral: </h4>
                                {firstReconFleet && firstReconFleet?.[0]
                                    ? [...firstReconFleet]
                                          .filter(
                                              (fleetCard) =>
                                                  fleetCard.rank ===
                                                  "01 - vaisseau amiral"
                                          )
                                          .map((fleetCard, index) => (
                                              <AdmiralCard
                                                  fleetCard={fleetCard}
                                                  key={Math.random()}
                                              />
                                          ))
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
