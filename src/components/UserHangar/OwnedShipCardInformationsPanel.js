import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../utils/firebase.config";
import {AddCircleOutline, ArrowDropDown, Edit} from "@mui/icons-material";
import ShipFleetChoice from "./ShipFleetChoice";
import CrewMemberCard from "./CrewMemberCard";
import {
    setCrewSelectionActive,
    setShipSelectionActive,
} from "../../feature/window.slice";
import UserSearchPanel from "./UserSearchPanel";
import JoinCrewCard from "./JoinCrewCard";
import CrewMemberPostulantCard from "./CrewMemberPostulantCard";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";
import ShipRankChoice from "./ShipRankChoice";
import ShipHierachicalSuperiorChoice from "./ShipHierachicalSuperiorChoice";

const OwnedShipCardInformationsPanel = ({ownedShipDatas, pageActive}) => {
    const dispatch = useDispatch();
    const shipName = useRef();
    const shared = useRef();
    const factionPart = useRef();
    const department = useRef();
    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.user.users);
    const crewSelectionActive = useSelector(
        (state) => state.windowActive.crewSelectionActive
    );
    const actualSelectedShip = useSelector(
        (state) => state.sharedShips.actualShipSelected
    );
    const shipSelectionActive = useSelector(
        (state) => state.windowActive.shipSelectionActive
    );

    const [editShipName, setEditShipName] = useState(false);
    const [isDeployed, setIsDeployed] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            users &&
                [...users]
                    .filter(
                        (user) =>
                            user.factionPart === "civil-militaire" ||
                            user.factionPart === "militaire" ||
                            user.factionPart === "civil"
                    )
                    .map((user) => {
                        const userNotificationsAfterRemoval =
                            user.notifications.filter(
                                (notification) =>
                                    notification?.associatedSharedShip !==
                                    ownedShipDatas?.notificationId
                            );

                        updateDoc(doc(db, "users", user.id), {
                            notifications: userNotificationsAfterRemoval,
                        });
                    });
        } catch (err) {
            console.log(err);
        }

        await ownedShipDatas?.crewMembers.map((crewMember) =>
            updateDoc(doc(db, "users", crewMember.userId), {
                employed: "non",
            })
        );

        await deleteDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id));
    };

    const handleShipNameEditor = (e) => {
        e.preventDefault();
        updateDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id), {
            shipName: shipName.current.value,
        });
        setEditShipName(false);
    };
    const handleSharedStatus = (e) => {
        e.preventDefault();
        updateDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id), {
            shared: shared.current.value,
        });
    };
    const handleFactionPartSwitch = (e) => {
        e.preventDefault();
        updateDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id), {
            factionPart: factionPart.current.value,
        });
    };
    const handleDepartmentSwitch = (e) => {
        e.preventDefault();
        updateDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id), {
            department: department.current.value,
        });
    };

    let sharedFaction = "";

    switch (ownedShipDatas?.factionPart) {
        case "civil":
            sharedFaction = "Civils Primaris";
            break;
        case "militaire":
            sharedFaction = "Exercitus Primaris";
            break;
        default:
    }

    return (
        <div
            className={
                ownedShipDatas?.id === actualSelectedShip?.id &&
                shipSelectionActive === true
                    ? "owned-ship-card-informations-data-body collapsed"
                    : "owned-ship-card-informations-data-body reduced"
            }
        >
            {ownedShipDatas?.ownerId === user.userId ||
            user.webSiteRole === "administrateur" ? (
                <button
                    className="owned-ship-card-hangar-suppressor-button"
                    onClick={(e) => handleDelete(e)}
                >
                    Supprimer du hangar
                </button>
            ) : (
                ""
            )}
            <button
                className="owned-ship-card-hangar-back-button"
                onClick={() =>
                    { dispatch(setShipSelectionActive(false)); setIsDeployed(false); }
                }
            >
                Retour
            </button>
            <div className="owned-ship-card-informations-data">
                <div className="owned-ship-card-informations-data-sub-container">
                    <DecorationBorderThick />
                    {(ownedShipDatas?.ownerId === user.userId &&
                        editShipName === true) ||
                    (user.webSiteRole === "administrateur" &&
                        editShipName === true) ? (
                        <>
                            <div className="owned-ship-card-informations-data-sub-container-ship-name-container">
                                <input
                                    type="text"
                                    ref={shipName}
                                    defaultValue={ownedShipDatas?.shipName}
                                    autoFocus={true}
                                ></input>
                                <button
                                    className="owned-ship-card-informations-data-sub-container-ship-name-button"
                                    onClick={(e) => handleShipNameEditor(e)}
                                >
                                    Valider
                                </button>
                            </div>
                            <h4>
                                Propriétaire:{" "}
                                <span className="info-green">
                                    {ownedShipDatas?.owner}
                                </span>
                            </h4>
                        </>
                    ) : (
                        <>
                            <div className="owned-ship-card-informations-data-sub-container-ship-name-container">
                                <h4>
                                    Nom du vaisseau:{" "}
                                    <span className="info-blue">
                                        {ownedShipDatas?.fleet}
                                    </span>{" "}
                                    <span className="info-blue">
                                        {ownedShipDatas?.shipName}
                                    </span>
                                </h4>
                                {ownedShipDatas?.ownerId === user.userId ||
                                user.webSiteRole === "administrateur" ? (
                                    <Edit
                                        className="owned-ship-card-informations-data-sub-container-ship-name-edit-icon"
                                        onClick={() => setEditShipName(true)}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            <h4>
                                Propriétaire:{" "}
                                <span className="info-green">
                                    {ownedShipDatas?.owner}
                                </span>
                            </h4>
                        </>
                    )}
                </div>
            </div>
            <div className="owned-ship-card-informations-data">
                <div className="owned-ship-card-informations-data-sub-container">
                    <DecorationBorderThick />
                    {pageActive === "userPrivateRoom" ||
                    user.webSiteRole === "administrateur" ? (
                        <div className="flex-row">
                            <h4>
                                En partage:{" "}
                                <span className="info-red-uppercase">
                                    {ownedShipDatas?.shared}
                                </span>
                            </h4>
                            {ownedShipDatas?.ownerId === user.userId ||
                            user.webSiteRole === "administrateur" ? (
                                <select
                                    ref={shared}
                                    onChange={(e) => handleSharedStatus(e)}
                                >
                                    <option value="">
                                        Modifier le partage
                                    </option>
                                    <option value="non">Non</option>
                                    <option value="oui">Oui</option>
                                </select>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="flex-row">
                        {(pageActive === "userPrivateRoom" &&
                            ownedShipDatas?.shared === "oui") ||
                        user.webSiteRole === "administrateur" ? (
                            <h4>
                                Faction de partage:{" "}
                                <span className="info-green-capitalize">
                                    {sharedFaction}
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}
                        {ownedShipDatas?.shared === "oui" &&
                        user.webSiteRole === "administrateur" ? (
                            <div className="flex-row">
                                <select
                                    ref={factionPart}
                                    onChange={(e) => handleFactionPartSwitch(e)}
                                >
                                    <option value="">
                                        Modifier la corporation principale
                                    </option>
                                    <option value="civil">
                                        Civils Primaris
                                    </option>
                                    <option value="militaire">
                                        Exercitus Primaris
                                    </option>
                                </select>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex-row">
                        {ownedShipDatas?.shared === "oui" ? (
                            <h4>
                                Département:{" "}
                                <span className="info-blue-capitalize">
                                    {ownedShipDatas?.department}
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}
                        {ownedShipDatas?.shared === "oui" &&
                        user.webSiteRole === "administrateur" ? (
                            <select
                                ref={department}
                                onChange={(e) => handleDepartmentSwitch(e)}
                            >
                                {ownedShipDatas?.factionPart === "militaire" ? (
                                    <>
                                        <option value="">
                                            Veuillez choisir un département...
                                        </option>
                                        <option value="infantry">
                                            Infanterie
                                        </option>
                                        <option value="aerospatial">
                                            Aerospatial
                                        </option>
                                        <option value="logistic">
                                            Logistique
                                        </option>
                                        <option value="military-academy">
                                            Académie Militaire
                                        </option>
                                        <option value="staff">
                                            Etat Major
                                        </option>
                                        <option value="research">
                                            Recherche
                                        </option>
                                        <option value="military-medicine">
                                            Médecine
                                        </option>
                                        <option value="specOps">
                                            Forces Spéciales
                                        </option>
                                    </>
                                ) : (
                                    ""
                                )}
                                {ownedShipDatas?.factionPart === "civil" ? (
                                    <>
                                        <option value="">
                                            Veuillez choisir un département...
                                        </option>
                                        <option value="central administration">
                                            Administration centrale
                                        </option>
                                        <option value="academy">
                                            Académie
                                        </option>
                                        <option value="exploration">
                                            Exploration
                                        </option>
                                        <option value="tourism">
                                            Tourisme
                                        </option>
                                        <option value="trade & transport">
                                            Commerce & transport
                                        </option>
                                        <option value="industry">
                                            Industrie
                                        </option>
                                        <option value="sciences">
                                            Sciences
                                        </option>
                                        <option value="medicine">
                                            Médecine
                                        </option>
                                        <option value="culture & sports">
                                            Culture & sports
                                        </option>
                                    </>
                                ) : (
                                    ""
                                )}
                            </select>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex-row">
                        <h4>
                            Flotte:{" "}
                            <span className="info-yellow-capitalize">
                                {ownedShipDatas?.fleet}
                            </span>
                        </h4>

                        {(user.webSiteRole === "administrateur" &&
                            user.userId === ownedShipDatas?.ownerId) ||
                        (user.webSiteRole === "moderateur" &&
                            user.userId === ownedShipDatas?.ownerId) ? (
                            <div className="flex-row">
                                <ShipFleetChoice
                                    ownedShipDatas={ownedShipDatas}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* <div className="flex-row">
                        {ownedShipDatas?.fleet !== "" ? (
                            <h4>
                                Rang:{" "}
                                <span className="info-yellow-capitalize">
                                    {ownedShipDatas?.rank}
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}
                        {ownedShipDatas?.fleet !== "" &&
                        user.webSiteRole ===
                            ("administrateur" || "moderateur") ? (
                            <div className="flex-row">
                                {(ownedShipDatas?.ownerId === user.userId ||
                                    user.webSiteRole === "administrateur") &&
                                ownedShipDatas?.shared === "oui" ? (
                                    <ShipRankChoice
                                        ownedShipDatas={ownedShipDatas}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div> */}
                    {/* <div className="flex-row">
                        {ownedShipDatas?.fleet !== "" &&
                        ownedShipDatas?.rank !== "01 - vaisseau amiral" ? (
                            <h4>
                                Supérieur Hiérarchique:{" "}
                                <span className="info-yellow-capitalize">
                                    {
                                        ownedShipDatas?.shipHierachicalSuperior
                                            ?.shipHierachicalSuperior
                                    }
                                </span>
                            </h4>
                        ) : (
                            ""
                        )}
                        {ownedShipDatas?.fleet !== "" &&
                        user.webSiteRole ===
                            ("administrateur" || "moderateur") ? (
                            <div className="flex-row">
                                {(ownedShipDatas?.ownerId === user.userId ||
                                    user.webSiteRole === "administrateur") &&
                                ownedShipDatas?.shared === "oui" ? (
                                    <ShipHierachicalSuperiorChoice
                                        ownedShipDatas={ownedShipDatas}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div> */}
                </div>
            </div>
            <div className="owned-ship-informations-main-container">
                <div className="owned-ship-card-informations-sub-container">
                    <div className="flex-row-start-end">
                        <h2>Membres d'équipage</h2>
                        <ArrowDropDown
                            onClick={() => setIsDeployed(!isDeployed)}
                            className={isDeployed === true ? "down" : "up"}
                        />
                        {ownedShipDatas?.crewMembers?.length <
                        ownedShipDatas?.ship?.maxCrew ? (
                            <h4>
                                Nombre de postes libres:{" "}
                                <>
                                    <span className="info-yellow">
                                        {ownedShipDatas?.crewMembers?.length}
                                    </span>
                                    {" / "}
                                    <span className="info-green">
                                        {ownedShipDatas?.ship?.maxCrew}
                                    </span>
                                </>
                            </h4>
                        ) : (
                            <h4 className="info-red-uppercase">
                                aucun poste libre
                            </h4>
                        )}
                    </div>

                    <div
                        className={
                            isDeployed === true
                                ? "owned-ship-card-informations-crew-container collapse"
                                : "reduced"
                        }
                    >
                        <div className="owned-ship-card-informations-data">
                            <h3>Personnels affectés</h3>
                        </div>
                        <div className="owned-ship-card-crew-member-cards-container">
                            {ownedShipDatas?.crewMembers &&
                                ownedShipDatas?.crewMembers.map(
                                    (crewMember) => (
                                        <CrewMemberCard
                                            crewMember={crewMember}
                                            ownedShipDatas={ownedShipDatas}
                                        />
                                    )
                                )}
                        </div>
                        {(ownedShipDatas?.ownerId === user.userId ||
                            user.webSiteRole === "administrateur") &&
                        ownedShipDatas?.crewMembers?.length !==
                            ownedShipDatas?.ship?.maxCrew ? (
                            <div className="owned-ship-card-crew-member-cards-container">
                                <div className="crew-member-card-body">
                                    <div
                                        className="crew-member-card-search-container"
                                        onClick={(e) =>
                                            dispatch(
                                                setCrewSelectionActive(
                                                    !crewSelectionActive
                                                )
                                            )
                                        }
                                    >
                                        Ajouter un personnel
                                        <AddCircleOutline className="crew-member-card-plus" />
                                    </div>
                                    {crewSelectionActive === true ? (
                                        <UserSearchPanel
                                            ownedShipDatas={ownedShipDatas}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {ownedShipDatas?.crewMemberPostulants &&
                        ownedShipDatas?.crewMemberPostulants[0] ? (
                            <>
                                <h3>Personnels en attente d'affectation</h3>
                                <div className="owned-ship-card-crew-member-cards-container">
                                    {ownedShipDatas?.crewMemberPostulants &&
                                        ownedShipDatas?.crewMemberPostulants.map(
                                            (crewMemberPostulant) => (
                                                <CrewMemberPostulantCard
                                                    crewMemberPostulant={
                                                        crewMemberPostulant
                                                    }
                                                    ownedShipDatas={
                                                        ownedShipDatas
                                                    }
                                                />
                                            )
                                        )}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        {user.factionPart === ownedShipDatas?.factionPart ||
                        (user.factionPart === "civil-militaire" &&
                            ownedShipDatas?.factionPart === "civil") ? (
                            <>
                                {ownedShipDatas?.ownerId !== user.userId &&
                                user.postulant === "non" &&
                                user.employment === "non" &&
                                ownedShipDatas?.crewMembers?.length !==
                                    ownedShipDatas?.ship?.maxCrew ? (
                                    <JoinCrewCard
                                        ownedShipDatas={ownedShipDatas}
                                    />
                                ) : (
                                    ""
                                )}
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnedShipCardInformationsPanel;
