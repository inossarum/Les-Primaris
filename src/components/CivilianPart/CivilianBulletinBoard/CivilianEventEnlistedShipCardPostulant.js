import {doc, updateDoc} from "firebase/firestore";
import React from "react";
import {db} from "../../../utils/firebase.config";
import {useSelector} from "react-redux";

const CivilianEventEnlistedShipCardPostulant = ({postulant, ship}) => {
  const currentUser = useSelector((state) => state.user);
  const eventDetails = useSelector((state) => state.events.eventDetails);
  const actualEventDetails = useSelector((state) =>
    state.events.civilianEvents.find((event) => event.id === eventDetails.id)
  );

  const handleAcceptPostulant = async (e) => {
    e.preventDefault();

    const currentEventVehiclesList = actualEventDetails?.vehicles;
    const currentEventVehiclesListAfterFilter = [
      ...currentEventVehiclesList,
    ].filter(
      (currentEventVehicle) => currentEventVehicle.vehicleId !== ship.vehicleId
    );

    await updateDoc(doc(db, "civilianEvents", actualEventDetails.id), {
      vehicles: currentEventVehiclesListAfterFilter,
    });

    const postulantDatas = postulant;

    const vehiclePostulantsUpdated = [...ship?.postulants].filter(
      (shipPostulant) => shipPostulant.userId !== postulant.userId
    );

    const vehicleEmployeesUpdated = [...ship?.employees, postulantDatas];

    const addedVehiclesDatas = {
      name: ship.name,
      id: ship.id,
      owner: ship.owner,
      postulants: vehiclePostulantsUpdated,
      employees: vehicleEmployeesUpdated,
      maxCrew: ship.maxCrew,
      vehiclePicture: ship.vehiclePicture,
      vehicleId: ship.vehicleId,
      vehicleRole: ship.vehicleRole,
      maxCrewAllowed: ship.maxCrewAllowed,
      createdAt: ship.createdAt,
      description: ship.description,
    };

    await updateDoc(doc(db, "civilianEvents", actualEventDetails.id), {
      vehicles: [...currentEventVehiclesListAfterFilter, addedVehiclesDatas],
    });
  };

  const handleRefusePostulant = async (e) => {
    e.preventDefault();

    const currentEventVehiclesList = actualEventDetails?.vehicles;
    const currentEventVehiclesListAfterFilter = [
      ...currentEventVehiclesList,
    ].filter(
      (currentEventVehicle) => currentEventVehicle.vehicleId !== ship.vehicleId
    );

    await updateDoc(doc(db, "civilianEvents", actualEventDetails.id), {
      vehicles: currentEventVehiclesListAfterFilter,
    });

    const vehiclePostulantsUpdated = [...ship?.postulants].filter(
      (shipPostulant) => shipPostulant.userId !== postulant.userId
    );

    const addedVehiclesDatas = {
      name: ship.name,
      id: ship.id,
      owner: ship.owner,
      postulants: vehiclePostulantsUpdated,
      employees: ship.employees,
      maxCrew: ship.maxCrew,
      vehiclePicture: ship.vehiclePicture,
      vehicleId: ship.vehicleId,
      vehicleRole: ship.vehicleRole,
      maxCrewAllowed: ship.maxCrewAllowed,
      createdAt: ship.createdAt,
      description: ship.description,
    };

    await updateDoc(doc(db, "civilianEvents", actualEventDetails.id), {
      vehicles: [...currentEventVehiclesListAfterFilter, addedVehiclesDatas],
    });
  };

  return (
    <div className="civilian-event-enlisted-ship-card-postulant-body">
      <div className="civilian-event-enlisted-ship-card-postulant-informations">
        <span className="info-blue">{postulant?.pseudo}</span>
        <span className="info-violet-uppercase ">{postulant?.job}</span>
      </div>
      {currentUser?.webSiteRole === "administrateur" ||
      currentUser?.webSiteRole === "moderateur" ? (
        <div className="civilian-event-enlisted-ship-card-postulant-buttons-container">
          {" "}
          <span
            className="civilian-event-enlisted-ship-card-postulant-button info-green"
            onClick={(e) => handleAcceptPostulant(e)}
          >
            Accepter
          </span>
          <span
            className="civilian-event-enlisted-ship-card-postulant-button info-red"
            onClick={(e) => handleRefusePostulant(e)}
          >
            Refuser
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CivilianEventEnlistedShipCardPostulant;
