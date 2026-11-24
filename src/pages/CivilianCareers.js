import React from "react";
import CivilianDepartments from "../components/CivilianPart/CivilianDepartments";
import NavBar from "../components/Navbar/NavBar";

const CivilianCareer = () => {
  const departments = [
    "centralAdministration",
    "primarisAcademy",
    "explorationDepartment",
    "touringDepartment",
    "tradingDepartment",
    "industryDepartment",
    "sciencesDepartment",
    "medicineDepartment",
    "cultureDepartment",
    "multiDepartment",
  ];

  const department = departments[0];

  const rightSlider = (e) => {
    const civilianCareers = document.querySelector(".civilian-careers");
    civilianCareers.scrollLeft += window.innerWidth;
  };

  const leftSlider = (e) => {
    const civilianCareers = document.querySelector(".civilian-careers");
    civilianCareers.scrollLeft -= window.innerWidth;
  };

  return (
    <div className="civilian-careers">
      <NavBar factionPart="civilian" pageActive={"civilianCareers"} />
      <div className="slide-btn-container">
        <div className="left-btn-container">
          <button onClick={leftSlider} className="left-btn"></button>
        </div>
        <div className="right-btn-container">
          <button onClick={rightSlider} className="right-btn"></button>
        </div>
      </div>
      <div className="civilian-career-container">
        <div className={`departments-container ${department}`}>
          {departments.map((department) => {
            return (
              <CivilianDepartments key={department} department={department} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CivilianCareer;
