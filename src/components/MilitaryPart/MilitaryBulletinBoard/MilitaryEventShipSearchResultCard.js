import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import {
  getEventSearchShipsList,
  setIsBringingVehicle,
} from "../../../feature/events.slice";

const MilitaryEventShipSearchResultCard = ({ship}) => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const currentEvent = useSelector((state) =>
    [...state.events.militaryEvents].find(
      (event) => event.id === state.events.eventDetails.id
    )
  );
  const [vehicleSelected, setVehicleSelected] = useState(false);
  const maxCrewAllowed = useRef();

  const [errorDescriptionMessage, setErrorDescriptionMessage] = useState("");
  const vehicleDescription = useRef();

  const handleAddShipToEvent = async (e) => {
    e.preventDefault();

    const currentEventVehiclesList = currentEvent.vehicles;

    const addedVehiclesDatas = {
      name: ship.name,
      id: ship.id,
      owner: currentUser.currentUser,
      postulants: [],
      employees: [],
      maxCrew: ship.maxCrew,
      vehiclePicture: ship.storeImageLarge,
      vehicleId: Date.now() + Math.random(),
      maxCrewAllowed: Number(maxCrewAllowed.current.value),
      createdAt: Date.now(),
      description: vehicleDescription.current.value,
    };

    if (vehicleDescription.current.value === "") {
      setErrorDescriptionMessage("Indiquez les postes à pourvoir");
      setTimeout(() => setErrorDescriptionMessage(""), 3000);
    } else {
      await updateDoc(doc(db, "militaryEvents", currentEvent.id), {
        vehicles: [...currentEventVehiclesList, addedVehiclesDatas],
      });

      setVehicleSelected(false);
      dispatch(getEventSearchShipsList(""));
      dispatch(setIsBringingVehicle(false));
    }
  };

  return (
    <>
      <div
        className="military-event-ship-search-result-card-body"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={() => setVehicleSelected(true)}
      >
        {vehicleSelected === true ? (
          <span
            className="military-event-ship-search-result-card-image"
            style={{
              background: `url(${ship?.storeImageLarge}) center/cover no-repeat`,
            }}
          >
            <div className="military-event-ship-search-result-card-name">
              <span>{ship?.name.split("-").join(" ")}</span>
            </div>
            <div className="military-event-ship-search-result-card-role-container">
              <span>Equipage Maximum</span>
              <div className="military-event-ship-search-result-card-sub-container">
                <div className="military-event-ship-search-result-card-block">
                  <span>Equipage maximum autorisé</span>
                  <input
                    type={"text"}
                    ref={maxCrewAllowed}
                    defaultValue={ship?.maxCrew}
                  ></input>
                </div>
                <div className="military-event-ship-search-result-card-block">
                  <span>Equipage maximum conseillé: </span>
                  <span className="info-red">{ship?.maxCrew}</span>
                </div>
              </div>
              <div className="military-event-ship-search-result-card-description-container">
                <div className="military-event-ship-search-result-card-block">
                  <span>Description rapide des postes</span>
                  <textarea
                    ref={vehicleDescription}
                    placeholder="Veuillez détailler les postes... Ex: 1 pilote / 1 artilleur"
                  ></textarea>
                  <span className="info-red-uppercase">
                    {errorDescriptionMessage}
                  </span>
                </div>
              </div>
              <div className="military-event-ship-search-result-card-sub-container">
                <input
                  className="military-event-ship-search-result-card-role-button"
                  type="submit"
                  value={"valider"}
                  onClick={(e) => handleAddShipToEvent(e)}
                />
              </div>
            </div>
          </span>
        ) : (
          <span
            className="military-event-ship-search-result-card-image"
            style={{
              background: `url(${ship?.storeImageLarge}) center/cover no-repeat`,
            }}
          >
            <div className="military-event-ship-search-result-card-name">
              <span>{ship?.name.split("-").join(" ")}</span>
            </div>
            {mouseIsOver === true ? (
              <div className="selector">Sélectionner ce vaisseau</div>
            ) : (
              ""
            )}
          </span>
        )}
      </div>
    </>
  );
};

export default MilitaryEventShipSearchResultCard;
