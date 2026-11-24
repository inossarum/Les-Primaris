import {AddCircle} from "@mui/icons-material";
import {addDoc, arrayUnion, collection, doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../../utils/firebase.config";
import CivilianEvent from "./CivilianEvent";
import CivilianEventCard from "./CivilianEventCard";
import {setEventDetailsWindowActive} from "../../../feature/events.slice";

const CivilianEventBoard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const civilianEvents = useSelector((state) => state.events.civilianEvents);
  const civilianEventsArchives = useSelector(
    (state) => state.events.civilianEventsArchives
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
  const eventDate = useRef();
  const eventType = useRef();
  const eventLocation = useRef();
  const eventChief = useRef();
  const eventTheme = useRef();

  const handleAddNewEvent = async (e) => {
    e.preventDefault();
    if (!currentUser?.userId) return false;
    const eventDatas = {
      creator: currentUser.currentUser,
      creatorId: currentUser.userId,
      name: eventName.current.value,
      description: eventDescription.current.value,
      type: eventType.current.value,
      theme: eventTheme.current.value,
      date: eventDate.current.value,
      outfit: eventOutfit.current.value,
      location: eventLocation.current.value,
      chief: eventChief.current.value,
      players: [],
      vehicles: [],
      createdAt: Date.now(),
      notificationId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };

    if (
      eventName.current.value.trim() !== "" &&
      eventDate.current.value !== "" &&
      eventType.current.value !== ""
    ) {
      try {
        await addDoc(collection(db, "civilianEvents"), eventDatas);
      } catch (error) {
        console.error("Échec de la création de l’événement :", error);
        return false;
      }
      const notificationDatas = {
        eventDate: eventDatas.date,
        type: "evenement civil",
        eventType: eventDatas.type,
        eventTheme: eventDatas.theme,
        createdAt: eventDatas.createdAt,
        creator: eventDatas.creator,
        creatorId: eventDatas.creatorId,
        name: eventDatas.name,
        associatedEvent: eventDatas.notificationId,
      };
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
      return true;
    }
    return false;
  };

  return (
    <div
      id="evenements"
      className="civilian-bulletin-board-event-displayer-main-container"
    >
      <div className="civilian-bulletin-board-event-displayer-main-container-header">
        <h2 className="civilian-bulletin-board-event-displayer-main-container-title">
          Evenements
        </h2>
        <div className="civilian-bulletin-board-event-displayer-main-container-header-buttons-container">
          {isSettingNewEvent === false ? (
            <div
              className="civilian-bulletin-board-add-event-container"
              onClick={() => setIsSettingNewEvent(true)}
            >
              <AddCircle /> <span>Ajouter un evenement</span>
            </div>
          ) : (
            ""
          )}
          {isViewingArchives ? (
            <div
              className="civilian-bulletin-board-add-event-container"
              onClick={() =>
                { setIsViewingArchives(false); dispatch(setEventDetailsWindowActive("")); }
              }
            >
              <span>Evenements en cours</span>
            </div>
          ) : (
            <div
              className="civilian-bulletin-board-add-event-container"
              onClick={() =>
                { setIsViewingArchives(true); dispatch(setEventDetailsWindowActive("")); }
              }
            >
              <span>Archives</span>
            </div>
          )}
        </div>
      </div>
      <div className={"civilian-bulletin-board-event-displayer-sub-container "}>
        {isViewingArchives ? (
          <>
            <div className="civilian-bulletin-board-event-displayer-events">
              {civilianEventsArchives &&
                [...civilianEventsArchives]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((event) => (
                    <CivilianEvent
                      event={event}
                      key={event.id}
                      archive={true}
                    />
                  ))}
            </div>
            <div
              className={
                eventDetailsWindowActive === ""
                  ? "civilian-bulletin-board-event-displayer-events-card"
                  : "civilian-bulletin-board-event-displayer-events-card displaced"
              }
            >
              <CivilianEventCard
                event={eventActive && eventActive}
                isViewingArchives={isViewingArchives}
                archive={true}
              />
            </div>
          </>
        ) : (
          <>
            <div className="civilian-bulletin-board-event-displayer-events">
              {civilianEvents &&
                [...civilianEvents]
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((event) => (
                    <CivilianEvent event={event} key={event.id} />
                  ))}
            </div>
            <div
              className={
                eventDetailsWindowActive === ""
                  ? "civilian-bulletin-board-event-displayer-events-card"
                  : "civilian-bulletin-board-event-displayer-events-card displaced"
              }
            >
              <CivilianEventCard event={eventActive && eventActive} />
            </div>
          </>
        )}
      </div>
      {isSettingNewEvent === true ? (
        <div className="civilian-bulletin-board-event-options-container">
          <div
            className="civilian-bulletin-board-cancel-event-container"
            onClick={() => setIsSettingNewEvent(false)}
          >
            <span>Annuler</span>
          </div>
          <h3>Création d'un évènement</h3>
          <div className="civilian-bulletin-board-event-options-container-creator-id">
            <span>Organisateur:</span>{" "}
            <span className="civilian-bulletin-board-event-options-container-creator-id-photo-wrapper">
              {currentUser.photo ? (
                <img src={currentUser.photo} alt={currentUser.photo} />
              ) : (
                ""
              )}
            </span>
            <span className="civilian-bulletin-board-event-options-container-creator-pseudo">
              {currentUser.currentUser}
            </span>
          </div>
          <div className="civilian-bulletin-board-event-options-sub-container">
            <div className="civilian-bulletin-board-event-options-input-container">
              <label htmlFor="event-name">Nom de l'évènement</label>
              <input
                id="event-name"
                type="text"
                placeholder="Nom de l'evènement..."
                ref={eventName}
              />
            </div>
            <div className="civilian-bulletin-board-event-options-input-container">
              <label htmlFor="event-date">Date de l'évènement</label>
              <input id="event-date" type="datetime-local" ref={eventDate} />
            </div>
            <div className="civilian-bulletin-board-event-options-input-container">
              <label htmlFor="event-location">Lieux de l'évènement</label>
              <input
                id="event-location"
                type="text"
                placeholder="Lieu de l'evènement..."
                ref={eventLocation}
              />
            </div>
          </div>
          <div className="civilian-bulletin-board-event-options-sub-container">
            <div className="civilian-bulletin-board-event-options-input-container">
              <select ref={eventChief}>
                <option value="">Responsable...</option>
                {users &&
                  [...users]
                    .filter(
                      (user) =>
                        user.factionPart === "militaire" ||
                        user.factionPart === "civil-militaire" ||
                        user.factionPart === "civil"
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
            <div className="civilian-bulletin-board-event-options-input-container">
              <select ref={eventType}>
                <option value="">Type de sortie...</option>
                <option value="sortie corporation">Sortie Corporation</option>
                <option value="mission départementale">
                  Mission départementale
                </option>
                <option value="formation professionnelle">
                  Formation professionnelle
                </option>
                <option value="sortie détente">Sortie détente</option>
              </select>
            </div>
            <div className="civilian-bulletin-board-event-options-input-container">
              <select ref={eventTheme}>
                <option value="">Thème de la sortie...</option>
                <option value="Exploration">Exploration</option>
                <option value="Transport">Transport</option>
                <option value="Commerce">Commerce</option>
                <option value="Tourisme">Tourisme</option>
                <option value="Recyclage">Recyclage</option>
                <option value="Minage">Minage</option>
                <option value="Course sportive">Course sportive</option>
                <option value="Chill">Chill</option>
                <option value="Vol en raze motte">Vol en raze motte</option>
              </select>
            </div>
            <div className="civilian-bulletin-board-event-options-input-container">
              <select ref={eventOutfit}>
                <option value="">Tenue de travail...</option>
                <option value="Obligatoire">Obligatoire</option>
                <option value="Vivement recommandée">
                  Vivement recommandée
                </option>
                <option value="A l'appreciation de chacun">
                  A l'appreciation de chacun
                </option>
              </select>
            </div>
          </div>
          <div className="civilian-bulletin-board-event-options-sub-container">
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

export default CivilianEventBoard;
