import React from "react";
import {useDispatch, useSelector} from "react-redux";
import ShipHierachicalSuperiorChoice from "../../UserHangar/ShipHierachicalSuperiorChoice";
import ShipRankChoice from "../../UserHangar/ShipRankChoice";
import {setFleetCardActive} from "../../../feature/window.slice";
import {Close} from "@mui/icons-material";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";

import WingManCard from "./WingManCard";
import ShipFleetChoice from "../../UserHangar/ShipFleetChoice";

const SquadronChiefCard = ({squadronChiefShip}) => {
    const dispatch = useDispatch();
    const fleetCardActive = useSelector(
        (state) => state.windowActive.setFleetCardActive
    );
    const sharedShipList = useSelector(
        (state) => state.sharedShips.sharedShipsList
    );

    const actualShip = sharedShipList.find(
        (shipFromList) => shipFromList.id === squadronChiefShip.id
    );
    const fleetCardSuperiorShip = sharedShipList.filter(
        (ship) => ship.id === actualShip?.newShipHierarchicalSuperior?.id
    );
    const shipCommander = actualShip?.crewMembers?.find(
        (member) => member?.job === "commandant"
    );
    const shipPilot = actualShip?.crewMembers?.find(
        (member) => member?.job === "pilote"
    );

    const user = useSelector((state) => state.user);

    const handleRemoveAssociatedNotification = async (e) => {
        e.preventDefault();
        const userNotificationsAfterRemoval = user.notifications.filter(
            (notification) =>
                notification?.associatedSharedShip !==
                actualShip?.notificationId
        );

        await updateDoc(doc(db, "users", user.userId), {
            notifications: userNotificationsAfterRemoval,
        });
    };

    const deleteShipFromDB = async (e) => {
        e.preventDefault();

        if (actualShip?.newShipHierarchicalSuperior?.id) {
            await updateDoc(
                  doc(
                      db,
                      "shipsAndCrews",
                      actualShip?.newShipHierarchicalSuperior?.id
                  ),
                  {
                      subordonateShips:
                          fleetCardSuperiorShip[0]?.subordonateShips?.filter(
                              (ship) => ship?.id !== actualShip?.id
                          ),
                  }
              );
        }

        await deleteDoc(doc(db, "shipsAndCrews", actualShip.id));

        dispatch(setFleetCardActive(["", false]));
    };

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
                            <img
                                src={`./assets/img/departments/military-ranks/major.webp`}
                                alt={`rang d(e)'amiral`}
                                className="fleet-card-rank-opened"
                            />
                        </div>
                        <Close
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
                            <h3>Nom: {actualShip?.shipName}</h3>
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

                        {(actualShip?.fleet !== "" &&
                            user.webSiteRole === "administrateur") ||
                        (actualShip?.fleet !== "" &&
                            user.webSiteRole === "moderateur") ? (
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
                        {(actualShip?.fleet !== "" &&
                            user.webSiteRole === "administrateur") ||
                        (actualShip?.fleet !== "" &&
                            user.webSiteRole === "moderateur") ? (
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
                            <img
                                src={`./assets/img/departments/military-ranks/major.webp`}
                                alt={`rang d(e)'amiral`}
                                className="fleet-card-rank-closed"
                            />
                        </div>
                    </div>
                )}
                {actualShip?.subordonateShips[0] ? (
                    <div className="fleet-card-subordonate-main-container">
                        <span className="separator"></span>
                        {actualShip?.subordonateShips[1] ? (
                            <span className="separator-left"></span>
                        ) : (
                            ""
                        )}
                        <h4>Ailiers: </h4>
                        <div className="fleet-card-subordonate-container">
                            {actualShip?.subordonateShips?.map((ship) => (
                                <span
                                    className="info-yellow-capitalize "
                                    key={ship.id}
                                >
                                    <WingManCard
                                        wingManShip={ship}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default SquadronChiefCard;
