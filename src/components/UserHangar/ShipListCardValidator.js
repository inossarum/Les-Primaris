import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import CivilianShipInformationsForm from "./CivilianShipInformationsForm";
import MilitaryShipInformationsForm from "./MilitaryShipInformationsForm";
import {setSelectedShip} from "../../feature/userPrivateRoom.slice";

const ShipListCardValidator = () => {
  const dispatch = useDispatch();

  const [shipFactionPart, setShipFactionPart] = useState("");

  const selectedShipCardInfos = useSelector(
    (state) => state.userPrivateRoom.selectedShipCardInfos
  );

  return (
    <div className="ship-list-card-validator-body">
      <div
        className="ship-list-card-validator-main-container"
        style={{
          background: `url(${selectedShipCardInfos?.storeImageLarge})center/cover no-repeat`,
        }}
      >
        <button
          onClick={() => {
            dispatch(setSelectedShip(false));
          }}
        >
          Retour
        </button>
        <div className="ship-list-card-validator-header">
          <h2 className="ship-list-card-validator-title">
            Veuillez entrer les informations suivantes
          </h2>
        </div>
        <div className="ship-list-card-validator-informations">
          {shipFactionPart === "" ? <h3>Choisissez une corporation</h3> : ""}
          <div className="ship-list-card-validator-informations-faction-logos-container">
            {shipFactionPart === "" ? (
              <>
                <div className="ship-list-card-validator-informations-faction-logo-wrapper">
                  <img
                    src="./assets/img/phoenix.webp"
                    alt="logo Civil Primaris"
                    onClick={() => {
                      setShipFactionPart("civil");
                    }}
                  />
                </div>
                <div className="ship-list-card-validator-informations-faction-logo-wrapper">
                  <img
                    src="./assets/img/exercitusPrimaris.webp"
                    alt="logo Exercitus Primaris"
                    onClick={() => {
                      setShipFactionPart("militaire");
                    }}
                  />
                </div>{" "}
              </>
            ) : (
              ""
            )}
            {shipFactionPart === "civil" ? (
              <>
                <div className="ship-list-card-validator-informations-faction-logo-wrapper">
                  <img
                    src="./assets/img/phoenix.webp"
                    alt="logo Civil Primaris"
                    onClick={() => {
                      setShipFactionPart("civil");
                    }}
                  />

                  <button
                    onClick={() => {
                      setShipFactionPart("");
                    }}
                  >
                    Annuler ce choix
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            {shipFactionPart === "militaire" ? (
              <>
                <div className="ship-list-card-validator-informations-faction-logo-wrapper">
                  <img
                    src="./assets/img/exercitusPrimaris.webp"
                    alt="logo Exercitus Primaris"
                    onClick={() => {
                      setShipFactionPart("militaire");
                    }}
                  />
                  <button
                    onClick={() => {
                      setShipFactionPart("");
                    }}
                  >
                    Annuler ce choix
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {shipFactionPart === "civil" ? (
            <CivilianShipInformationsForm
              ship={selectedShipCardInfos}
              shipFactionPart={shipFactionPart}
            />
          ) : (
            ""
          )}
          {shipFactionPart === "militaire" ? (
            <MilitaryShipInformationsForm
              ship={selectedShipCardInfos}
              shipFactionPart={shipFactionPart}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipListCardValidator;
