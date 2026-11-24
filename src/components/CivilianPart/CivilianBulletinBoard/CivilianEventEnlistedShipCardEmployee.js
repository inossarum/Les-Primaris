import {doc, updateDoc} from "firebase/firestore";
import React from "react";
import {db} from "../../../utils/firebase.config";
import {useSelector} from "react-redux";

const CivilianEventEnlistedShipCardEmployee = ({employee, ship}) => {
  const currentUser = useSelector((state) => state.user);
  const eventDetails = useSelector((state) => state.events.eventDetails);
  const actualEventDetails = useSelector((state) =>
    state.events.civilianEvents.find((event) => event.id === eventDetails.id)
  );

  const handleRemoveEmployee = async (e) => {
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

    const vehicleEmployeesUpdated = [...ship?.employees].filter(
      (shipPostulant) => shipPostulant.userId !== employee.userId
    );

    const addedVehiclesDatas = {
      name: ship.name,
      id: ship.id,
      owner: ship.owner,
      postulants: ship.postulants,
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

  return (
    <div className="civilian-event-enlisted-ship-card-postulant-body">
      <div className="civilian-event-enlisted-ship-card-postulant-informations">
        <span className="info-blue">{employee?.pseudo}</span>
        <span className="info-violet-uppercase">{employee?.job}</span>
      </div>
      {currentUser?.webSiteRole === "administrateur" ||
      currentUser?.webSiteRole === "moderateur" ? (
        <div>
          {" "}
          <span
            className="civilian-event-enlisted-ship-card-postulant-button info-red"
            onClick={(e) => handleRemoveEmployee(e)}
          >
            Supprimer
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CivilianEventEnlistedShipCardEmployee;
