import React from "react";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";

const EncyclopediaShipPageDetailsCompartment = ({data, dataCategory}) => {
    let title = "";
    let data1 = "";
    let data2 = "";
    let data3 = "";
    let data4 = "";
    let data5 = "";
    let data6 = "";

    switch (dataCategory) {
        case "sizes":
            title = "Dimensions";
            data1 = (
                <h3>
                    Longueur: <span className="value">{data?.length}</span> m
                </h3>
            );
            data2 = (
                <h3>
                    Largeur: <span className="value">{data?.beam}</span> m
                </h3>
            );
            data3 = (
                <h3>
                    Hauteur: <span className="value">{data?.height}</span> m
                </h3>
            );
            break;
        case "crew":
            title = "Equipage";
            data1 = (
                <h3>
                    Equipage minimum: <span className="value">{data?.min}</span>{" "}
                    pers
                </h3>
            );
            data2 = (
                <h3>
                    Equipage maximum: <span className="value">{data?.max}</span>{" "}
                    pers
                </h3>
            );
            break;
        case "cargo":
            title = "Soute";
            data1 = (
                <h3>
                    Espace de stockage:{" "}
                    <span className="value">{data && data}</span> SCU
                </h3>
            );
            break;
        case "agility":
            title = "Agilité";
            data1 = (
                <h3>
                    Vitesse de tangage:{" "}
                    <span className="value">{data?.pitch}</span> deg/s
                </h3>
            );
            data2 = (
                <h3>
                    Vitesse d'embardée:{" "}
                    <span className="value">{data?.yaw}</span> deg/s
                </h3>
            );
            data3 = (
                <h3>
                    Vitesse de roulis:{" "}
                    <span className="value">{data?.roll}</span> deg/s
                </h3>
            );
            break;
        case "mass":
            title = "Poids";
            data1 = (
                <h3>
                    Poids total:{" "}
                    <span className="value">
                        {data.toLocaleString("fr-FR")}
                    </span>{" "}
                    Kg
                </h3>
            );
            break;
        case "speed":
            title = "Vitesses";
            data1 = (
                <h3>
                    Vitesse SCM: <span className="value">{data?.scm}</span> m/s
                </h3>
            );
            data2 = (
                <h3>
                    Vitesse maximum: <span className="value">{data?.max}</span>{" "}
                    m/s
                </h3>
            );
            data3 = (
                <h3>
                    Accélération: 0 à v.SCM:{" "}
                    <span className="value">{data?.zero_to_scm}</span> s
                </h3>
            );
            data4 = (
                <h3>
                    Accélération: 0 à v.Max:{" "}
                    <span className="value">{data?.zero_to_max}</span> s
                </h3>
            );
            data5 = (
                <h3>
                    Freinage de v.SCM à 0:{" "}
                    <span className="value">{data?.scm_to_zero}</span> s
                </h3>
            );
            data6 = (
                <h3>
                    Freinage de v.Max à 0:{" "}
                    <span className="value">{data?.max_to_zero}</span> s
                </h3>
            );
            break;
        case "quantum":
            title = "Quantum";
            data1 = (
                <h3>
                    Vitesse de quantum:{" "}
                    <span className="value">
                        {data?.quantum_speed.toLocaleString("fr-FR")}
                    </span>{" "}
                    m/s
                </h3>
            );
            data2 = (
                <h3>
                    Vitesse de calibration:{" "}
                    <span className="value">{data?.quantum_spool_time}</span> s
                </h3>
            );
            data3 = (
                <h3>
                    Capacité du réservoir:{" "}
                    <span className="value">
                        {data?.quantum_fuel_capacity?.toLocaleString("fr-FR")}
                    </span>{" "}
                    L
                </h3>
            );
            break;
        case "fuel":
            title = "Réservoir";
            data1 = (
                <h3>
                    Capacité réservoir à carburant:{" "}
                    <span className="value">
                        {(data?.capacity / 1000)?.toLocaleString("fr-FR")}
                    </span>{" "}
                    L
                </h3>
            );
            break;
        case "insurance":
            title = "Assurance";
            data1 = (
                <h3>
                    Temps de réclamation:{" "}
                    <span className="value">
                        {Math.floor(data?.claim_time)}
                    </span>{" "}
                    min
                </h3>
            );
            data2 = (
                <h3>
                    Cout de l'expédition:{" "}
                    <span className="value">
                        {Math.floor(data?.expedite_cost)?.toLocaleString(
                            "fr-FR"
                        )}
                    </span>{" "}
                    aUEC
                </h3>
            );
            break;
        case "price":
            title = "Prix divers";
            data1 = (
                <>
                    {data?.price !== null ? (
                        <>
                            <h3>
                                Prix en jeu:{" "}
                                <span className="value">
                                    {Math.floor(data?.price)?.toLocaleString(
                                        "fr-FR"
                                    )}
                                </span>{" "}
                                aUEC
                            </h3>
                            {/* <h3>
                                Vendu à:{" "}
                                <span className="value">
                                    {data?.soldAt?.locationLabel
                                        .split(" ")
                                        .slice(2, 4)
                                        .join(" ")}
                                </span>{" "}
                                à{" "}
                                <span className="value">
                                    {data?.soldAt?.locationLabel
                                        .split(" ")
                                        .slice(5)}
                                </span>{" "}
                            </h3> */}
                        </>
                    ) : (
                        <h3 className="value">
                            Indisponible à l'achat dans le jeu
                        </h3>
                    )}{" "}
                </>
            );
            data2 = (
                <>
                    {data?.pledgePrice !== null ? (
                        <h3>
                            Prix RSI:{" "}
                            <span className="value">
                                {Math.floor(data?.pledgePrice).toLocaleString(
                                    "fr-FR"
                                )}
                            </span>{" "}
                            $
                        </h3>
                    ) : (
                        <h3 className="value">
                            Indisponible dans le pledge store RSI
                        </h3>
                    )}{" "}
                </>
            );
            break;
        case "avionics":
            title = "Avionique";
            data1 = data
                .filter(
                    (component) => component.component_class === "RSIAvionic"
                )
                .map((component) => {
                    return (
                        <>
                            <div className="encyclopedia-ship-page-component-container">
                                <div className="encyclopedia-ship-page-value-details-img-wrapper">
                                    <img
                                        src={`./assets/img/StarCitizenEncyclopedia/encyclopediaShipsDetailsLogos/${component.type}.png`}
                                        alt={component.type}
                                    />
                                    <h3>{component.name}</h3>
                                </div>
                                <div className="encyclopedia-ship-page-value-details-container">
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Taille: </span>
                                        <h4> {component.size}</h4>
                                    </div>
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Quantité:</span>
                                        <h4> {component.quantity}</h4>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                });

            break;
        case "propulsion":
            title = "Propulsions";
            data1 = data
                .filter(
                    (component) =>
                        component?.component_class === "RSIPropulsion"
                )
                .map((component) => {
                    return (
                        <>
                            <div className="encyclopedia-ship-page-component-container">
                                <div className="encyclopedia-ship-page-value-details-img-wrapper">
                                    <img
                                        src={`./assets/img/StarCitizenEncyclopedia/encyclopediaShipsDetailsLogos/${component?.type}.png`}
                                        alt={component.type}
                                    />
                                    <h3>{component?.name}</h3>
                                </div>
                                <div className="encyclopedia-ship-page-value-details-container">
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Taille: </span>
                                        <h4> {component?.size}</h4>
                                    </div>
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Quantité:</span>
                                        <h4> {component?.mounts}</h4>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                });

            break;
        case "thruster":
            title = "Propulseurs";
            data1 = data
                .filter(
                    (component) => component?.component_class === "RSIThruster"
                )
                .map((component) => {
                    return (
                        <>
                            <div className="encyclopedia-ship-page-component-container">
                                <div className="encyclopedia-ship-page-value-details-img-wrapper">
                                    <img
                                        src={`./assets/img/StarCitizenEncyclopedia/encyclopediaShipsDetailsLogos/${component?.type}.png`}
                                        alt={component?.type}
                                    />
                                    <h3>{component?.name}</h3>
                                </div>
                                <div className="encyclopedia-ship-page-value-details-container">
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Taille: </span>
                                        <h4> {component?.component_size}</h4>
                                    </div>
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Quantité:</span>
                                        <h4> {component?.mounts}</h4>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                });

            break;
        case "systems":
            title = "Systèmes";
            data1 = data
                .filter(
                    (component) => component.component_class === "RSIModular"
                )
                .map((component) => {
                    return (
                        <>
                            <div className="encyclopedia-ship-page-component-container">
                                <div className="encyclopedia-ship-page-value-details-img-wrapper">
                                    <img
                                        src={`./assets/img/StarCitizenEncyclopedia/encyclopediaShipsDetailsLogos/${component.type}.png`}
                                        alt={component.type}
                                    />
                                    <h3>{component.name}</h3>
                                </div>
                                <div className="encyclopedia-ship-page-value-details-container">
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Taille: </span>
                                        <h4> {component.component_size}</h4>
                                    </div>
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Quantité:</span>
                                        <h4> {component.mounts}</h4>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                });

            break;
        case "weapons":
            title = "Armements";
            data1 = data
                .filter(
                    (component) => component.component_class === "RSIWeapon"
                )
                .map((component) => {
                    return (
                        <>
                            <div className="encyclopedia-ship-page-component-container">
                                <div className="encyclopedia-ship-page-value-details-img-wrapper">
                                    <img
                                        src={`./assets/img/StarCitizenEncyclopedia/encyclopediaShipsDetailsLogos/${component.type}.png`}
                                        alt={component.type}
                                    />
                                    <h3>{component.name}</h3>
                                </div>
                                <div className="encyclopedia-ship-page-value-details-container">
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Taille: </span>
                                        <h4> {component.component_size}</h4>
                                    </div>
                                    <div className="encyclopedia-ship-page-label-value-container">
                                        <span>Quantité:</span>
                                        <h4> {component.mounts}</h4>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                });

            break;
        default:
    }

    return (
        <div className="encyclopedia-ship-page-detail-compartment-container">
            <DecorationBorderThick />
            <div className="encyclopedia-ship-page-sub-container-title">
                <h2>{title}</h2>
            </div>
            <div className="encyclopedia-ship-page-sub-details-container">
                {data1 !== "" ? data1 : ""}
                {data2 !== "" ? data2 : ""}
                {data3 !== "" ? data3 : ""}
                {data4 !== "" ? data4 : ""}
                {data5 !== "" ? data5 : ""}
                {data6 !== "" ? data6 : ""}
            </div>
        </div>
    );
};

export default EncyclopediaShipPageDetailsCompartment;
