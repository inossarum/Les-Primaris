import React from "react";
import {useDispatch} from "react-redux";
import {setDepartmentDisplayedBlock} from "../../../../../feature/departmentPages.slice";

const ExplorationDepartmentAddNewLocationButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="exploration-department-add-location-body">
      <span
        className="primaris-ingame-shop-new-product-form-button-exploration"
        onClick={(e) => dispatch(setDepartmentDisplayedBlock("extra-left"))}
      >
        Ajouter un point d'intérêt
      </span>
    </div>
  );
};

export default ExplorationDepartmentAddNewLocationButton;
