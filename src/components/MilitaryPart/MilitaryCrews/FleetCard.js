import React from "react";
import {useDispatch, useSelector} from "react-redux";
import ShipHierachicalSuperiorChoice from "../../UserHangar/ShipHierachicalSuperiorChoice";
import ShipRankChoice from "../../UserHangar/ShipRankChoice";
import {setFleetCardActive} from "../../../feature/window.slice";
import {Close} from "@mui/icons-material";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import ShipFleetChoice from "../../UserHangar/ShipFleetChoice";
import SubordonateCard from "./SubordonateCard";
import SubordonateRankFilter from "./MilitaryFleets/SubordonateRankFilter";

const FleetCard = ({fleetCard}) => {
    const dispatch = useDispatch();
    const fleetCardActive = useSelector(
        (state) => state.windowActive.setFleetCardActive
    );
    const sharedShipList = useSelector(
        (state) => state.sharedShips.sharedShipsList
    );
    const fleetCardSuperiorShip = sharedShipList.filter(
        (ship) => ship.id === fleetCard?.newShipHierarchicalSuperior?.id
    );

    const shipCommander = fleetCard?.crewMembers[0]
        ? fleetCard?.crewMembers.find((member) => member?.job === "commandant")
        : "";

    const shipPilot = fleetCard?.crewMembers[0]
        ? fleetCard?.crewMembers.find((member) => member?.job === "pilote")
        : "";

    const actualShip = sharedShipList[0]
        ? sharedShipList.find(
              (shipFromList) => shipFromList.id === fleetCard.id
          )
        : "";

    const user = useSelector((state) => state.user);

    const handleRemoveAssociatedNotification = async (e) => {
        e.preventDefault();
        const userNotificationsAfterRemoval = user.notifications.filter(
            (notification) =>
                notification?.associatedSharedShip !== fleetCard?.notificationId
        );

        await updateDoc(doc(db, "users", user.userId), {
            notifications: userNotificationsAfterRemoval,
        });
    };

    const deleteShipFromDB = async (e) => {
        e.preventDefault();

        fleetCard?.newShipHierarchicalSuperior !== (undefined || null || "")
            ? await updateDoc(
                  doc(
                      db,
                      "shipsAndCrews",
                      fleetCard?.newShipHierarchicalSuperior?.id
                  ),
                  {
                      subordonateShips:
                          fleetCardSuperiorShip[0]?.subordonateShips?.filter(
                              (ship) => ship?.id !== fleetCard?.id
                          ),
                  }
              )
            : console.log("shipSuperior inexistant");

        await deleteDoc(doc(db, "shipsAndCrews", fleetCard.id));

        dispatch(setFleetCardActive(["", false]));
    };

    // const user = useSelector((state) => state.user);
    // const shipSelectionActive = useSelector(
    //     (state) => state.windowActive.shipSelectionActive
    // );
    // const actualSelectedShip = useSelector(
    //     (state) => state.sharedShips.actualShipSelected
    // );
    // const firstReconShipsFleet = useSelector(
    //     (state) => state.sharedShips.firstReconFleet
    // );

    return (
        <div>
            <div
                className="fleet-card-main-container"
                onMouseEnter={(e) => handleRemoveAssociatedNotification(e)}
            >
                {fleetCardActive.state === true &&
                fleetCardActive.id === actualShip.id ? (
                    <div className="fleet-card-ship-detail-rank-container">
                        <div className="fleet-card-ship-images-container">
                            <div
                                className="fleet-card-ship-rank-container"
                                style={{
                                    background: `url(${actualShip.ship.storeImageLarge}) center/cover no-repeat`,
                                }}
                            >
                                {user &&
                                [...user?.notifications].find(
                                    (notification) =>
                                        (notification?.associatedSharedShip ===
                                            actualShip?.notificationId &&
                                            notification?.type ===
                                                "nouveau vaisseau militaire partagé") ||
                                        (notification?.associatedSharedShip ===
                                            actualShip?.notificationId &&
                                            notification?.type ===
                                                "nouveau vaisseau civil partagé")
                                ) ? (
                                    <div className="new-shared-ship text-center">
                                        <span>Nouveau</span>
                                    </div>
                                ) : (
                                    <span></span>
                                )}
                            </div>
                            {/* <img
                                src={`./assets/img/departments/military-ranks/general de brigade.webp`}
                                alt={`rang d(e)'amiral`}
                                className="fleet-card-rank-opened"
                            /> */}
                        </div>
                        <Close
                            className="fleet-card-close-button"
                            onClick={() =>
                                dispatch(setFleetCardActive(["", false]))
                            }
                        />
                        <div className="flex-row">
                            {" "}
                            <h3> Supprimer ce vaisseau de la DB</h3>
                            <Close
                                onClick={(e) => deleteShipFromDB(e)}
                                className="info-red-uppercase "
                            />
                        </div>

                        {user.userId === "m76FQbm4ptRTm2b0JZzZv5aeNm83" ? (
                            <h4>
                                ID:{" "}
                                <span className="info-yellow-capitalize">
                                    {actualShip?.id}
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}

                        {actualShip?.fleet !== "" ? (
                            <h4>
                                Rang:{" "}
                                <span className="info-yellow-capitalize">
                                    {actualShip?.rank?.slice(5)}
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}
                        {actualShip?.ship.name ? (
                            <h3>Type: {actualShip?.ship.name}</h3>
                        ) : (
                            ""
                        )}
                        {actualShip?.shipName ? (
                            <h3>
                                Nom:{" "}
                                {actualShip?.fleet + " " + actualShip?.shipName}
                            </h3>
                        ) : (
                            ""
                        )}
                        {shipCommander && shipCommander !== undefined ? (
                            <h3>Commandant: {shipCommander.pseudo}</h3>
                        ) : (
                            ""
                        )}
                        {shipPilot && shipPilot !== undefined ? (
                            <h3>Pilote: {shipPilot.pseudo}</h3>
                        ) : (
                            ""
                        )}

                        {user.webSiteRole === "administrateur" ||
                        user.webSiteRole === "moderateur" ? (
                            <div className="flex-row">
                                {(actualShip?.ownerId === user.userId ||
                                    user.webSiteRole === "administrateur" ||
                                    "moderateur") &&
                                actualShip?.shared === "oui" ? (
                                    <ShipFleetChoice
                                        ownedShipDatas={actualShip}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}

                        {user.webSiteRole === "administrateur" ||
                        user.webSiteRole === "moderateur" ? (
                            <div className="flex-row">
                                {(actualShip?.ownerId === user.userId ||
                                    user.webSiteRole === "administrateur" ||
                                    "moderateur") &&
                                actualShip?.shared === "oui" ? (
                                    <ShipRankChoice
                                        ownedShipDatas={actualShip}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}

                        {actualShip?.rank !== "01 - vaisseau amiral" ? (
                            <div className="flex-row">
                                {actualShip?.fleet !== "" ? (
                                    <h4>
                                        Supérieur Hiérarchique:{" "}
                                        {actualShip?.newShipHierachicalSuperior !==
                                        "" ? (
                                            <span className="info-yellow-capitalize">
                                                {actualShip &&
                                                    actualShip
                                                        ?.newShipHierarchicalSuperior
                                                        ?.shipName}
                                            </span>
                                        ) : (
                                            <span className="info-red-uppercase ">
                                                Aucun
                                            </span>
                                        )}
                                    </h4>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                        {user.webSiteRole === "administrateur" ||
                        user.webSiteRole === "moderateur" ? (
                            <div className="flex-row">
                                {actualShip?.ownerId === user.userId ||
                                user.webSiteRole === "administrateur" ||
                                (user.webSiteRole === "moderateur" &&
                                    actualShip?.shared === "oui") ? (
                                    <ShipHierachicalSuperiorChoice
                                        ownedShipDatas={actualShip}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    <div className="fleet-card-ship-detail-rank-container">
                        <div className="fleet-card-ship-images-container">
                            <div
                                className="fleet-card-ship-rank-container"
                                style={{
                                    background: `url(${actualShip.ship.storeImageLarge}) center/cover no-repeat`,
                                }}
                                onClick={() =>
                                    dispatch(
                                        setFleetCardActive([
                                            actualShip.id,
                                            true,
                                        ])
                                    )
                                }
                            ></div>
                            {/* <img
                                src={`./assets/img/departments/military-ranks/general de brigade.webp`}
                                alt={`rang d(e)'amiral`}
                                className="fleet-card-rank-closed"
                            /> */}
                        </div>
                    </div>
                )}
                {fleetCard?.fleet !== "" && fleetCard?.subordonateShips[0] ? (
                    <>
                        <h4>Subordonnés: </h4>
                        {fleetCard?.subordonateShips?.map((ship) => (
                            <span className="info-yellow-capitalize">
                                <SubordonateRankFilter
                                    key={Math.random()}
                                    fleetCard={ship}
                                />
                            </span>
                        ))}
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default FleetCard;
