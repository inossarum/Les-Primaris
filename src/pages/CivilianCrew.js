import React from "react";
import NavBar from "../components/Navbar/NavBar";
import {useSelector} from "react-redux";
import OwnedShipCard from "../components/UserHangar/OwnedShipCard";

const CivilianCrew = () => {
  const centralAdministrationShips = useSelector(
    (state) => state.sharedShips.centralAdministrationShips
  );
  const academyShips = useSelector((state) => state.sharedShips.academyShips);
  const explorationShips = useSelector(
    (state) => state.sharedShips.explorationShips
  );
  const touringShips = useSelector((state) => state.sharedShips.tourismShips);
  const tradeAndTransportShips = useSelector(
    (state) => state.sharedShips.tradeAndTransportShips
  );
  const industryShips = useSelector((state) => state.sharedShips.industryShips);
  const sciencesShips = useSelector((state) => state.sharedShips.sciencesShips);
  const medicineShips = useSelector((state) => state.sharedShips.medicineShips);
  const cultureAndSportsShips = useSelector(
    (state) => state.sharedShips.cultureAndSportsShips
  );

  const rightSlider = (e) => {
    const civilianCrewBody = document.querySelector(".civilian-crew-body");
    civilianCrewBody.scrollLeft += window.innerWidth;
  };

  const leftSlider = (e) => {
    const civilianCrewBody = document.querySelector(".civilian-crew-body");
    civilianCrewBody.scrollLeft -= window.innerWidth;
  };

  return (
    <div className="civilian-crew-body">
      <NavBar pageActive={"civilianCrew"} factionPart={"civilian"} />
      <div className="civilian-crew-title-container">
        <h2>Equipages Civils</h2>
      </div>
      <div className="slide-btn-container">
        <div className="left-btn-container">
          <button onClick={() => leftSlider()} className="left-btn"></button>
        </div>
        <div className="right-btn-container">
          <button onClick={() => rightSlider()} className="right-btn"></button>
        </div>
      </div>
      <div className="civilian-crew-main-container">
        {centralAdministrationShips && centralAdministrationShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/central-administration-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">
              Administration Centrale
            </h2>
            {centralAdministrationShips &&
              [...centralAdministrationShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "central administration"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {academyShips && academyShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/primaris-academy-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">Académie Primaris</h2>
            {academyShips &&
              [...academyShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "academy"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {explorationShips && explorationShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/exploration-department-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">
              Département de l'Exploration
            </h2>
            {explorationShips &&
              [...explorationShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "exploration"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {touringShips && touringShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/touring-department-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">
              Département du Tourisme
            </h2>
            {touringShips &&
              [...touringShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "tourism"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {tradeAndTransportShips && tradeAndTransportShips[0] ? (
          <div
            style={{
              background: `url(./assets/img/departments/trading-department-background.webp) fixed center/cover`,
            }}
            className="civilian-crew-sub-container "
          >
            <h2 className="civilian-crew-department-name">
              Département du Commerce et du transport
            </h2>
            {tradeAndTransportShips &&
              [...tradeAndTransportShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "trade & transport"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {industryShips && industryShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/industry-department-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">
              Département de l'Industrie
            </h2>
            {industryShips &&
              [...industryShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "industry"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {sciencesShips && sciencesShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/sciences-department-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">
              Département des Sciences
            </h2>
            {sciencesShips &&
              [...sciencesShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "sciences"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {medicineShips && medicineShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/medicine-department-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">
              Département de la Médecine
            </h2>
            {medicineShips &&
              [...medicineShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "medicine"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
        {cultureAndSportsShips && cultureAndSportsShips[0] ? (
          <div
            className="civilian-crew-sub-container"
            style={{
              background: `url(./assets/img/departments/culture-department-background.webp) fixed center/cover`,
            }}
          >
            <h2 className="civilian-crew-department-name">
              Département de la Culture et des Sports
            </h2>
            {cultureAndSportsShips &&
              [...cultureAndSportsShips]
                .filter(
                  (ownedShip) =>
                    ownedShip.shared === "oui" &&
                    ownedShip.factionPart === "civil" &&
                    ownedShip.department === "culture & sports"
                )
                .map((ownedShip) => (
                  <OwnedShipCard ownedShip={ownedShip} key={ownedShip.id} />
                ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CivilianCrew;
