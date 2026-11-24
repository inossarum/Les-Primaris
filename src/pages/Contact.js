import React from "react";
import ParticulesContact from "../components/Contact/ParticulesContact";
import NavBar from "../components/Navbar/NavBar";

const Contact = () => {
  return (
    <div className="contact-body">
      <NavBar factionPart="civilian" pageActive={"contact"} />
      <div className="ember-container">
        <div className="ember-effect">
          <ParticulesContact />
        </div>
      </div>
    </div>
  );
};

export default Contact;
