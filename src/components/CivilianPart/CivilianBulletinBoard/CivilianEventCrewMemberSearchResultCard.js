import React, {useRef} from "react";

import {useDispatch, useSelector} from "react-redux";

import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import Avatar from "../../SocialNetwork/Avatar";
import {setEventUserSearchingActive} from "../../../feature/events.slice";

const CivilianEventCrewMemberSearchResultCard = ({
  user,
  actualShipSelected,
}) => {
  const eventDetails = useSelector((state) => state.events.eventDetails);
  const actualEventDetails = useSelector((state) =>
    state.events.civilianEvents.find((event) => event.id === eventDetails.id)
  );
  const dispatch = useDispatch();
  const job = useRef();

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const currentEventVehiclesList = actualEventDetails?.vehicles;
    const currentEventVehiclesListAfterFilter = [
      ...currentEventVehiclesList,
    ].filter(
      (currentEventVehicle) =>
        currentEventVehicle.vehicleId !== actualShipSelected.vehicleId
    );

    const userDatas = {
      createdAt: Date.now(),
      pseudo: user.pseudo,
      photo: user.photo,
      userId: user.id,
      factionPart: user.factionPart,
      factionRank: user.factionRank,
      job: job.current.value,
      shipDesired: actualShipSelected.vehicleId,
      notificationId: Date.now() + Math.random(),
    };

    const vehicleEmployeesUpdated = [
      ...actualShipSelected?.employees,
      userDatas,
    ];

    const addedVehiclesDatas = {
      name: actualShipSelected.name,
      id: actualShipSelected.id,
      owner: actualShipSelected.owner,
      postulants: actualShipSelected.postulants,
      employees: vehicleEmployeesUpdated,
      maxCrew: actualShipSelected.maxCrew,
      vehiclePicture: actualShipSelected.vehiclePicture,
      vehicleId: actualShipSelected.vehicleId,
      vehicleRole: actualShipSelected.vehicleRole,
      maxCrewAllowed: actualShipSelected.maxCrewAllowed,
      createdAt: actualShipSelected.createdAt,
      description: actualShipSelected.description,
    };

    await updateDoc(doc(db, "civilianEvents", actualEventDetails.id), {
      vehicles: currentEventVehiclesListAfterFilter,
    });

    await updateDoc(doc(db, "civilianEvents", actualEventDetails.id), {
      vehicles: [...currentEventVehiclesListAfterFilter, addedVehiclesDatas],
    });
  };

  return (
    <div className="civilian-event-crew-member-search-result-card-body">
      <div
        key={user.userId}
        className="civilian-event-crew-member-search-result-main-container"
      >
        <div className="civilian-event-crew-member-search-panel-image-wrapper">
          {user?.photo !== "" ? (
            <img src={user?.photo} alt={user?.photo} />
          ) : (
            <Avatar className="civilian-event-crew-member-search-panel-avatar" />
          )}
        </div>
        <span className="civilian-event-crew-member-search-panel-name">
          {user.pseudo}
        </span>
      </div>
      <div className="civilian-event-crew-member-search-panel-job-selector">
        {actualShipSelected.maxCrewAllowed <= 1 ? (
          <select ref={job}>
            <option value="">Selection...</option>
            <option value="pilote">Pilote</option>
          </select>
        ) : (
          <select ref={job}>
            <option value="">Selection...</option>
            <option value="commandant">Commandant</option>
            <option value="commandant en second">Commandant en second</option>
            <option value="pilote">Pilote</option>
            <option value="Medecin Chef de bord">Medecin Chef de bord</option>
            <option value="Medecin de bord">Medecin de bord</option>
            <option value="Medecin urgentiste">Medecin urgentiste</option>
            <option value="Chef artilleur">Chef artilleur</option>
            <option value="Artilleur">Artilleur</option>
            <option value="Chef ingénieur">Chef ingénieur</option>
            <option value="Ingénieur">Ingénieur</option>
            <option value="Chef d'escadrille">Chef d'escadrille</option>
            <option value="Ailier">Ailier</option>
            <option value="Responsable matériel">Responsable matériel</option>
            <option value="Manutentionnaire">Manutentionnaire</option>
          </select>
        )}

        <button
          type="submit"
          onClick={(e) =>
            { handleAddEmployee(e); dispatch(setEventUserSearchingActive(false)); }
          }
        >
          Valider le choix
        </button>
      </div>
    </div>
  );
};

export default CivilianEventCrewMemberSearchResultCard;
