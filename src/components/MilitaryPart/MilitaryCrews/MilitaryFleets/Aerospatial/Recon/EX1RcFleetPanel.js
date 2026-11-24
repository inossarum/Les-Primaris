import React from "react";
import NavBar from "../../../../../Navbar/NavBar";
import {useSelector} from "react-redux";
import FleetCard from "../../../FleetCard";
import AdmiralCard from "../../../AdmiralCard";

export default function EX1RcFleetPanel() {
    const firstReconFleet = useSelector(
        (state) => state.sharedShips.firstReconFleet
    );
    const aerospatial = useSelector(
        (state) => state.sharedShips.aerospatialShips
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
                <span className="navlink" aria-current="page">1ère flotte</span>
                <span className="navlink" aria-disabled="true">2ème flotte — indisponible</span>
                <span className="navlink" aria-disabled="true">3ème flotte — indisponible</span>
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
                                                  key={fleetCard.id}
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
                                                  key={fleetCard.id}
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
