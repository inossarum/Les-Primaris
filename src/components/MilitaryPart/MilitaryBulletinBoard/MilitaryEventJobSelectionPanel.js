import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEventJobSelectionActive} from "../../../feature/events.slice";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";

const MilitaryEventJobSelectionPanel = ({vehicle}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const eventDetails = useSelector((state) => state.events.eventDetails);
  const actualEventDetails = useSelector((state) =>
    state.events.militaryEvents.find((event) => event.id === eventDetails.id)
  );
  const actualEventShipSelected = useSelector(
    (state) => state.events.actualEventShipSelected
  );

  const job = useRef();

  const handleAddCrewMemberPostulant = async (e) => {
    e.preventDefault();

    const postulantDatas = {
      createdAt: Date.now(),
      pseudo: user.currentUser,
      photo: user.photo,
      userId: user.userId,
      factionPart: user.factionPart,
      factionRank: user.factionRank,
      job: job.current.value,
      shipDesired: actualEventShipSelected.vehicleId,
      notificationId: Date.now() + Math.random(),
    };

    const vehiclePostulantsUpdated = [...vehicle?.postulants, postulantDatas];
    const currentEventVehiclesList = actualEventDetails?.vehicles;
    const currentEventVehiclesListAfterFilter = [
      ...currentEventVehiclesList,
    ].filter(
      (currentEventVehicle) =>
        currentEventVehicle.vehicleId !== vehicle.vehicleId
    );

    await updateDoc(doc(db, "militaryEvents", actualEventDetails.id), {
      vehicles: currentEventVehiclesListAfterFilter,
    });

    const addedVehiclesDatas = {
      name: vehicle.name,
      id: vehicle.id,
      owner: vehicle.owner,
      postulants: vehiclePostulantsUpdated,
      employees: vehicle.employees,
      maxCrew: vehicle.maxCrew,
      vehiclePicture: vehicle.vehiclePicture,
      vehicleId: vehicle.vehicleId,
      maxCrewAllowed: vehicle.maxCrewAllowed,
      createdAt: vehicle.createdAt,
      description: vehicle.description,
    };

    await updateDoc(doc(db, "militaryEvents", actualEventDetails.id), {
      vehicles: [...currentEventVehiclesListAfterFilter, addedVehiclesDatas],
    });
  };

  if (vehicle.vehicleId === actualEventShipSelected.vehicleId) {
    return (
      <div className="military-event-job-selection-panel-body">
        <div className="user-search-panel-drop-filter ">
          <h3 className="user-search-panel-drop-filter-title">
            Selectionner un poste
          </h3>
          <div className="user-search-panel-drop-filter-sub-container margin-b-10">
            <span className="label">Vaisseau selectionné:</span>
            <span className="margin-l-10 info-yellow">{vehicle?.name}</span>
          </div>
          <div className="user-search-panel-drop-filter-sub-container margin-b-10">
            {" "}
            <span className="label">Nom:</span>
            <span className="margin-l-10 info-yellow">{user.currentUser}</span>
          </div>
          <div className="user-search-panel-drop-filter-sub-container margin-b-10">
            <span className="label">Grade:</span>
            <span className="margin-l-10 info-yellow-capitalize">
              {user.factionRank}
            </span>
          </div>

          <div className="crew-member-search-panel-job-selector">
            {actualEventShipSelected?.maxCrewAllowed <= 1 ? (
              <select ref={job}>
                <option value="">Selection...</option>
                <option value="pilote">Pilote</option>
              </select>
            ) : (
              <select ref={job}>
                <option value="">Selection...</option>
                <option value="commandant">Commandant</option>
                <option value="commandant en second">
                  Commandant en second
                </option>
                <option value="pilote">Pilote</option>
                <option value="Medecin Chef de bord">
                  Medecin Chef de bord
                </option>
                <option value="Medecin de bord">Medecin de bord</option>
                <option value="Medecin urgentiste">Medecin urgentiste</option>
                <option value="Chef artilleur">Chef artilleur</option>
                <option value="Artilleur">Artilleur</option>
                <option value="Chef ingénieur">Chef ingénieur</option>
                <option value="Ingénieur">Ingénieur</option>
                <option value="Chef d'escadrille">Chef d'escadrille</option>
                <option value="Ailier">Ailier</option>
                <option value="Responsable matériel">
                  Responsable matériel
                </option>
                <option value="Manutentionnaire">Manutentionnaire</option>
              </select>
            )}

            <button
              className="primaris-ingame-shop-new-product-form-button-green"
              type="submit"
              onClick={(e) =>
                (handleAddCrewMemberPostulant(e), dispatch(setEventJobSelectionActive(false)))
              }
            >
              Valider le choix
            </button>
          </div>

          <button
            className="primaris-ingame-shop-new-product-form-button-red"
            type="submit"
            onClick={() => dispatch(setEventJobSelectionActive(false))}
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }
};

export default MilitaryEventJobSelectionPanel;
