import React from "react";
import {AddCircleOutline, RemoveCircle} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import {
  getEventDetails,
  setEventDetailsWindowActive,
} from "../../../feature/events.slice";

const CivilianEvent = ({event, archive}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);

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
      ? await deleteDoc(doc(db, "civilianEventsArchives", event.id))
      : await deleteDoc(doc(db, "civilianEvents", event.id));

    users &&
      [...users]
        .filter(
          (user) =>
            user.factionPart === "militaire" ||
            user.factionPart === "civil-militaire" ||
            user.factionPart === "civil"
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

  const handleArchiveEvent = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "civilianEventsArchives", event.id), event);
    await deleteDoc(doc(db, "civilianEvents", event.id));
    users &&
      [...users]
        .filter(
          (user) =>
            user.factionPart === "militaire" ||
            user.factionPart === "civil-militaire" ||
            user.factionPart === "civil"
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
    const userNotificationsAfterRemoval = currentUser.notifications.filter(
      (notification) => notification.associatedEvent !== event.notificationId
    );

    await updateDoc(doc(db, "users", currentUser.userId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  const handleShowEventDetails = async (e) => {
    e.preventDefault();
    dispatch(getEventDetails(event));
    dispatch(setEventDetailsWindowActive(event.id));
  };

  let eventClassType = "";
  let backgroundImgUrl = "";

  switch (event?.type) {
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

  switch (event?.theme) {
    case "Minage":
      backgroundImgUrl =
        "../../../../assets/img/departments/industry-department-background.webp";
      break;
    case "Transport":
      backgroundImgUrl =
        "../../../../assets/img/departments/trading-department-background.webp";
      break;
    case "Commerce":
      backgroundImgUrl =
        "../../../../assets/img/departments/trading-department-background.webp";
      break;
    case "Recyclage":
      backgroundImgUrl =
        "../../../../assets/img/departments/industry-department-background.webp";
      break;
    case "Course sportive":
      backgroundImgUrl =
        "../../../../assets/img/departments/culture-department-background.webp";
      break;
    case "Tourisme":
      backgroundImgUrl =
        "../../../../assets/img/departments/touring-department-background.webp";
      break;
    case "Exploration":
      backgroundImgUrl =
        "../../../../assets/img/departments/exploration-department-background.webp";
      break;
    case "Chill":
      backgroundImgUrl =
        "../../../../assets/img/departments/central-administration-background.webp";
      break;
    case "Vol en raze motte":
      backgroundImgUrl =
        "../../../../assets/img/departments/culture-department-background.webp";
      break;
    default:
  }

  return (
    <>
      <div
        className="civilian-event-body"
        style={{background: `url(${backgroundImgUrl}) center/cover no-repeat`}}
      >
        {currentUser.webSiteRole === "administrateur" ||
        currentUser.userId === event?.creatorId ? (
          <>
            <div className="civilian-event-sub-container">
              {currentUser.webSiteRole === "administrateur" ||
              currentUser.userId === event?.creatorId ? (
                <div
                  className="civilian-event-main-container-event-button delete"
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
              <div className="civilian-event-sub-container">
                {currentUser.webSiteRole === "administrateur" ||
                currentUser.userId === event?.creatorId ? (
                  <div
                    className="civilian-event-main-container-event-button archive"
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
        <div className="civilian-event-sub-container">
          <span>Responsable: </span>
          <span className="info-green">{event?.chief}</span>
        </div>

        <div className="civilian-event-sub-container">
          <span>Type: </span>
          <span className={eventClassType}>{event?.type}</span>
        </div>
        <div className="civilian-event-sub-container">
          <span>Date: </span>
          <span className="info-yellow">{dateFormater(event?.date)}</span>
        </div>

        <div className="civilian-event-sub-container">
          {[...currentUser?.notifications].find(
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
            className="civilian-event-main-container-event-button details"
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

export default CivilianEvent;
