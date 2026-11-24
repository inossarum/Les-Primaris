import React from "react";
import {NavLink} from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import {useSelector} from "react-redux";

const MilitaryMenu = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="military-menu-body">
      <NavBar factionPart="military" pageActive={"militaryMenu"} />
      <div className="military-menu-container">
        <div className="metiers container">
          <h3 className="container-title">Les Départements</h3>
          <NavLink to="/militaryCareers" className="btn">
            <img
              src="./assets/img/departments/newyorkcity.webp"
              alt="etat Major de l'Exercitus"
            />
          </NavLink>
        </div>
        <div className="grades container">
          <h3 className="container-title">Les grades</h3>
          <NavLink to="/militaryRanks" className="btn">
            <img
              src="./assets/img/departments/ensemble-career.webp"
              alt="carrières"
            />
          </NavLink>
        </div>
        <div className="brevets container">
          <h3 className="container-title">Les brevets</h3>
          <NavLink to="/militaryPatents" className="btn">
            <img src="./assets/img/departments/brevet.webp" alt="brevet" />
          </NavLink>
        </div>
        <div className="tenues container">
          <h3 className="container-title">Les tenues</h3>
          <NavLink to="/militaryOutfits" className="btn">
            <img src="./assets/img/departments/tenues.webp" alt="tenues" />
          </NavLink>
        </div>
        {user.factionPart === "militaire" ||
        user.factionPart === "civil-militaire" ? (
          <div className="tenues container">
            <h3 className="container-title">Suivis des Personnels</h3>
            <NavLink to="/militaryTrainingsAndMissionsFollower" className="btn">
              <img src="./assets/img/departments/trainings.webp" alt="tenues" />
            </NavLink>
          </div>
        ) : (
          <NavLink></NavLink>
        )}
      </div>
    </div>
  );
};

export default MilitaryMenu;
