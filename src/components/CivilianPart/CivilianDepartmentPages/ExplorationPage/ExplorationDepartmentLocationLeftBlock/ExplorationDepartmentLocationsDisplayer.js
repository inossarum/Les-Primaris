import React from "react";
import {useSelector} from "react-redux";
import ExplorationDepartmentLocationCard from "./ExplorationDepartmentLocationCard";

const ExplorationDepartmentLocationDisplayer = () => {
  const locations = useSelector(
    (state) => state.departmentPages.explorationDepartmentLocations
  );

  return (
    <div className="exploration-department-location-displayer-body">
      <span className="exploration-department-location-displayer-title">
        Nos points d'intérêts
      </span>
      {locations && locations[0] ? (
        <div className="exploration-department-location-displayer-main-container">
          {locations &&
            locations.map((location) => (
              <ExplorationDepartmentLocationCard
                key={location.id ?? location.name}
                location={location}
              />
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExplorationDepartmentLocationDisplayer;
