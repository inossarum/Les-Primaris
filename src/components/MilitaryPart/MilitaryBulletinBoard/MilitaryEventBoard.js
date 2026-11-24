import {AddCircle} from "@mui/icons-material";
import {addDoc, arrayUnion, collection, doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../../utils/firebase.config";
import MilitaryEvent from "./MilitaryEvent";
import MilitaryEventCard from "./MilitaryEventCard";
import {setEventDetailsWindowActive} from "../../../feature/events.slice";

const MilitaryEventBoard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const militaryEvents = useSelector((state) => state.events.militaryEvents);
  const militaryEventsArchives = useSelector(
    (state) => state.events.militaryEventsArchives
  );
  const eventDetailsWindowActive = useSelector(
    (state) => state.events.eventDetailsWindowActive
  );
  const eventActive = useSelector((state) => state.events.eventDetails);
  const [isSettingNewEvent, setIsSettingNewEvent] = useState(false);
  const [isViewingArchives, setIsViewingArchives] = useState(false);
  const eventName = useRef();
  const eventDescription = useRef();
  const eventOutfit = useRef();
  const eventOutfitCamo = useRef();
  const eventDate = useRef();
  const eventType = useRef();
  const eventLocation = useRef();
  const eventInstructor = useRef();
  const eventCivilianOpened = useRef();

  const handleAddNewEvent = async (e) => {
    e.preventDefault();
    const eventDatas = {
      creator: currentUser.currentUser,
      creatorId: currentUser.userId,
      name: eventName.current.value,
      description: eventDescription.current.value,
      type: eventType.current.value,
      date: eventDate.current.value,
      outfit: eventOutfit.current.value,
      outfitCamo: eventOutfitCamo.current.value,
      location: eventLocation.current.value,
      instructor: eventInstructor.current.value,
      players: [],
      vehicles: [],
      createdAt: Date.now(),
      notificationId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      civilianOpened: eventCivilianOpened.current.value,
    };

    if (
      eventName.current.value !== "" &&
      eventName.current.value !== "" &&
      eventType.current.value !== ""
    ) {
      try {
        await addDoc(collection(db, "militaryEvents"), eventDatas);
      } catch (error) {
        console.error("Échec de la création de l’événement :", error);
        return false;
      }
      const notificationDatas = {
        eventDate: eventDatas.date,
        type: "evenement militaire",
        missionType: eventDatas.type,
        createdAt: eventDatas.createdAt,
        creator: eventDatas.creator,
        creatorId: eventDatas.creatorId,
        name: eventDatas.name,
        associatedEvent: eventDatas.notificationId,
      };

      if (eventDatas.civilianOpened === "non") {
        await Promise.allSettled(
        (users || [])
            .filter(
              (user) =>
                (user.factionPart === "militaire" &&
                  user.id !== currentUser.userId) ||
                (user.factionPart === "civil-militaire" &&
                  user.id !== currentUser.userId)
            ).map((user) =>
          updateDoc(doc(db, "users", user.id), {
            notifications: arrayUnion(notificationDatas),
          })
        )
      )
      } else {
        await Promise.allSettled(
        (users || [])
            .filter(
              (user) =>
                (user.factionPart === "militaire" &&
                  user.id !== currentUser.userId) ||
                (user.factionPart === "civil-militaire" &&
                  user.id !== currentUser.userId) ||
                (user.factionPart === "civil" && user.id !== currentUser.userId)
            ).map((user) =>
          updateDoc(doc(db, "users", user.id), {
            notifications: arrayUnion(notificationDatas),
          })
        )
      )
      }
      return true;
    }
    return false;
  };

  return (
    <div
      id="evenements"
      className="military-bulletin-board-event-displayer-main-container"
    >
      <div className="military-bulletin-board-event-displayer-main-container-header">
        <h2 className="military-bulletin-board-event-displayer-main-container-title">
          Evenements
        </h2>
        <div className="military-bulletin-board-event-displayer-main-container-header-buttons-container">
          {isSettingNewEvent === false ? (
            <div
              className="military-bulletin-board-add-event-container"
              onClick={() => setIsSettingNewEvent(true)}
            >
              <AddCircle /> <span>Ajouter un evenement</span>
            </div>
          ) : (
            ""
          )}
          {isViewingArchives ? (
            <div
              className="military-bulletin-board-add-event-container"
              onClick={() =>
                setIsViewingArchives(false) &
                dispatch(setEventDetailsWindowActive(""))
              }
            >
              <span>Evenements en cours</span>
            </div>
          ) : (
            <div
              className="military-bulletin-board-add-event-container"
              onClick={() =>
                setIsViewingArchives(true) &
                dispatch(setEventDetailsWindowActive(""))
              }
            >
              <span>Archives</span>
            </div>
          )}
        </div>
      </div>

      <div className={"military-bulletin-board-event-displayer-sub-container "}>
        {isViewingArchives ? (
          <>
            <div className="military-bulletin-board-event-displayer-events">
              {militaryEventsArchives &&
                [...militaryEventsArchives]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((event) => (
                    <MilitaryEvent
                      event={event}
                      key={event.id}
                      archive={true}
                    />
                  ))}
            </div>
            <div
              className={
                eventDetailsWindowActive === ""
                  ? "military-bulletin-board-event-displayer-events-card"
                  : "military-bulletin-board-event-displayer-events-card displaced"
              }
            >
              <MilitaryEventCard
                event={eventActive && eventActive}
                isViewingArchives={isViewingArchives}
                archive={true}
              />
            </div>
          </>
        ) : (
          <>
            <div className="military-bulletin-board-event-displayer-events">
              {militaryEvents &&
                [...militaryEvents]
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((event) => (
                    <MilitaryEvent event={event} key={event.id} />
                  ))}
            </div>
            <div
              className={
                eventDetailsWindowActive === ""
                  ? "military-bulletin-board-event-displayer-events-card"
                  : "military-bulletin-board-event-displayer-events-card displaced"
              }
            >
              <MilitaryEventCard event={eventActive && eventActive} />
            </div>
          </>
        )}
      </div>

      {isSettingNewEvent === true ? (
        <div className="military-bulletin-board-event-options-container">
          <div
            className="military-bulletin-board-cancel-event-container"
            onClick={() => setIsSettingNewEvent(false)}
          >
            <span>Annuler</span>
          </div>
          <h3>Création d'un évènement</h3>
          <div className="military-bulletin-board-event-options-container-creator-id">
            <span>Organisateur:</span>{" "}
            <span className="military-bulletin-board-event-options-container-creator-id-photo-wrapper">
              <img src={currentUser.photo} alt={currentUser.photo} />
            </span>
            <span className="military-bulletin-board-event-options-container-creator-pseudo">
              {currentUser.currentUser}
            </span>
          </div>
          <div className="military-bulletin-board-event-options-sub-container">
            <div className="military-bulletin-board-event-options-input-container">
              <label htmlFor="event-name">Nom de l'évènement</label>
              <input
                id="event-name"
                type="text"
                placeholder="Nom de l'evènement..."
                ref={eventName}
              />
            </div>
            <div className="military-bulletin-board-event-options-input-container">
              <label htmlFor="event-date">Date de l'évènement</label>
              <input id="event-date" type="datetime-local" ref={eventDate} />
            </div>
            <div className="military-bulletin-board-event-options-input-container">
              <label htmlFor="event-location">Lieux de l'évènement</label>
              <input
                id="event-location"
                type="text"
                placeholder="Lieu de l'evènement..."
                ref={eventLocation}
              />
            </div>
          </div>
          <div className="military-bulletin-board-event-options-sub-container">
            <div className="military-bulletin-board-event-options-input-container">
              <select ref={eventInstructor}>
                <option value="">Instructeur...</option>
                {users &&
                  [...users]
                    .filter(
                      (user) =>
                        user.factionPart === "militaire" ||
                        user.factionPart === "civil-militaire"
                    )
                    .map((user) => {
                      return (
                        <option key={user.userId} value={user.pseudo}>
                          {user.RPName ? user.RPName : user.pseudo}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className="military-bulletin-board-event-options-input-container">
              <select ref={eventType}>
                <option value="">Type de sortie...</option>
                <option value="mission officielle">Mission Officielle</option>
                <option value="entrainement">Entrainement</option>
                <option value="sortie détente">Sortie détente</option>
              </select>
            </div>
            <div className="military-bulletin-board-event-options-input-container">
              <select ref={eventOutfit}>
                <option value="">Tenue de service...</option>
                <option value="Obligatoire">Obligatoire</option>
                <option value="Vivement souhaité">Vivement souhaité</option>
                <option value="A l'appreciation de chacun">
                  A l'appreciation de chacun
                </option>
              </select>
            </div>
            <div className="military-bulletin-board-event-options-input-container">
              <select ref={eventOutfitCamo}>
                <option value="">Camouflage infanterie...</option>
                <option value="Aucun">Aucun</option>
                <option value="Urbain">Urbain</option>
                <option value="Arctique">Arctique</option>
                <option value="Foret">Foret</option>
                <option value="Desert">Desert</option>
              </select>
            </div>
          </div>
          <div className="military-bulletin-board-event-options-sub-container">
            <div className="military-bulletin-board-event-options-input-container">
              <select ref={eventCivilianOpened}>
                <option value="">Civils acceptés...</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>
          </div>

          <div className="military-bulletin-board-event-options-sub-container">
            <textarea
              placeholder="Description de l'évènement..."
              ref={eventDescription}
            ></textarea>
          </div>
          <button
            onClick={async (e) => {
              if (await handleAddNewEvent(e)) setIsSettingNewEvent(false);
            }}
          >
            Valider la création
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MilitaryEventBoard;
