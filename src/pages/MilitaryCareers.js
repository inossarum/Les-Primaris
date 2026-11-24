import React from "react";

import NavBar from "../components/Navbar/NavBar";
import MilitaryDepartments from "../components/MilitaryPart/MilitaryDepartments.";

const MilitaryCareer = () => {
  const departments = [
    "staff",
    "aerospatialDepartment",
    "infantryDepartment",
    "logisticsDepartment",
    "militaryResearchDepartment",
    "militaryTrainingCenter",
    "militaryMedicineDepartment",
    "blackOpsDivision",
  ];

  const rightSlider = (e) => {
    const civilianCareers = document.querySelector(".military-careers");
    civilianCareers.scrollLeft += window.innerWidth;
  };

  const leftSlider = (e) => {
    const civilianCareers = document.querySelector(".military-careers");
    civilianCareers.scrollLeft -= window.innerWidth;
  };

  return (
    <div className="military-careers">
      <NavBar factionPart="military" pageActive={"militaryCareers"} />
      <div className="slide-btn-container">
        <div className="left-btn-container">
          <button onClick={leftSlider} className="left-btn"></button>
        </div>
        <div className="right-btn-container">
          <button onClick={rightSlider} className="right-btn"></button>
        </div>
      </div>
      <div className="military-career-container">
        <div className="departments-container">
          {departments.map((department) => {
            return (
              <MilitaryDepartments key={department} department={department} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MilitaryCareer;
