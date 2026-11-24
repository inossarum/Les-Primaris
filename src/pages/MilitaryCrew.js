import React from "react";
import NavBar from "../components/Navbar/NavBar";
import {useSelector} from "react-redux";
import OwnedShipCard from "../components/UserHangar/OwnedShipCard";

const MilitaryCrew = () => {
    const staffShips = useSelector((state) => state.sharedShips.staffShips);
    const militrayTrainingCenterShips = useSelector(
        (state) => state.sharedShips.militrayTrainingCenterShips
    );
    const aerospatialShips = useSelector(
        (state) => state.sharedShips.aerospatialShips
    );
    const logisticsShips = useSelector(
        (state) => state.sharedShips.logisticsShips
    );

    const militaryResearchShips = useSelector(
        (state) => state.sharedShips.militaryResearchShips
    );
    const militaryMedicineShips = useSelector(
        (state) => state.sharedShips.militaryMedicineShips
    );

    const rightSlider = (e) => {
        const militaryCrewBody = document.querySelector(".military-crew-body");
        militaryCrewBody.scrollLeft += window.innerWidth;
    };

    const leftSlider = (e) => {
        const militaryCrewBody = document.querySelector(".military-crew-body");
        militaryCrewBody.scrollLeft -= window.innerWidth;
    };

    return (
        <div className="military-crew-body">
            <NavBar pageActive={"militaryCrew"} factionPart={"military"} />
            <div className="military-crew-title-container">
                <h2>Equipages Militaires</h2>
            </div>
            <div className="slide-btn-container">
                <div className="left-btn-container">
                    <button
                        onClick={() => leftSlider()}
                        className="left-btn"
                    ></button>
                </div>
                <div className="right-btn-container">
                    <button
                        onClick={() => rightSlider()}
                        className="right-btn"
                    ></button>
                </div>
            </div>
            <div className="military-crew-main-container">
                {staffShips && staffShips[0] ? (
                    <div
                        className="military-crew-sub-container"
                        style={{
                            background: `url(./assets/img/departments/central-administration-background.webp) fixed center/cover`,
                        }}
                    >
                        <h2 className="military-crew-department-name">
                            Etat-Major
                        </h2>
                        {staffShips &&
                            [...staffShips]
                                .filter(
                                    (ownedShip) =>
                                        ownedShip.shared === "oui" &&
                                        ownedShip.factionPart === "militaire" &&
                                        ownedShip.department === "staff"
                                )
                                .map((ownedShip) => (
                                    <OwnedShipCard
                                        ownedShip={ownedShip}
                                        key={ownedShip.id}
                                    />
                                ))}
                    </div>
                ) : (
                    ""
                )}
                {militrayTrainingCenterShips &&
                militrayTrainingCenterShips[0] ? (
                    <div
                        className="military-crew-sub-container"
                        style={{
                            background: `url(./assets/img/departments/aerospatialDepartment-background.webp) fixed center/cover`,
                        }}
                    >
                        <h2 className="military-crew-department-name">
                            Académie Militaire Primaris
                        </h2>
                        {militrayTrainingCenterShips &&
                            [...militrayTrainingCenterShips]
                                .filter(
                                    (ownedShip) =>
                                        ownedShip.shared === "oui" &&
                                        ownedShip.factionPart === "militaire" &&
                                        ownedShip.department ===
                                            "militaryTrainingCenter"
                                )
                                .map((ownedShip) => (
                                    <OwnedShipCard
                                        ownedShip={ownedShip}
                                        key={ownedShip.id}
                                    />
                                ))}
                    </div>
                ) : (
                    ""
                )}
                {aerospatialShips && aerospatialShips[0] ? (
                    <div
                        className="military-crew-sub-container"
                        style={{
                            background: `url(./assets/img/departments/aerospatialDepartment-background.webp) fixed center/cover`,
                        }}
                    >
                        <h2 className="military-crew-department-name">
                            Département de l'Aerospatial
                        </h2>
                        {aerospatialShips &&
                            [...aerospatialShips]
                                .filter(
                                    (ownedShip) =>
                                        ownedShip.shared === "oui" &&
                                        ownedShip.factionPart === "militaire" &&
                                        ownedShip.department === "aerospatial"
                                )
                                .map((ownedShip) => (
                                    <OwnedShipCard
                                        ownedShip={ownedShip}
                                        key={ownedShip.id}
                                    />
                                ))}
                    </div>
                ) : (
                    ""
                )}

                {logisticsShips && logisticsShips[0] ? (
                    <div
                        className="military-crew-sub-container"
                        style={{
                            background: `url(./assets/img/departments/logisticsDepartment-background.webp) fixed center/cover`,
                        }}
                    >
                        <h2 className="military-crew-department-name">
                            Département de Logistique
                        </h2>
                        {logisticsShips &&
                            [...logisticsShips]
                                .filter(
                                    (ownedShip) =>
                                        ownedShip.shared === "oui" &&
                                        ownedShip.factionPart === "militaire" &&
                                        ownedShip.department === "logistics"
                                )
                                .map((ownedShip) => (
                                    <OwnedShipCard
                                        ownedShip={ownedShip}
                                        key={ownedShip.id}
                                    />
                                ))}
                    </div>
                ) : (
                    ""
                )}

                {militaryResearchShips && militaryResearchShips[0] ? (
                    <div
                        className="military-crew-sub-container"
                        style={{
                            background: `url(./assets/img/departments/militaryResearchDepartment-background.webp) fixed center/cover`,
                        }}
                    >
                        <h2 className="military-crew-department-name">
                            Département de la Recherche
                        </h2>
                        {militaryResearchShips &&
                            [...militaryResearchShips]
                                .filter(
                                    (ownedShip) =>
                                        ownedShip.shared === "oui" &&
                                        ownedShip.factionPart === "militaire" &&
                                        ownedShip.department ===
                                            "militaryResearch"
                                )
                                .map((ownedShip) => (
                                    <OwnedShipCard
                                        ownedShip={ownedShip}
                                        key={ownedShip.id}
                                    />
                                ))}
                    </div>
                ) : (
                    ""
                )}
                {militaryMedicineShips && militaryMedicineShips[0] ? (
                    <div
                        className="military-crew-sub-container"
                        style={{
                            background: `url(./assets/img/departments/militaryMedicineDepartment-background.webp) fixed center/cover`,
                        }}
                    >
                        <h2 className="military-crew-department-name">
                            Département de la Médecine
                        </h2>
                        {militaryMedicineShips &&
                            [...militaryMedicineShips]
                                .filter(
                                    (ownedShip) =>
                                        ownedShip.shared === "oui" &&
                                        ownedShip.factionPart === "militaire" &&
                                        ownedShip.department ===
                                            "militaryMedicine"
                                )
                                .map((ownedShip) => (
                                    <OwnedShipCard
                                        ownedShip={ownedShip}
                                        key={ownedShip.id}
                                    />
                                ))}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default MilitaryCrew;
