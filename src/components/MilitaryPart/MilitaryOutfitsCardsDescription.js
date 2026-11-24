import {Close} from "@mui/icons-material";
import React from "react";

const MilitaryOutfitsCardsDescription = ({outfit, isActive, camoActive}) => {
    let undersuit = "";
    let headArmor = "";
    let torsoArmor = "";
    let armsArmor = "";
    let legsArmor = "";
    let jacket = "";
    let trousers = "";
    let foot = "";
    let backpack = "";
    let mainWeapon = "";
    let secondaryWeapon = "";
    let grenades = "";
    let utilities = "";
    let outfitDescription = "";

    switch (outfit) {
        case "primarque":
            jacket = "Second Tevarin War White Dress Jacket";
            trousers = "Second Tevarin War White Dress Trousers";
            foot = "Cuesta Shoes";
            outfitDescription =
                "Le Primarque est le dirigeant de la faction Primaris. C'est lui qui commande les forces armées de la faction. Il est secondé dans cette tâche par l'Executeur Militaire";
            break;
        case "executeur-militaire":
            undersuit = "";
            jacket = "Second Tevarin War Service Jacket";
            trousers = "Second Tevarin War Service Trousers";
            foot = "Cuesta Shoes";
            outfitDescription =
                "L'Exécuteur Militaire est le dirigeant exécutif de l'Exercitus Primaris. Il informe et rends compte des avancées et des manoeuvres militaires au Primarque. Il est lui même secondé par les Polémarques Militaires.";
            break;
        case "polemarque":
            undersuit = "";
            jacket = "Second Tevarin War Service Jacket";
            trousers = "Second Tevarin War Service Trousers";
            foot = "Cuesta Shoes";
            outfitDescription =
                "L'Exécuteur Militaire est le dirigeant exécutif de l'Exercitus Primaris. Il informe et rends compte des avancées et des manoeuvres militaires au Primarque. Il est lui même secondé par les Polémarques Militaires.";
            break;
        case "chef-d'escadrille":
            undersuit = "TC4 Undersuit Black/Grey (Lorville)";
            headArmor = "Helmet G2 Black (Lorville)";
            torsoArmor = "MacFlex Core Twilight (à confirmer)";
            armsArmor = "PAB-1 Arms Black (Lorville)";
            legsArmor = "PAB-1 Legs Black (Lorville)";
            backpack = "Macflex Backpack Grey (Lorville)";
            mainWeapon =
                "Berhing P4-AR 'NightStalker' (Arccorp - Area 18 - Cubby Blast)";
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            utilities = "MultiTool (medic / tractor beam / cutter) (Lorville)";
            outfitDescription =
                "le Chef d'Escadrille commande les ailiers placés sous ses ordres. Il est responsable de leur vie et de l'état de leurs équipements.";
            break;

        case "pilote-instructeur":
            undersuit = "TC4 Undersuit Black/Grey (Lorville)";
            headArmor = "Helmet G2 Black (Lorville)";
            torsoArmor = "MacFlex Core Imperial (Everus Harbor)";
            armsArmor = "PAB-1 Arms Black (Lorville)";
            legsArmor = "PAB-1 Legs Black (Lorville)";
            backpack = "Macflex Backpack Grey (Lorville)";
            mainWeapon =
                "Berhing P4-AR 'NightStalker' (Arccorp - Area 18 - Cubby Blast)";
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            utilities = "MultiTool (medic / tractor beam / cutter) (Lorville)";
            outfitDescription =
                "le Pilote instructeur est chargé de veiller à la bonne formation des pilotes de l'Exercitus Primaris, tout département confondu.";
            break;
        case "pilote":
            undersuit = "TC4 Undersuit Black/Grey (Lorville)";
            headArmor = "Helmet G2 Black (Lorville)";
            torsoArmor = "MacFlex Core (Lorville)";
            armsArmor = "PAB-1 Arms Black (Lorville)";
            legsArmor = "PAB-1 Legs Black (Lorville)";
            backpack = "Macflex Backpack Grey (Lorville)";
            mainWeapon =
                "Berhing P4-AR 'NightStalker' (Arccorp - Area 18 - Cubby Blast)";
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            utilities = "MultiTool (medic / tractor beam / cutter) (Lorville)";
            outfitDescription =
                "le Pilote est soit affecté à une escadrille, soit affecté à un vaisseau multicrew.";
            break;
        case "ingenieur":
            undersuit = "TC4 Undersuit Black/Grey (Lorville)";
            headArmor = "Helmet G2 Black (Lorville)";
            torsoArmor = "Venture Core Black (Lorville)";
            armsArmor = "PAB-1 Arms Black (Lorville)";
            legsArmor = "Venture Legs Black (Lorville)";
            backpack = "Macflex Backpack Orange (Lorville)";
            mainWeapon =
                "Berhing P4-AR 'NightStalker' (Arccorp - Area 18 - Cubby Blast)";
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            utilities = "MultiTool (medic / tractor beam / cutter) (Lorville)";
            outfitDescription =
                "l'ingénieur est un personnel du département de la logistique. Sa mission principale est de veiller au bon fonctionnement des équipements de l'unité dans laquelle il est affectée.'";
            break;
        case "transporteur":
            undersuit = "TC4 Undersuit Black/Grey (Lorville)";
            headArmor = "Helmet G2 Black (Lorville)";
            torsoArmor = "Venture Core Black (Lorville)";
            armsArmor = "PAB-1 Arms Black (Lorville)";
            legsArmor = "TrueDef-Pro Black/Grey (Lorville / Arccorp)";
            backpack = "Macflex Backpack Grey (Lorville)";
            mainWeapon =
                "Berhing P4-AR 'NightStalker' (Arccorp - Area 18 - Cubby Blast)";
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            utilities = "MultiTool (medic / tractor beam / cutter) (Lorville)";
            outfitDescription =
                "l'ingénieur est un personnel du département de la logistique. Sa mission principale est de veiller au bon fonctionnement des équipements de l'unité dans laquelle il est affectée.'";
            break;
        default:
    }

    switch (outfit) {
        case "marine":
        case "officier-marine":
            if (camoActive === "urban") {
                mainWeapon =
                    "Berhing P4-AR 'Nightstalker' (Arccorp - Area 18 - Cubby Blast)";
            } else if (camoActive === "arctic") {
                mainWeapon = "Berhing P4-AR 'Boneyard' (MIC-L1 / HUR-L4)";
            } else if (camoActive === "woodland") {
                mainWeapon =
                    "Berhing P4-AR 'Warhawk' (Arccorp - Area 18 - CenterMass)";
            } else if (camoActive === "desert") {
                mainWeapon = "Berhing P4-AR 'desert shadow'";
            } else {
                mainWeapon = "";
            }
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            grenades = "MK-4 x3";
            utilities = "Medpen x2 / Oxypen x1";
            outfitDescription =
                "Le marine est le fantassin de base de l'exercitus. C'est un soldat non spécialisé.";
            break;

        case "mitrailleur":
            mainWeapon = "Berhing FS9-LMG";
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            grenades = "MK-4 x3";
            utilities = "Medpen x2 / Oxypen x1";
            outfitDescription =
                "Le marine est le fantassin de base de l'exercitus. C'est un soldat non spécialisé.";
            break;

        case "tireur-longue-distance":
            mainWeapon = "Berhing P6-LR";
            secondaryWeapon = "Berhing S38 (Arccorp - Area 18 - CenterMass)";
            grenades = "MK-4 x3";
            utilities = "Medpen x2 / Oxypen x1";
            outfitDescription =
                "Le marine est le fantassin de base de l'exercitus. C'est un soldat non spécialisé.";
            break;

        default:
    }

    switch (camoActive) {
        case "urban":
            undersuit = "Force Flex Undersuit Digicamo (Lorville / Arccorp)";
            headArmor = "Helmet G2 Black (Lorville)";
            torsoArmor = "ORC-mkV Black (Lorville / Arccorp)";
            armsArmor = "PAB-1 Arms Black (Lorville / Arccorp)";
            legsArmor = "TrueDef-Pro Black/Grey (Lorville / Arccorp)";
            backpack = "Mac Flex Grey (Lorville / Arccorp)";
            break;
        case "arctic":
            undersuit = "Force Flex Undersuit Arctic Camo (Arccorp)";
            headArmor = "Helmet G2 White (Arccorp)";
            torsoArmor = "ORC-mkV White (Arccorp) ";
            armsArmor = "PAB-1 Arms White (Arccorp)";
            legsArmor = "TrueDef-Pro White/Silver/Grey (Arccorp)";
            backpack = "Mac Flex Grey";
            break;
        case "woodland":
            undersuit = "Force Flex Undersuit Wood Camo (Arccorp)";
            headArmor = "Helmet G2 Woodland (Lorville)";
            torsoArmor = "ORC-mkV Core (Lorville / Arccorp)";
            armsArmor = "PAB-1 Arms (Lorville)";
            legsArmor = "TrueDef-Pro Grey/Green (Arccorp)";
            backpack = "Mac Flex Grey (Lorville)";
            break;
        case "desert":
            undersuit = "Force Flex Undersuit woodland camo";
            headArmor = "Helmet G2 Woodland";
            torsoArmor = "ORC-mkV base";
            armsArmor = "PAB-1 Arms base";
            legsArmor = "TrueDef-Pro Black/Silver/Green (Lorville)";
            backpack = "Mac Flex Grey";
            break;
        default:
    }

    return (
        <div
            className={
                isActive
                    ? "military-outfits-cards-description visible"
                    : "hidden"
            }
        >
            <div className="main-container">
                <div className="img-container">
                    <img
                        src={`./assets/img/departments/military-outfits/${outfit}${
                            camoActive ? "-" + camoActive : ""
                        }.webp`}
                        alt={`tenue d(e)'${outfit}${
                            camoActive ? "-" + camoActive : ""
                        }`}
                    />
                </div>
                <div className="outfit-description-container">
                    <div className="outfit-border-container">
                        <div className="outfit-name">
                            <h2>{outfit}</h2>
                        </div>
                        <div className="outfit-components-container">
                            {undersuit !== "" ? <h3>Combinaison</h3> : ""}
                            {undersuit !== "" ? (
                                <div className="outfit-sub-container">
                                    <span className="label">undersuit: </span>
                                    <span className="value">{undersuit}</span>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="outfit-components-armor-and-weapons-container">
                                <div className="outfit-components-armor-and-weapons-sub-container">
                                    <div className="outfit-components-container">
                                        {headArmor !== "" ||
                                        torsoArmor !== "" ||
                                        armsArmor !== "" ||
                                        legsArmor !== "" ||
                                        backpack !== "" ? (
                                            <h3>ARMURE</h3>
                                        ) : (
                                            <h3>TENUE</h3>
                                        )}
                                        {headArmor !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    Casque:{" "}
                                                </span>
                                                <span className="value">
                                                    {headArmor}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {torsoArmor !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    Plastron:{" "}
                                                </span>
                                                <span className="value">
                                                    {torsoArmor}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {armsArmor !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    bras:{" "}
                                                </span>
                                                <span className="value">
                                                    {" "}
                                                    {armsArmor}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {jacket !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    veste:{" "}
                                                </span>
                                                <span className="value">
                                                    {jacket}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {legsArmor !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    jambes:{" "}
                                                </span>
                                                <span className="value">
                                                    {legsArmor}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {trousers !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    Pantalon:{" "}
                                                </span>
                                                <span className="value">
                                                    {trousers}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {foot !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    Chaussures:{" "}
                                                </span>
                                                <span className="value">
                                                    {foot}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {backpack !== "" ? (
                                            <div className="outfit-sub-container">
                                                <span className="label">
                                                    Sac à dos:{" "}
                                                </span>
                                                <span className="value">
                                                    {backpack}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                {mainWeapon !== "" ||
                                secondaryWeapon !== "" ||
                                grenades !== "" ||
                                utilities !== "" ? (
                                    <div className="outfit-components-armor-and-weapons-sub-container">
                                        <div className="outfit-components-container">
                                            {mainWeapon !== "" ||
                                            secondaryWeapon !== "" ||
                                            grenades !== "" ||
                                            utilities !== "" ? (
                                                <h3>Armement</h3>
                                            ) : (
                                                ""
                                            )}
                                            {mainWeapon !== "" ? (
                                                <div className="outfit-sub-container">
                                                    <span className="label">
                                                        Principal:{" "}
                                                    </span>
                                                    <span className="value">
                                                        {" "}
                                                        {mainWeapon}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {secondaryWeapon !== "" ? (
                                                <div className="outfit-sub-container">
                                                    <span className="label">
                                                        secondaire:{" "}
                                                    </span>
                                                    <span className="value">
                                                        {" "}
                                                        {secondaryWeapon}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {grenades !== "" ? (
                                                <div className="outfit-sub-container">
                                                    <span className="label">
                                                        grenades:{" "}
                                                    </span>
                                                    <span className="value">
                                                        {grenades}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {utilities !== "" ? (
                                                <div className="outfit-sub-container">
                                                    <span className="label">
                                                        accessoires:{" "}
                                                    </span>
                                                    <span className="value">
                                                        {utilities}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="outfit-description">
                            <h3>description du poste</h3>
                            <p>{outfitDescription}</p>
                        </div>
                        <div className="close-explanations">
                            <Close />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MilitaryOutfitsCardsDescription;
