import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";
import {setActualShipSelected} from "../../feature/sharedShips.slice";
import OwnedShipCardInformationsPanel from "./OwnedShipCardInformationsPanel";
import {setShipSelectionActive} from "../../feature/window.slice";
import DecorationBorderThickBlue from "../Decorations/DecorationBorderThickBlue";
import DecorationBorderThickYellow from "../Decorations/DecorationBorderThickYellow";

const OwnedShipCard = ({ownedShip, pageActive}) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const shipSelectionActive = useSelector(
        (state) => state.windowActive.shipSelectionActive
    );
    const actualSelectedShip = useSelector(
        (state) => state.sharedShips.actualShipSelected
    );

    const handleRemoveAssociatedNotification = async (e) => {
        e.preventDefault();
        const userNotificationsAfterRemoval = user.notifications.filter(
            (notification) =>
                notification?.associatedSharedShip !== ownedShip?.notificationId
        );

        await updateDoc(doc(db, "users", user.userId), {
            notifications: userNotificationsAfterRemoval,
        });
    };

    return (
        <div
            className={
                ownedShip.factionPart === "militaire"
                    ? "owned-ship-card-body border-blue4"
                    : "owned-ship-card-body border-yellow3"
            }
            onMouseEnter={(e) => handleRemoveAssociatedNotification(e)}
            onClick={() => dispatch(setActualShipSelected(ownedShip))}
        >
            {ownedShip.factionPart === "militaire" ? (
                <DecorationBorderThickBlue />
            ) : (
                <DecorationBorderThickYellow />
            )}
            <span
                className="owned-ship-card-image"
                style={{
                    background: `url(${ownedShip.ship.storeImageLarge}) center/cover no-repeat`,
                }}
            >
                <div className="owned-ship-informations-main-container">
                    <div className="owned-ship-card-informations-sub-container">
                        {(shipSelectionActive === true &&
                            actualSelectedShip?.id !== ownedShip?.id) ||
                        (shipSelectionActive === false &&
                            actualSelectedShip?.id === ownedShip?.id) ||
                        (shipSelectionActive === false &&
                            actualSelectedShip?.id !== ownedShip?.id) ? (
                            <div
                                className="owned-ship-card-header"
                                onClick={() =>
                                    dispatch(setShipSelectionActive(true))
                                }
                            >
                                <span className="text-left">
                                    Constructeur:{" "}
                                    <span className="info-blue">
                                        {ownedShip?.ship.manufacturer.name}
                                    </span>{" "}
                                </span>
                                <span className="text-center">
                                    modèle:{" "}
                                    <span className="info-red">
                                        {ownedShip?.ship.name}
                                    </span>
                                </span>
                                {user &&
                                [...user?.notifications].find(
                                    (notification) =>
                                        (notification?.associatedSharedShip ===
                                            ownedShip?.notificationId &&
                                            notification?.type ===
                                                "nouveau vaisseau militaire partagé") ||
                                        (notification?.associatedSharedShip ===
                                            ownedShip?.notificationId &&
                                            notification?.type ===
                                                "nouveau vaisseau civil partagé")
                                ) ? (
                                    <div className="new-shared-ship text-center">
                                        <span>Nouveau</span>
                                    </div>
                                ) : (
                                    <span></span>
                                )}

                                <span className="text-center">
                                    propriétaire:{" "}
                                    <span className="info-green">
                                        {ownedShip?.owner}
                                    </span>
                                </span>
                                <span className="text-right">
                                    Nom:{" "}
                                    <span className="info-yellow">
                                        {ownedShip?.fleet} {ownedShip?.shipName}
                                    </span>
                                </span>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <OwnedShipCardInformationsPanel
                    ownedShipDatas={ownedShip}
                    pageActive={pageActive}
                />
            </span>
        </div>
    );
};

export default OwnedShipCard;
