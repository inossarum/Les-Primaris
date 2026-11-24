import React, {useRef, useState} from "react";
import CivilianEventPlayerCard from "./CivilianEventPlayerCard";
import {AddCircle, Edit, RemoveCircle} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import {
  getEventDetails,
  setEventDetailsWindowActive,
  setIsBringingVehicle,
} from "../../../feature/events.slice";
import CivilianEventShipSelector from "./CivilianEventShipSelector";
import CivilianEventEnlistedShipCard from "./CivilianEventEnlistedShipCard";

const CivilianEventCard = ({event, isViewingArchives}) => {
  const dispatch = useDispatch();
  const isBringingVehicle = useSelector(
    (state) => state.events.isBringingVehicle
  );
  const user = useSelector((state) => state.user);
  const currentEvent = useSelector((state) =>
    state.events.civilianEvents.find(
      (civilianEvent) => civilianEvent.id === event?.id
    )
  );
  const activeCivilianVehiclesList = useSelector((state) =>
    state.events.civilianEvents
      .find((civilianEvent) => civilianEvent.id === event?.id)
      ?.vehicles.filter((vehicle) => vehicle.vehicleRole === "civil")
  );
  const activeMilitaryVehiclesList = useSelector((state) =>
    state.events.civilianEvents
      .find((civilianEvent) => civilianEvent.id === event?.id)
      ?.vehicles.filter((vehicle) => vehicle.vehicleRole === "militaire")
  );
  const activePlayersList = useSelector(
    (state) =>
      state.events.civilianEvents.find(
        (civilianEvent) => civilianEvent.id === event?.id
      )?.players
  );
  const archivePlayersEventList = useSelector(
    (state) =>
      state.events.civilianEventsArchives.find(
        (civilianEvent) => civilianEvent.id === event?.id
      )?.players
  );

  const [missionDescriptionEditing, setMissionDescriptionEditing] =
    useState(false);
  const editedMissionDescription = useRef();

  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleRemoveAssociatedNotification = async (e) => {
    e.preventDefault();
    const userNotificationsAfterRemoval = user.notifications.filter(
      (notification) => notification?.associatedEvent !== event?.notificationId
    );

    await updateDoc(doc(db, "users", user?.userId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  const handleAddPlayerParticipation = async (e) => {
    e.preventDefault();
    const playerDatas = {
      name: user.currentUser,
      id: user.userId,
      rank: user.factionRank,
    };

    updateDoc(doc(db, "civilianEvents", event?.id), {
      players: [...activePlayersList, playerDatas],
    });
  };

  const handleCancelParticipation = async (e) => {
    e.preventDefault();
    const listWithOutSelectedPlayer = activePlayersList.filter(
      (player) => player?.id !== user.userId
    );

    updateDoc(doc(db, "civilianEvents", event?.id), {
      players: listWithOutSelectedPlayer,
    });
  };

  const handleEventDescriptionEdition = async (e) => {
    e.preventDefault();
    updateDoc(doc(db, "civilianEvents", event?.id), {
      description: editedMissionDescription.current.value,
    });
    setMissionDescriptionEditing(false);
  };

  const resetEventDetailTimeout = async (e) => {
    e.preventDefault();

    setTimeout(() => dispatch(getEventDetails([])), 300);
  };

  let eventClassType = "";
  let outfitClassType = "";
  let themeClassType = "";
  let backgroundImgUrl = "";

  switch (currentEvent?.type) {
    case "sortie corporation":
      eventClassType = "corporation";

      break;
    case "mission départementale":
      eventClassType = "mission-departementale";

      break;
    case "formation professionnelle":
      eventClassType = "mission-departementale";

      break;
    case "sortie détente":
      eventClassType = "sortie-detente";

      break;
    default:
  }
  switch (currentEvent?.theme) {
    case "Minage":
      themeClassType = "minage";
      backgroundImgUrl =
        "../../../../assets/img/departments/industry-department-background.webp";
      break;
    case "Transport":
      themeClassType = "transport";
      backgroundImgUrl =
        "../../../../assets/img/departments/trading-department-background.webp";
      break;
    case "Commerce":
      themeClassType = "commerce";
      backgroundImgUrl =
        "../../../../assets/img/departments/trading-department-background.webp";
      break;
    case "Recyclage":
      themeClassType = "recyclage";
      backgroundImgUrl =
        "../../../../assets/img/departments/industry-department-background.webp";
      break;
    case "Tourisme":
      themeClassType = "recyclage";
      backgroundImgUrl =
        "../../../../assets/img/departments/touring-department-background.webp";
      break;
    case "Exploration":
      themeClassType = "transport";
      backgroundImgUrl =
        "../../../../assets/img/departments/exploration-department-background.webp";
      break;
    case "Course sportive":
    case "Chill":
    case "Vol en raze motte":
      themeClassType = "course";
      backgroundImgUrl =
        "../../../../assets/img/departments/culture-department-background.webp";
      break;
    default:
  }

  switch (currentEvent?.outfit) {
    case "Obligatoire":
      outfitClassType = "mission-officielle";

      break;
    case "Vivement recommandée":
      outfitClassType = "entrainement";

      break;
    case "A l'appreciation de chacun":
      outfitClassType = "sortie-detente";
      break;
    default:
  }

  if (isViewingArchives === true) {
    return (
      <div
        className="civilian-event-card-body"
        style={{background: `url(${backgroundImgUrl}) center/cover no-repeat`}}
      >
        <div className="archived-event">Archive</div>
        <div className="civilian-event-card-creator-id">
          <div className="civilian-event-card-creator-id-sub-container left">
            <span>Organisé par: </span>
            <span className="info-yellow">{event?.creator}</span>{" "}
          </div>
          <div className="civilian-event-card-creator-id-sub-container right">
            <span>Responsable: </span>
            <span className="info-green">{event?.chief}</span>
          </div>
        </div>

        <div className="civilian-event-card-header">
          <div className="civilian-event-card-header-title-container">
            <h2>{event?.name}</h2>
            <span className={eventClassType}>{event?.type}</span>
          </div>
          <div className="civilian-event-card-header-sub-container">
            <div className="civilian-event-card-date">
              <span>Sortie prévue le: {}</span>
              <span className="info-yellow">{dateFormater(event?.date)}</span>
            </div>
          </div>
        </div>
        <div className="civilian-event-card-main-container">
          {" "}
          <div className="civilian-event-card-main-container-description-main-container">
            <div className="civilian-event-card-main-container-description-sub-container">
              <h3>Lieu de mission</h3>
              <span className="event-location">{event?.location}</span>
            </div>
            <div className="civilian-event-card-main-container-description-sub-container">
              <h3>Thème de l'évènement</h3>
              <span className={themeClassType}>{event?.theme}</span>
            </div>
            <div className="civilian-event-card-main-container-description-sub-container">
              <h3>Tenue de travail</h3>
              <span className={outfitClassType}>{event?.outfit}</span>
            </div>
            <div className="civilian-event-card-main-container-description-sub-container">
              <div className="civilian-event-card-main-container-description-sub-container-title">
                <h3>Description de l'évènement</h3>
              </div>
            </div>
            <p>{event?.description}</p>
          </div>
          <div className="civilian-event-card-main-container-players-sub-container">
            <h3>Liste des participants</h3>
            <div className="civilian-event-card-main-container-players-list">
              {archivePlayersEventList &&
                [...archivePlayersEventList].map((player) => (
                  <CivilianEventPlayerCard player={player} key={player.id} />
                ))}
            </div>
          </div>
          <div className="civilian-event-card-main-container-add-players-sub-container">
            <div
              className="civilian-event-card-main-container-event-button remove"
              onClick={(e) => dispatch(setEventDetailsWindowActive(""))}
            >
              <span>Retour à la liste</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="civilian-event-card-body"
        style={{background: `url(${backgroundImgUrl}) center/cover no-repeat`}}
        onMouseOver={(e) => handleRemoveAssociatedNotification(e)}
      >
        <div className="civilian-event-card-creator-id">
          <div className="civilian-event-card-creator-id-sub-container left">
            <span>Organisé par: </span>
            <span className="info-yellow">{currentEvent?.creator}</span>{" "}
          </div>
          <div className="civilian-event-card-creator-id-sub-container right">
            <span>Responsable: </span>
            <span className="info-green">{currentEvent?.chief}</span>
          </div>
        </div>

        <div className="civilian-event-card-header">
          <div className="civilian-event-card-header-title-container">
            <h2>{event?.name}</h2>
            <span className={eventClassType}>{currentEvent?.type}</span>
          </div>
          <div className="civilian-event-card-header-sub-container">
            <div className="civilian-event-card-date">
              <span>Sortie prévue le: {}</span>
              <span className="info-yellow">
                {dateFormater(currentEvent?.date)}
              </span>
            </div>
          </div>
        </div>
        <div className="civilian-event-card-main-container">
          <div className="civilian-event-card-main-container-description-main-container">
            <div className="civilian-event-card-main-container-description-sub-container">
              <h3>Lieu de mission</h3>
              <span className="event-location">{currentEvent?.location}</span>
            </div>
            <div className="civilian-event-card-main-container-description-sub-container">
              <h3>Thème de l'évènement</h3>
              <span className={themeClassType}>{currentEvent?.theme}</span>
            </div>
            <div className="civilian-event-card-main-container-description-sub-container">
              <h3>Tenue de travail</h3>
              <span className={outfitClassType}>{currentEvent?.outfit}</span>
            </div>
          </div>
          <div className="civilian-event-card-main-container-description-sub-container">
            <div className="civilian-event-card-main-container-description-sub-container-title">
              <h3>Description de l'évènement</h3>
            </div>
            <div className="civilian-event-card-main-container-description-sub-container-content">
              {missionDescriptionEditing === true ? (
                <div className="civilian-event-card-main-container-description-edit-container-content">
                  <textarea
                    defaultValue={currentEvent?.description}
                    ref={editedMissionDescription}
                  />
                  <button
                    className="primaris-ingame-shop-new-product-form-button-green"
                    onClick={(e) => handleEventDescriptionEdition(e)}
                  >
                    valider
                  </button>
                </div>
              ) : (
                <p>{currentEvent?.description}</p>
              )}
              {(user.userId === currentEvent?.creatorId ||
                user.userWebSiteRole === "administrateur") &&
              missionDescriptionEditing === false ? (
                <span className="primaris-ingame-shop-new-product-form-button-red">
                  <Edit
                    className="civilian-event-card-main-container-description-sub-container-title-edit-icon"
                    onClick={(e) => setMissionDescriptionEditing(true)}
                  />
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="civilian-event-card-main-container-players-sub-container">
            <h3>Liste des participants civils</h3>
            <div className="civilian-event-card-main-container-players-list">
              {activePlayersList &&
                [...activePlayersList].map((player) => (
                  <CivilianEventPlayerCard player={player} key={player.id} />
                ))}
            </div>
            {/* {event?.escortAllowed === true ? (
              <>
                <h3>Liste des escorteurs</h3>
                <div className="civilian-event-card-main-container-players-list">
                  {activePlayersList &&
                    [...activePlayersList].map((player) => (
                      <CivilianEventPlayerCard
                        player={player}
                        key={player.id}
                      />
                    ))}
                </div>{" "}
              </>
            ) : (
              ""
            )} */}
          </div>
          <div className="civilian-event-card-main-container-add-players-sub-container">
            {activePlayersList &&
            [...activePlayersList].find((player) =>
              player?.id?.includes(user?.userId)
            ) ? (
              <div
                className="civilian-event-card-main-container-event-button remove"
                onClick={(e) => handleCancelParticipation(e)}
              >
                <RemoveCircle /> <span>Se retirer</span>
              </div>
            ) : (
              <>
                <div
                  className="civilian-event-card-main-container-event-button add"
                  onClick={(e) => handleAddPlayerParticipation(e)}
                >
                  <AddCircle /> <span>participer</span>
                </div>
              </>
            )}
          </div>
          {activeCivilianVehiclesList && activeCivilianVehiclesList[0] ? (
            <div className="civilian-event-card-main-container-vehicles-sub-container">
              <h3>Liste des véhicules civils</h3>
              <div className="civilian-event-card-main-container-vehicles-list">
                {activeCivilianVehiclesList &&
                  [...activeCivilianVehiclesList]
                    .sort((a, b) => a?.createdAt - b?.createdAt)
                    .map((ship) => (
                      <CivilianEventEnlistedShipCard
                        ship={ship}
                        key={ship.id}
                      />
                    ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {activeMilitaryVehiclesList && activeMilitaryVehiclesList[0] ? (
            <div className="civilian-event-card-main-container-vehicles-sub-container">
              <h3>Liste des véhicules militaires</h3>
              <div className="civilian-event-card-main-container-vehicles-list">
                {activeMilitaryVehiclesList &&
                  [...activeMilitaryVehiclesList]
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((ship) => (
                      <CivilianEventEnlistedShipCard
                        ship={ship}
                        key={ship.vehicleId}
                      />
                    ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {isBringingVehicle === true ? (
            <CivilianEventShipSelector />
          ) : (
            <div
              className="civilian-event-card-main-container-event-button add"
              onClick={() => dispatch(setIsBringingVehicle(true))}
            >
              <AddCircle /> <span>Amener un véhicule</span>
            </div>
          )}
          <div className="civilian-event-card-main-container-add-players-sub-container">
            <div
              className="civilian-event-card-main-container-event-button remove"
              onClick={(e) =>
                { dispatch(setEventDetailsWindowActive("")); resetEventDetailTimeout(e); }
              }
            >
              <span>Retour à la liste</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CivilianEventCard;
