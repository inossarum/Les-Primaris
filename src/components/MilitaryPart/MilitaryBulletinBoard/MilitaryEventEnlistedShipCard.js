import {Delete} from "@mui/icons-material";
import {doc, updateDoc} from "firebase/firestore";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../../utils/firebase.config";
import {
    setActualEventShipSelected,
    setEventJobSelectionActive,
    setEventUserSearchingActive,
} from "../../../feature/events.slice";

import MilitaryEventJobSelectionPanel from "./MilitaryEventJobSelectionPanel";
import MilitaryEventUserSearchPanel from "./MilitaryEventUserSearchPanel";
import MilitaryEventEnlistedShipCardEmployee from "./MilitaryEventEnlistedShipCardEmployee";
import MilitaryEventEnlistedShipCardPostulant from "./MilitaryEventEnlistedShipCardPostulant";

const MilitaryEventEnlistedShipCard = ({ship}) => {
    const currentUser = useSelector((state) => state.user);
    const currentUserId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();
    const [isReadingShipDetails, setIsReadingShipDetails] = useState(false);

    const currentEvent = useSelector((state) =>
        [...state.events.militaryEvents].find(
            (event) => event.id === state.events.eventDetails.id
        )
    );
    const eventJobSelectionActive = useSelector(
        (state) => state.events.eventJobSelectionActive
    );
    const eventUserSearchingActive = useSelector(
        (state) => state.events.eventUserSearchingActive
    );

    const handleDeleteVehicle = async (e) => {
        e.preventDefault();

        const currentEventVehiclesList = currentEvent?.vehicles;
        const currentEventVehiclesListAfterFilter =
            currentEventVehiclesList.filter(
                (currentEventVehicle) =>
                    currentEventVehicle.vehicleId !== ship.vehicleId
            );

        await updateDoc(doc(db, "militaryEvents", currentEvent.id), {
            vehicles: currentEventVehiclesListAfterFilter,
        });
    };

    return (
        <div
            className={
                isReadingShipDetails === false
                    ? "military-event-enlisted-ship-card-body base"
                    : "military-event-enlisted-ship-card-body reverse"
            }
            onClick={() => dispatch(setActualEventShipSelected(ship))}
        >
            {isReadingShipDetails === false ? (
                <>
                    {eventJobSelectionActive === true ? (
                        <MilitaryEventJobSelectionPanel vehicle={ship} />
                    ) : (
                        ""
                    )}
                    {eventUserSearchingActive === true ? (
                        <MilitaryEventUserSearchPanel vehicle={ship} />
                    ) : (
                        ""
                    )}
                    <span
                        className="military-event-enlisted-ship-card-image base"
                        style={{
                            background: `url(${ship?.vehiclePicture}) center/cover no-repeat`,
                        }}
                    >
                        <div className="military-event-enlisted-ship-card-upper-container base">
                            <div className="military-event-enlisted-ship-card-header">
                                <div className="military-event-enlisted-ship-card-owner-id">
                                    <span>Véhicule: </span>
                                    <span className="info-blue">
                                        {ship?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="military-event-enlisted-ship-card-header">
                                <div className="military-event-enlisted-ship-card-owner-id">
                                    <span>Propriétaire: </span>
                                    <span className="info-yellow">
                                        {ship?.owner}
                                    </span>
                                </div>

                                {currentUserId === ship?.ownerId ||
                                currentUser.webSiteRole === "administrateur" ||
                                currentUser.webSiteRole === "moderateur" ? (
                                    <Delete
                                        onClick={(e) => handleDeleteVehicle(e)}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="military-event-enlisted-ship-card-main-container base">
                                <div className="military-event-enlisted-ship-card-crew-informations">
                                    {ship?.maxCrewAllowed ===
                                    ship?.employees.length ? (
                                        <>
                                            <span>Poste(s) libre(s): </span>
                                            <span className="info-red">
                                                Aucun
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Poste(s) libre(s): </span>
                                            <div>
                                                {" "}
                                                <span className="info-green">
                                                    {ship?.maxCrewAllowed -
                                                        ship?.employees.length}
                                                </span>
                                                /
                                                <span className="info-yellow">
                                                    {ship?.maxCrewAllowed}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="military-event-enlisted-ship-card-main-container base">
                                <div className="military-event-enlisted-ship-card-crew-informations">
                                    {ship?.postulants[0] ? (
                                        <>
                                            <span>Postulant(s): </span>
                                            <span className="info-red">
                                                {ship?.postulants.length}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Postulant(s): </span>
                                            <div>
                                                <span className="info-green">
                                                    Aucun
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="military-event-enlisted-ship-card-main-footer base ">
                            <span
                                className="primaris-ingame-shop-new-product-form-button-blue"
                                onClick={() => setIsReadingShipDetails(true)}
                            >
                                detail
                            </span>
                            {ship?.maxCrewAllowed === ship?.employees.length ||
                            [...ship?.postulants].find(
                                (postulant) =>
                                    postulant.userId === currentUserId
                            ) ||
                            [...ship?.employees].find(
                                (employee) => employee.userId === currentUserId
                            ) ? (
                                ""
                            ) : (
                                <span
                                    className="primaris-ingame-shop-new-product-form-button-blue"
                                    onClick={() =>
                                        dispatch(
                                            setEventJobSelectionActive(true)
                                        )
                                    }
                                >
                                    postuler
                                </span>
                            )}
                            {ship?.maxCrewAllowed === ship?.employees.length ? (
                                ""
                            ) : (
                                <span
                                    className="primaris-ingame-shop-new-product-form-button-blue"
                                    onClick={() =>
                                        dispatch(
                                            setEventUserSearchingActive(true)
                                        )
                                    }
                                >
                                    ajouter un personnel
                                </span>
                            )}
                        </div>
                    </span>
                </>
            ) : (
                <span
                    className="military-event-enlisted-ship-card-image reverse"
                    style={{
                        background: `url(${ship?.vehiclePicture}) center/cover no-repeat`,
                    }}
                >
                    <div className="military-event-enlisted-ship-card-upper-container reverse">
                        <div className="military-event-enlisted-ship-card-main-container">
                            <span>Liste des postes: </span>
                            <p>{ship?.description}</p>
                        </div>
                        {ship?.employees && ship?.employees[0] ? (
                            <div className="military-event-enlisted-ship-card-crew-container ">
                                <div className="military-event-enlisted-ship-card-crew-informations">
                                    <span>Employés: </span>
                                    <div className="military-event-enlisted-ship-card-crew-list">
                                        {ship?.employees?.map((employee) => (
                                            <MilitaryEventEnlistedShipCardEmployee
                                                employee={employee}
                                                ship={ship}
                                                key={employee.Id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {ship?.postulants && ship?.postulants[0] ? (
                            <div className="military-event-enlisted-ship-card-crew-container">
                                <div className="military-event-enlisted-ship-card-crew-informations">
                                    <span>Postulants: </span>
                                    <div className="military-event-enlisted-ship-card-crew-list">
                                        {ship?.postulants?.map((postulant) => (
                                            <MilitaryEventEnlistedShipCardPostulant
                                                postulant={postulant}
                                                ship={ship}
                                                key={postulant.Id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="military-event-enlisted-ship-card-main-footer reverse">
                        <span
                            className="primaris-ingame-shop-new-product-form-button-blue"
                            onClick={() => setIsReadingShipDetails(false)}
                        >
                            retour
                        </span>
                    </div>
                </span>
            )}
        </div>
    );
};

export default MilitaryEventEnlistedShipCard;
