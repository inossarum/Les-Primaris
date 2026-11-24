import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import {NavLink} from "react-router-dom";
import {Folder, Forum, PeopleAlt} from "@mui/icons-material";

const AdministrationHome = () => {
  return (
    <div
      className="administration-home-body"
      style={{
        background: `url(./assets/img/departments/administration-home-background.webp) center/cover no-repeat fixed`,
      }}
    >
      <NavBar pageActive={"administrationHome"} factionPart="administration" />

      <div className="administration-home-title-container">
        <h2 className="administration-home-title">
          Administration Centrale Primaris
        </h2>
      </div>
      <div className="administration-home-main-container">
        <div className="administration-home-logo-wrapper">
          <img
            className="administration-home-department-logo"
            src="./assets/img/departments/centralAdministration.webp"
            alt=""
          />
        </div>

        <div className="administration-home-buttons-container">
          <NavLink
            className="administration-home-button left"
            to="/administrationUsers"
          >
            <div>
              <PeopleAlt />
              <span>Utilisateurs enregistrés</span>
            </div>
          </NavLink>
          <NavLink
            className="administration-home-button middle"
            to="/administrationPrivateMessagingServices"
          >
            <div>
              <Forum />
              <span>Forum des modérateurs</span>
            </div>
          </NavLink>
          <div className="administration-home-button right" aria-disabled="true">
            <div>
              <Folder />
              <span>Documents divers</span>
              <small>Indisponible</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrationHome;
