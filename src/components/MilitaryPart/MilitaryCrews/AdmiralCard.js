import React from "react";
import {useDispatch, useSelector} from "react-redux";
import ShipHierachicalSuperiorChoice from "../../UserHangar/ShipHierachicalSuperiorChoice";
import ShipRankChoice from "../../UserHangar/ShipRankChoice";
import {setFleetCardActive} from "../../../feature/window.slice";
import {Close} from "@mui/icons-material";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import UnderFleetCommanderCard from "./UnderFleetCommanderCard";
import ShipFleetChoice from "../../UserHangar/ShipFleetChoice";

const AdmiralCard = ({fleetCard}) => {
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
    const shipCommander = fleetCard?.crewMembers?.find(
        (member) => member?.job === "commandant"
    );
    const shipPilot = fleetCard?.crewMembers?.find(
        (member) => member?.job === "pilote"
    );

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

        if (fleetCard?.newShipHierarchicalSuperior?.id) {
            await updateDoc(
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
              );
        }

        await deleteDoc(doc(db, "shipsAndCrews", fleetCard.id));

        dispatch(setFleetCardActive(["", false]));
    };

    return (
        <div>
            <div
                className="admiral-card-main-container"
                onMouseEnter={(e) => handleRemoveAssociatedNotification(e)}
            >
                {fleetCardActive.state === true &&
                fleetCardActive.id === fleetCard.id ? (
                    <div className="admiral-card-ship-detail-rank-container">
                        <div className="admiral-card-ship-images-container">
                            <div
                                className="admiral-card-ship-rank-container"
                                style={{
                                    background: `url(${fleetCard.ship.storeImageLarge}) center/cover no-repeat`,
                                }}
                            >
                                {user &&
                                [...user?.notifications].find(
                                    (notification) =>
                                        (notification?.associatedSharedShip ===
                                            fleetCard?.notificationId &&
                                            notification?.type ===
                                                "nouveau vaisseau militaire partagé") ||
                                        (notification?.associatedSharedShip ===
                                            fleetCard?.notificationId &&
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
                                src={`./assets/img/departments/military-ranks/amiral.webp`}
                                alt={`rang d(e)'amiral`}
                                className="admiral-card-rank-opened"
                            />
                        </div>
                        <Close
                            className="admiral-card-close-button"
                            onClick={() =>
                                dispatch(setFleetCardActive(["", false]))
                            }
                        />
                        <div
                            className="flex-row-center-center border-red3 w-300 info-red-uppercase"
                            onClick={(e) => deleteShipFromDB(e)}
                        >
                            <h3> Supprimer ce vaisseau de la DB</h3>
                        </div>

                        {user.userId === "m76FQbm4ptRTm2b0JZzZv5aeNm83" ? (
                            <h4>
                                ID:{" "}
                                <span className="info-yellow-capitalize">
                                    {fleetCard?.id}
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}

                        {fleetCard?.fleet !== "" ? (
                            <h4>
                                Rang:{" "}
                                <span className="info-yellow-capitalize">
                                    {fleetCard?.rank?.slice(5)}
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}
                        {fleetCard?.ship.name ? (
                            <h3>Type: {fleetCard?.ship.name}</h3>
                        ) : (
                            ""
                        )}
                        {fleetCard?.shipName ? (
                            <div div className="flex-row">
                                <span className="margin-r-10">
                                    {"Nom:    "}{" "}
                                </span>
                                <h3 className="info-blue-capitalize">
                                    {" " +
                                        fleetCard?.fleet +
                                        " " +
                                        fleetCard?.shipName}
                                </h3>
                            </div>
                        ) : (
                            ""
                        )}
                        {shipCommander !== undefined ? (
                            <h3>Commandant: {shipCommander.pseudo}</h3>
                        ) : (
                            ""
                        )}
                        {shipPilot !== undefined &&
                        fleetCard.crewMembers.length < 2 ? (
                            <h3>Pilote: {shipPilot.pseudo}</h3>
                        ) : (
                            ""
                        )}

                        {user.webSiteRole === "administrateur" ||
                        user.webSiteRole === "moderateur" ? (
                            <div className="flex-row">
                                {(fleetCard?.ownerId === user.userId ||
                                    user.webSiteRole === "administrateur" ||
                                    "moderateur") &&
                                fleetCard?.shared === "oui" ? (
                                    <ShipFleetChoice
                                        ownedShipDatas={fleetCard}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}

                        {(fleetCard?.fleet !== "" &&
                            user.webSiteRole === "administrateur") ||
                        (fleetCard?.fleet !== "" &&
                            user.webSiteRole === "moderateur") ? (
                            <div className="flex-row">
                                {(fleetCard?.ownerId === user.userId ||
                                    user.webSiteRole === "administrateur" ||
                                    "moderateur") &&
                                fleetCard?.shared === "oui" ? (
                                    <ShipRankChoice
                                        ownedShipDatas={fleetCard}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}

                        {fleetCard?.rank !== "01 - vaisseau amiral" ? (
                            <div className="flex-row">
                                {fleetCard?.fleet !== "" ? (
                                    <h4>
                                        Supérieur Hiérarchique:{" "}
                                        {fleetCard?.newShipHierachicalSuperior !==
                                        "" ? (
                                            <span className="info-yellow-capitalize">
                                                {fleetCard &&
                                                    fleetCard
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
                        {(fleetCard?.fleet !== "" &&
                            user.webSiteRole === "administrateur") ||
                        (fleetCard?.fleet !== "" &&
                            user.webSiteRole === "moderateur") ? (
                            <div className="flex-row">
                                {fleetCard?.ownerId === user.userId ||
                                user.webSiteRole === "administrateur" ||
                                (user.webSiteRole === "moderateur" &&
                                    fleetCard?.shared === "oui") ? (
                                    <ShipHierachicalSuperiorChoice
                                        ownedShipDatas={fleetCard}
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
                    <div className="admiral-card-ship-detail-rank-container">
                        <div className="admiral-card-ship-images-container">
                            <div
                                className="admiral-card-ship-rank-container"
                                style={{
                                    background: `url(${fleetCard.ship.storeImageLarge}) center/cover no-repeat`,
                                }}
                                onClick={() =>
                                    dispatch(
                                        setFleetCardActive([fleetCard.id, true])
                                    )
                                }
                            ></div>
                            <img
                                src={`./assets/img/departments/military-ranks/amiral.webp`}
                                alt={`rang d(e)'amiral`}
                                className="admiral-card-rank-closed"
                            />
                        </div>
                    </div>
                )}
                {fleetCard?.subordonateShips[0] ? (
                    <div className="admiral-card-subordonate-main-container">
                        {fleetCard?.subordonateShips[1] ? (
                            <span className="separator-left"></span>
                        ) : (
                            ""
                        )}
                        <div className="admiral-card-subordonate-container">
                            {fleetCard?.subordonateShips?.map((ship) => (
                                <span key={ship.id}>
                                    <UnderFleetCommanderCard
                                        underFleetCommanderShip={ship}
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

export default AdmiralCard;
