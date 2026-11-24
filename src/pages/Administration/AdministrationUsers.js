import React from "react";

import ParticulesAdministration from "../../components/Administration/AdministrationUsersList/ParticulesAdministration";
import NavBar from "../../components/Navbar/NavBar";

const AdministrationUsers = () => {
  return (
    <div className="administration-body">
      <NavBar factionPart="administration" pageActive="administrationUsers" />
      <div className="ember-container">
        <div className="ember-effect">
          <ParticulesAdministration />
        </div>
      </div>
    </div>
  );
};

export default AdministrationUsers;
