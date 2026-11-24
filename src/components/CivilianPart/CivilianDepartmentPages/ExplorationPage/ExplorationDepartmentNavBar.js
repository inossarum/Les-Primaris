import React from "react";
import {useDispatch} from "react-redux";
import {setDepartmentDisplayedBlock} from "../../../../feature/departmentPages.slice";

const ExplorationDepartmentNavBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="exploration-department-navbar-body">
      <div className="exploration-department-navbar-main-container">
        <span
          className="primaris-ingame-shop-new-product-form-button-exploration"
          onClick={() => dispatch(setDepartmentDisplayedBlock("left"))}
        >
          points d'intérêts
        </span>

        <span
          className="primaris-ingame-shop-new-product-form-button-exploration"
          onClick={() => dispatch(setDepartmentDisplayedBlock("central"))}
        >
          News
        </span>
        <span
          className="primaris-ingame-shop-new-product-form-button-exploration"
          onClick={() => dispatch(setDepartmentDisplayedBlock("right"))}
        >
          Organigramme
        </span>
      </div>
    </div>
  );
};

export default ExplorationDepartmentNavBar;
