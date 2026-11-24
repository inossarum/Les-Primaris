import React from "react";
import {AddCircleOutline, RemoveCircle} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import {
  getEventDetails,
  setEventDetailsWindowActive,
} from "../../../feature/events.slice";

const MilitaryEvent = ({event, archive}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const instructorData = useSelector((state) =>
    state.user.users.find((user) => user?.pseudo === event?.instructor)
  );
  const instructorShortenedMilitaryRanks = useSelector(
    (state) =>
      state.militaryRanks.militaryRanks.find(
        (rank) => rank?.rank === instructorData?.factionRank
      )?.shortenedRank
  );

  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleDeleteEvent = async (e) => {
    e.preventDefault();

    archive === true
      ? await deleteDoc(doc(db, "militaryEventsArchives", event.id))
      : await deleteDoc(doc(db, "militaryEvents", event.id));

    if (event?.civilianOpened === "non") {
      users &&
        [...users]
          .filter(
            (user) =>
              user.factionPart === "militaire" ||
              user.factionPart === "civil-militaire"
          )
          .map((user) => {
            const userNotificationsAfterRemoval = user.notifications.filter(
              (notification) =>
                notification.associatedEvent !== event.notificationId
            );

            updateDoc(doc(db, "users", user.id), {
              notifications: userNotificationsAfterRemoval,
            });
          });
    } else {
      users &&
        [...users]
          .filter(
            (user) =>
              user.factionPart === "civil" ||
              user.factionPart === "militaire" ||
              user.factionPart === "civil-militaire"
          )
          .map((user) => {
            const userNotificationsAfterRemoval = user.notifications.filter(
              (notification) =>
                notification.associatedEvent !== event.notificationId
            );

            updateDoc(doc(db, "users", user.id), {
              notifications: userNotificationsAfterRemoval,
            });
          });
    }
  };

  const handleArchiveEvent = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "militaryEventsArchives", event.id), event);
    await deleteDoc(doc(db, "militaryEvents", event.id));
    users &&
      [...users]
        .filter(
          (user) =>
            user.factionPart === "militaire" ||
            user.factionPart === "civil-militaire"
        )
        .map((user) => {
          const userNotificationsAfterRemoval = user.notifications.filter(
            (notification) =>
              notification.associatedEvent !== event.notificationId
          );

          updateDoc(doc(db, "users", user.id), {
            notifications: userNotificationsAfterRemoval,
          });
        });
  };

  const handleRemoveAssociatedNotification = async (e) => {
    e.preventDefault();
    const userNotificationsAfterRemoval = user.notifications.filter(
      (notification) => notification.associatedEvent !== event.notificationId
    );

    await updateDoc(doc(db, "users", user.userId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  const handleShowEventDetails = async (e) => {
    e.preventDefault();
    dispatch(getEventDetails(event));
    dispatch(setEventDetailsWindowActive(event.id));
  };

  let missionClassType = "";
  let backgroundImgUrl = "";

  switch (event.type) {
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

  return (
    <>
      <div
        className="military-event-body"
        style={{background: `url(${backgroundImgUrl}) center/cover no-repeat`}}
      >
        {user.webSiteRole === "administrateur" ||
        user.userId === event?.creatorId ? (
          <>
            <div className="military-event-sub-container">
              {user.webSiteRole === "administrateur" ||
              user.userId === event?.creatorId ? (
                <div
                  className="military-event-main-container-event-button delete"
                  onClick={(e) => handleDeleteEvent(e)}
                >
                  <RemoveCircle /> <span>Supprimer l'évènement</span>
                </div>
              ) : (
                ""
              )}
            </div>
            {archive === true ? (
              ""
            ) : (
              <div className="military-event-sub-container">
                {user.webSiteRole === "administrateur" ||
                user.userId === event?.creatorId ? (
                  <div
                    className="military-event-main-container-event-button archive"
                    onClick={(e) => handleArchiveEvent(e)}
                  >
                    <AddCircleOutline /> <span>Archiver l'évènement</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </>
        ) : (
          ""
        )}
        <div className="military-event-sub-container">
          <span>Instructeur: </span>
          <span className="info-green">
            {instructorShortenedMilitaryRanks} {event?.instructor}
          </span>
        </div>

        <div className="military-event-sub-container">
          <span>Type: </span>
          <span className={missionClassType}>{event?.type}</span>
        </div>
        <div className="military-event-sub-container">
          <span>Date: </span>
          <span className="info-yellow">{dateFormater(event?.date)}</span>
        </div>

        <div className="military-event-sub-container">
          {[...user?.notifications].find(
            (notification) =>
              notification?.associatedEvent === event?.notificationId
          ) ? (
            <div className="new-event">Nouveau</div>
          ) : (
            ""
          )}
          {archive === true ? (
            <div className="archived-event">Archive</div>
          ) : (
            ""
          )}
          <div
            className="military-event-main-container-event-button details"
            onClick={(e) =>
              { handleShowEventDetails(e); handleRemoveAssociatedNotification(e); }
            }
          >
            <span>Details</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MilitaryEvent;
