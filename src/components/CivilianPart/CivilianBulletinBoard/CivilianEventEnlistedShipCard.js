import {Delete} from "@mui/icons-material";
import {doc, updateDoc} from "firebase/firestore";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../../utils/firebase.config";
import CivilianEventJobSelectionPanel from "./CivilianEventJobSelectionPanel";
import {
  setActualEventShipSelected,
  setEventJobSelectionActive,
  setEventUserSearchingActive,
} from "../../../feature/events.slice";
import CivilianEventEnlistedShipCardPostulant from "./CivilianEventEnlistedShipCardPostulant";
import CivilianEventEnlistedShipCardEmployee from "./CivilianEventEnlistedShipCardEmployee";
import CivilianEventUserSearchPanel from "./CivilianEventUserSearchPanel";

const CivilianEventEnlistedShipCard = ({ship}) => {
  const currentUser = useSelector((state) => state.user);
  const currentUserId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const [isReadingShipDetails, setIsReadingShipDetails] = useState(false);

  const currentEvent = useSelector((state) =>
    [...state.events.civilianEvents].find(
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
    const currentEventVehiclesListAfterFilter = currentEventVehiclesList.filter(
      (currentEventVehicle) => currentEventVehicle.vehicleId !== ship.vehicleId
    );

    await updateDoc(doc(db, "civilianEvents", currentEvent.id), {
      vehicles: currentEventVehiclesListAfterFilter,
    });
  };

  return (
    <div
      className={
        isReadingShipDetails === false
          ? "civilian-event-enlisted-ship-card-body base"
          : "civilian-event-enlisted-ship-card-body reverse"
      }
      onClick={() => dispatch(setActualEventShipSelected(ship))}
    >
      {isReadingShipDetails === false ? (
        <>
          {eventJobSelectionActive === true ? (
            <CivilianEventJobSelectionPanel vehicle={ship} />
          ) : (
            ""
          )}
          {eventUserSearchingActive === true ? (
            <CivilianEventUserSearchPanel vehicle={ship} />
          ) : (
            ""
          )}
          <span
            className="civilian-event-enlisted-ship-card-image base"
            style={{
              background: `url(${ship?.vehiclePicture}) center/cover no-repeat`,
            }}
          >
            <div className="civilian-event-enlisted-ship-card-upper-container base">
              <div className="civilian-event-enlisted-ship-card-header">
                <div className="civilian-event-enlisted-ship-card-owner-id">
                  <span>Propriétaire: </span>
                  <span className="info-yellow">{ship?.owner}</span>
                </div>

                {currentUserId === ship?.ownerId ||
                currentUser.webSiteRole === "administrateur" ||
                currentUser.webSiteRole === "moderateur" ? (
                  <Delete onClick={(e) => handleDeleteVehicle(e)} />
                ) : (
                  ""
                )}
              </div>
              <div className="civilian-event-enlisted-ship-card-main-container base">
                <div className="civilian-event-enlisted-ship-card-crew-informations">
                  {ship?.maxCrewAllowed === ship?.employees.length ? (
                    <>
                      <span>Poste(s) libres(s): </span>
                      <span className="info-red">Aucun</span>
                    </>
                  ) : (
                    <>
                      <span>Poste(s) libres(s): </span>
                      <div>
                        {" "}
                        <span className="info-green">
                          {ship?.maxCrewAllowed - ship?.employees.length}
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
              <div className="civilian-event-enlisted-ship-card-main-container base">
                <div className="civilian-event-enlisted-ship-card-crew-informations">
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
                        <span className="info-green">Aucun</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="civilian-event-enlisted-ship-card-main-footer base ">
              <span
                className="primaris-ingame-shop-new-product-form-button-yellow"
                onClick={() => setIsReadingShipDetails(true)}
              >
                detail
              </span>
              {ship?.maxCrewAllowed === ship?.employees.length ||
              [...ship?.postulants].find(
                (postulant) => postulant.userId === currentUserId
              ) ||
              [...ship?.employees].find(
                (employee) => employee.userId === currentUserId
              ) ? (
                ""
              ) : (
                <span
                  className="primaris-ingame-shop-new-product-form-button-yellow"
                  onClick={() => dispatch(setEventJobSelectionActive(true))}
                >
                  postuler
                </span>
              )}
              {ship?.maxCrewAllowed === ship?.employees.length ? (
                ""
              ) : (
                <span
                  className="primaris-ingame-shop-new-product-form-button-yellow"
                  onClick={() => dispatch(setEventUserSearchingActive(true))}
                >
                  ajouter un personnel
                </span>
              )}
            </div>
          </span>
        </>
      ) : (
        <span
          className="civilian-event-enlisted-ship-card-image reverse"
          style={{
            background: `url(${ship?.vehiclePicture}) center/cover no-repeat`,
          }}
        >
          <div className="civilian-event-enlisted-ship-card-upper-container reverse">
            <div className="civilian-event-enlisted-ship-card-main-container">
              <span>Liste des postes: </span>
              <p>{ship?.description}</p>
            </div>
            {ship?.employees && ship?.employees[0] ? (
              <div className="civilian-event-enlisted-ship-card-crew-container ">
                <div className="civilian-event-enlisted-ship-card-crew-informations">
                  <span>Employés: </span>
                  <div className="civilian-event-enlisted-ship-card-crew-list">
                    {ship?.employees?.map((employee) => (
                      <CivilianEventEnlistedShipCardEmployee
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
              <div className="civilian-event-enlisted-ship-card-crew-container">
                <div className="civilian-event-enlisted-ship-card-crew-informations">
                  <span>Postulants: </span>
                  <div className="civilian-event-enlisted-ship-card-crew-list">
                    {ship?.postulants?.map((postulant) => (
                      <CivilianEventEnlistedShipCardPostulant
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

          <div className="civilian-event-enlisted-ship-card-main-footer reverse">
            <span
              className="primaris-ingame-shop-new-product-form-button-yellow"
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

export default CivilianEventEnlistedShipCard;
