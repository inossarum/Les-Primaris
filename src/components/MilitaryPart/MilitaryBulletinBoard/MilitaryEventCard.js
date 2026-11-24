import React, {useRef, useState} from "react";
import MilitaryEventPlayerCard from "./MilitaryEventPlayerCard";
import {AddCircle, Edit, RemoveCircle} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import {
  getEventDetails,
  setEventDetailsWindowActive,
  setIsBringingVehicle,
} from "../../../feature/events.slice";
import MilitaryEventEnlistedShipCard from "./MilitaryEventEnlistedShipCard";
import MilitaryEventShipSelector from "./MilitaryEventShipSelector";

const MilitaryEventCard = ({event, isViewingArchives}) => {
  const dispatch = useDispatch();
  const isBringingVehicle = useSelector(
    (state) => state.events.isBringingVehicle
  );
  const user = useSelector((state) => state.user);
  const currentEvent = useSelector((state) =>
    state.events.militaryEvents.find(
      (militaryEvent) => militaryEvent.id === event?.id
    )
  );
  const activePlayersEventList = useSelector(
    (state) =>
      state.events.militaryEvents.find(
        (militaryEvent) => militaryEvent.id === event?.id
      )?.players
  );
  const archivePlayersEventList = useSelector(
    (state) =>
      state.events.militaryEventsArchives.find(
        (militaryEvent) => militaryEvent.id === event?.id
      )?.players
  );
  const instructorData = useSelector((state) =>
    state.user.users.find((user) => user.pseudo === event?.instructor)
  );
  const creatorData = useSelector((state) =>
    state.user.users.find((user) => user.pseudo === event?.creator)
  );
  const outfitData = useSelector(
    (state) =>
      state.events.militaryEvents.find(
        (militaryEvent) => militaryEvent.id === event?.id
      )?.outfit
  );
  const outfitCamoData = useSelector(
    (state) =>
      state.events.militaryEvents.find(
        (militaryEvent) => militaryEvent.id === event?.id
      )?.outfitCamo
  );
  const eventDescriptionData = useSelector(
    (state) =>
      state.events.militaryEvents.find(
        (militaryEvent) => militaryEvent.id === event?.id
      )?.description
  );
  const instructorShortenedMilitaryRanks = useSelector(
    (state) =>
      state.militaryRanks.militaryRanks.find(
        (rank) => rank.rank === instructorData?.factionRank
      )?.shortenedRank
  );
  const creatorShortenedMilitaryRanks = useSelector(
    (state) =>
      state.militaryRanks.militaryRanks.find(
        (rank) => rank.rank === creatorData?.factionRank
      )?.shortenedRank
  );
  const activeMilitaryVehiclesList = useSelector(
    (state) =>
      state.events.militaryEvents.find(
        (militaryEvent) => militaryEvent.id === event?.id
      )?.vehicles
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

  const handleRemoveAssociatedNotifcation = async (e) => {
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

    updateDoc(doc(db, "militaryEvents", event?.id), {
      players: [...activePlayersEventList, playerDatas],
    });
  };

  const handleCancelParticipation = async (e) => {
    e.preventDefault();
    const listWithOutSelectedPlayer = activePlayersEventList.filter(
      (player) => player?.id !== user.userId
    );

    updateDoc(doc(db, "militaryEvents", event?.id), {
      players: listWithOutSelectedPlayer,
    });
  };

  const handleEventDescriptionEdition = async (e) => {
    e.preventDefault();
    updateDoc(doc(db, "militaryEvents", event?.id), {
      description: editedMissionDescription.current.value,
    });
    setMissionDescriptionEditing(false);
  };

  const resetEventDetailTimeout = async (e) => {
    e.preventDefault();

    setTimeout(() => dispatch(getEventDetails([])), 300);
  };

  let missionClassType = "";
  let outfitClassType = "";
  let outfitCamoType = "";
  let backgroundImgUrl = "";

  switch (event?.type) {
    case "mission officielle":
      missionClassType = "mission-officielle";
      backgroundImgUrl =
        "../../../../assets/img/departments/aerospatialDepartment-background.webp";
      break;
    case "entrainement":
      missionClassType = "entrainement";
      backgroundImgUrl =
        "../../../../assets/img/departments/infantryDepartment-background.webp";
      break;
    case "sortie détente":
      missionClassType = "sortie-detente";
      backgroundImgUrl =
        "../../../../assets/img/departments/central-administration-background.webp";
      break;
    default:
  }
  switch (outfitData) {
    case "Obligatoire":
      outfitClassType = "info-red-uppercase event-outfit";

      break;
    case "Vivement recommandé":
      outfitClassType = "info-orange-uppercase event-outfit";

      break;
    case "A l'appreciation de chacun":
      outfitClassType = "info-green-uppercase event-outfit";
      break;
    default:
  }

  switch (outfitCamoData) {
    case "Aucun":
      outfitCamoType = "info-yellow event-outfit";
      break;
    case "Urbain":
      outfitCamoType = "info-blue event-outfit";
      break;
    case "Arctique":
      outfitCamoType = "info-white event-outfit";
      break;
    case "Foret":
      outfitCamoType = "info-green event-outfit";
      break;
    case "Desert":
      outfitCamoType = "info-orange event-outfit";
      break;
    default:
  }

  if (isViewingArchives === true) {
    return (
      <div
        className="military-event-card-body"
        style={{background: `url(${backgroundImgUrl}) center/cover no-repeat`}}
      >
        <div className="archived-event">Archive</div>
        <div className="military-event-card-creator-id">
          <div className="military-event-card-creator-id-sub-container left">
            <span>Organisé par: </span>
            <span className="info-blue">
              {creatorShortenedMilitaryRanks} {event?.creator}
            </span>{" "}
          </div>

          <div className="military-event-card-creator-id-sub-container right">
            <span>Instructeur: </span>
            <span className="info-green">
              {instructorShortenedMilitaryRanks} {event?.instructor}
            </span>
          </div>
        </div>

        <div className="military-event-card-header">
          <div className="military-event-card-header-title-container">
            <h2>{event?.name}</h2>
            <span className={missionClassType}>{event?.type}</span>
          </div>
          <div className="military-event-card-header-sub-container">
            <div className="military-event-card-date">
              <span>Sortie prévue le: {}</span>
              <span className="info-yellow">{dateFormater(event?.date)}</span>
            </div>
          </div>
          <div className="military-event-card-header-sub-container">
            <div className="military-event-card-date">
              <span>Ouvert aux civils: {}</span>
              <span className="info-yellow">{event?.militaryOpened}</span>
            </div>
          </div>
        </div>
        <div className="military-event-card-main-container">
          <div className="military-event-card-main-container-description-main-container">
            <div className="military-event-card-main-container-description-sub-container">
              <div>
                <span className="decoration"></span>
                <h3>Lieu de mission</h3>
              </div>
              <span className="event-location info-yellow">
                {event?.location}
              </span>
            </div>
            <div className="military-event-card-main-container-description-outfit-container">
              <div className="military-event-card-main-container-description-outfit-sub-container">
                <div>
                  <span className="decoration"></span>
                  <h3>Tenue de service</h3>
                </div>

                <span className={outfitClassType}>{outfitData}</span>
              </div>
              <div className="military-event-card-main-container-description-outfit-sub-container">
                <div>
                  <span className="decoration"></span>
                  <h3>Camouflage Infanterie</h3>
                </div>
                <span className={outfitCamoType}>{event?.outfitCamo}</span>
              </div>
            </div>
          </div>
          <div className="military-event-card-main-container-description-sub-container">
            <div className="military-event-card-main-container-description-sub-container-title">
              <div>
                <span className="decoration"></span>
                <h3>Description de l'évènement</h3>
              </div>
            </div>
            <p>{event?.description}</p>
          </div>
          <div className="military-event-card-main-container-players-sub-container">
            <div className="military-event-card-main-container-players-sub-container-title">
              <span className="decoration"></span>
              <h3>Liste des participants</h3>
            </div>
            <div className="military-event-card-main-container-players-list">
              {archivePlayersEventList &&
                [...archivePlayersEventList].map((player) => (
                  <MilitaryEventPlayerCard player={player} key={player.id} />
                ))}
            </div>
          </div>
          <div className="military-event-card-main-container-add-players-sub-container">
            <div
              className="military-event-card-main-container-event-button remove"
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
        className="military-event-card-body"
        style={{background: `url(${backgroundImgUrl}) center/cover no-repeat`}}
        onMouseOver={(e) => handleRemoveAssociatedNotifcation(e)}
      >
        <div className="military-event-card-creator-id">
          <div className="military-event-card-creator-id-sub-container left">
            <span>Organisé par: </span>
            <span className="info-blue">
              {creatorShortenedMilitaryRanks} {event?.creator}
            </span>{" "}
          </div>

          <div className="military-event-card-creator-id-sub-container right">
            <span>Instructeur: </span>
            <span className="info-green">
              {instructorShortenedMilitaryRanks} {event?.instructor}
            </span>
          </div>
        </div>
        <div className="military-event-card-header">
          <div className="military-event-card-header-title-container">
            <h2>{event?.name}</h2>
            <span className={missionClassType}>{event?.type}</span>
          </div>
          <div className="military-event-card-header-sub-container">
            <div className="military-event-card-date">
              <span>Sortie prévue le: {}</span>
              <span className="info-yellow">{dateFormater(event?.date)}</span>
            </div>
          </div>
          <div className="military-event-card-header-sub-container">
            <div className="military-event-card-date">
              <span>Ouvert aux civils: {}</span>
              {event?.civilianOpened === "oui" ? (
                <span className="info-green-uppercase">
                  {event?.civilianOpened}
                </span>
              ) : (
                <span className="info-red-uppercase">
                  {event?.civilianOpened}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="military-event-card-main-container">
          <div className="military-event-card-main-container-description-main-container">
            <div className="military-event-card-main-container-description-sub-container">
              <div>
                <span className="decoration"></span>
                <h3>Lieu de mission</h3>
              </div>
              <span className="event-location info-yellow">
                {event?.location}
              </span>
            </div>
            <div className="military-event-card-main-container-description-sub-container">
              <div>
                <span className="decoration"></span>
                <h3>Tenue de service</h3>
              </div>
              <span className={outfitClassType}>{outfitData}</span>
            </div>
            <div className="military-event-card-main-container-description-sub-container">
              <div>
                <span className="decoration"></span>
                <h3>Camouflage Infanterie</h3>
              </div>
              <span className={outfitCamoType}>{outfitCamoData}</span>
            </div>
          </div>
          <div className="military-event-card-main-container-description-sub-container">
            <div className="military-event-card-main-container-description-sub-container-title">
              <div>
                <span className="decoration"></span>
                <h3>Description de l'évènement</h3>
              </div>
            </div>
            <div className="military-event-card-main-container-description-sub-container-content">
              {missionDescriptionEditing === true ? (
                <div className="military-event-card-main-container-description-edit-container-content">
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
                    className="military-event-card-main-container-description-sub-container-title-edit-icon"
                    onClick={(e) => setMissionDescriptionEditing(true)}
                  />
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="military-event-card-main-container-players-sub-container">
            <div className="military-event-card-main-container-players-sub-container-title">
              <span className="decoration"></span>
              <h3>Liste des participants</h3>
            </div>

            <div className="military-event-card-main-container-players-list">
              {activePlayersEventList &&
                [...activePlayersEventList].map((player) => (
                  <MilitaryEventPlayerCard player={player} key={player.id} />
                ))}
            </div>
          </div>
          {(user.factionPart === "civil-militaire" &&
            user.factionRank === "reserviste") ||
          (user.factionPart === "civil" && event?.militaryOpened === "oui") ||
          user.factionPart === "militaire" ||
          user.webSiteRole === "administrateur" ? (
            <>
              <div className="military-event-card-main-container-add-players-sub-container">
                {activePlayersEventList &&
                [...activePlayersEventList].find((player) =>
                  player?.id?.includes(user?.userId)
                ) ? (
                  <div
                    className="military-event-card-main-container-event-button remove"
                    onClick={(e) => handleCancelParticipation(e)}
                  >
                    <RemoveCircle /> <span>Se retirer</span>
                  </div>
                ) : (
                  <div
                    className="military-event-card-main-container-event-button add"
                    onClick={(e) => handleAddPlayerParticipation(e)}
                  >
                    <AddCircle /> <span>Participer</span>
                  </div>
                )}
              </div>
              <>
                {activeMilitaryVehiclesList && activeMilitaryVehiclesList[0] ? (
                  <div className="military-event-card-main-container-vehicles-sub-container">
                    <div className="military-event-card-main-container-vehicles-sub-container-title">
                      <span className="decoration"></span>
                      <h3>Liste des véhicules</h3>
                    </div>
                    <div className="military-event-card-main-container-vehicles-list">
                      {activeMilitaryVehiclesList &&
                        [...activeMilitaryVehiclesList]
                          .sort((a, b) => a?.createdAt - b?.createdAt)
                          .map((ship) => (
                            <MilitaryEventEnlistedShipCard
                              ship={ship}
                              key={ship.id}
                            />
                          ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {isBringingVehicle === true ? (
                  <MilitaryEventShipSelector />
                ) : (
                  <div
                    className="military-event-card-main-container-event-button add"
                    onClick={() => dispatch(setIsBringingVehicle(true))}
                  >
                    <AddCircle /> <span>Amener un véhicule</span>
                  </div>
                )}
              </>
            </>
          ) : (
            ""
          )}
          <div className="military-event-card-main-container-add-players-sub-container">
            <div
              className="military-event-card-main-container-event-button remove"
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

export default MilitaryEventCard;
