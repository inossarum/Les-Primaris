import React from "react";
import ExplorationDepartmentLocationSearchBar from "./ExplorationDepartmentLocationSearchBar";
import ExplorationDepartmentLocationDisplayer from "./ExplorationDepartmentLocationsDisplayer";
import ExplorationDepartmentAddNewLocationButton from "./ExplorationDepartmentAddNewLocationButton";
import ExplorationDepartmentAddNewLocationForm from "./ExplorationDepartmentAddNewLocationForm";

const ExplorationDepartmentLocationsLeftBlock = () => {
  return (
    <div className="exploration-department-locations-left-block-body">
      <ExplorationDepartmentAddNewLocationForm />
      <div className="exploration-department-locations-left-block-main-container">
        <ExplorationDepartmentAddNewLocationButton />
        <ExplorationDepartmentLocationSearchBar />
        <ExplorationDepartmentLocationDisplayer />
      </div>
    </div>
  );
};

export default ExplorationDepartmentLocationsLeftBlock;
