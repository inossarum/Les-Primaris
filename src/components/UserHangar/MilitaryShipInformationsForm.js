import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../utils/firebase.config";
import {
    setPrivateRoomShipsListSearchResult,
    setSelectedShip,
} from "../../feature/userPrivateRoom.slice";

const MilitaryShipInformationsForm = ({ship, shipFactionPart}) => {
    const [shared, setShared] = useState("non");
    const [formError, setFormError] = useState("");
    const department = useRef();
    const [actualDepartment, setActualDepartment] = useState("");
    const fleet = useRef();
    const shipName = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const users = useSelector((state) => state.user.users);

    const handleNewShipOwned = async (e) => {
        e.preventDefault();

        const shipNameValue = shipName.current?.value?.trim();
        if (!shipNameValue) {
            setFormError("Veuillez saisir le nom du vaisseau.");
            return;
        }

        const departmentValue = department.current?.value;
        const fleetValue = fleet.current?.value;
        if (shared === "oui" && (!departmentValue || !fleetValue)) {
            setFormError("Choisissez un département et une flotte.");
            return;
        }
        setFormError("");

        const data = {
            owner: currentUser?.currentUser,
            ownerId: currentUser?.userId,
            ownerFactionRank: currentUser?.factionRank,
            ownerFactionPart: currentUser?.factionPart,
            ownerWebSiteRole: currentUser?.webSiteRole,
            ownerPhoto: currentUser?.photo,
            createdAt: Date.now(),
            crewMembers: [],
            shipName: shipNameValue,
            fleet: shared === "oui" ? fleetValue : "",
            rank: "",
            newShipHierarchicalSuperior: "",
            oldShipHierarchicalSuperior: "",
            subordonateShips: [],
            ship,
            shared,
            factionPart: shipFactionPart,
            notificationId: shared === "oui" ? Date.now() + Math.random() : "",
        };

        if (shared === "oui") {
            data.crewMemberPostulants = [];
            data.department = departmentValue;
        }

        await addDoc(collection(db, "shipsAndCrews"), data);

        if (shared === "oui") {
            const notificationDatas = {
                shipOwner: currentUser?.currentUser,
                shipOwnerId: currentUser?.userId,
                createdAt: Date.now(),
                shipName: ship.name,
                associatedSharedShip: data.notificationId,
                type: "nouveau vaisseau militaire partagé",
            };

            await Promise.all(
                (users ?? [])
                    .filter(
                        (user) =>
                            ["militaire", "civil-militaire"].includes(
                                user.factionPart
                            ) && user.id !== currentUser?.userId
                    )
                    .map((user) =>
                        updateDoc(doc(db, "users", user.id), {
                            notifications: [
                                ...(user.notifications ?? []),
                                notificationDatas,
                            ],
                        })
                    )
            );
        }

        dispatch(setSelectedShip(false));
        dispatch(setPrivateRoomShipsListSearchResult(""));
    };

    let fleetChoiceMenu = "";

    switch (actualDepartment) {
        case "aerospatial":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="EX1At.">
                            1ère flotte d'attaque - EX1At.
                        </option>
                        <option value="EX1De.">
                            1ère flotte de défense - EX1De.
                        </option>
                        <option value="EX1Rc.">
                            1ère flotte de reconnaissance - EX1Rc.
                        </option>
                    </select>
                </>
            );
            break;
        case "logistics":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="EX1Re.">
                            1ère flotte de recyclage - EX1Re.
                        </option>
                        <option value="EX1Ap.">
                            1ère flotte d'approvionnement et de transport -
                            EX1Ap.
                        </option>
                    </select>
                </>
            );
            break;
        case "military-training-center":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="EX1Fo.">
                            1ère flotte de formation - EX1Fo.
                        </option>
                    </select>
                </>
            );
            break;
        case "staff":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="EX1Ct.">
                            1ère flotte de commandement - EX1Ct.
                        </option>
                    </select>
                </>
            );
            break;
        case "military-research":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="EX1Rh.">
                            1ère flotte de recherche - EX1Rh.
                        </option>
                    </select>
                </>
            );
            break;
        case "military-medicine":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="EX1He.">
                            1ère flotte hospitalière - EX1He.
                        </option>
                    </select>
                </>
            );
            break;

        default:
    }

    return (
        <form
            className="ship-informations-form-body"
            onSubmit={(e) => handleNewShipOwned(e)}
        >
            <h3>Exercitus Primaris sélectionné</h3>
            <h4>Mettre ce vaisseau à disposition de la corporation ?</h4>
            {formError && (
                <p role="alert" className="error-message">
                    {formError}
                </p>
            )}
            <select onChange={(e) => setShared(e.target.value)}>
                <option value="non">Non</option>
                <option value="oui">Oui</option>
            </select>
            {shared === "oui" ? (
                <>
                    <p>
                        En mettant votre vaisseau à disposition, vous acceptez
                        que ce dernier ainsi que son équipage puissent faire
                        l'objet d'une modification d'affectation par le
                        gestionnaire. Concernant les Forces Spéciales, l'usage
                        et l'élaboration de l'équipage seront étudiés et décidés
                        par l'Exécuteur Militaire.
                    </p>

                    <div className="ship-informations-form-ship-employment">
                        <div className="ship-informations-form-ship-employment-sub-container">
                            <h4>Choix du département</h4>
                            <select
                                ref={department}
                                onChange={(e) =>
                                    setActualDepartment(e.target.value)
                                }
                            >
                                <option value="">
                                    Veuillez choisir un département...
                                </option>
                                <option value="aerospatial">Aerospatial</option>
                                <option value="logistics">Logistique</option>
                                <option value="military-training-center">
                                    Académie Militaire
                                </option>
                                <option value="staff">Etat Major</option>
                                <option value="military-research">
                                    Recherche
                                </option>
                                <option value="military-medicine">
                                    Médecine
                                </option>
                            </select>
                        </div>{" "}
                        {fleetChoiceMenu}
                        <div className="ship-informations-form-ship-employment-sub-container">
                            <h4>Nom du vaisseau</h4>
                            <input
                                type="text"
                                placeholder="Nom..."
                                ref={shipName}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="ship-informations-form-ship-employment-sub-container">
                    <h4>Nom du vaisseau</h4>
                    <input type="text" placeholder="Nom..." ref={shipName} />
                </div>
            )}
            <button id="ship-informations-form-submit-button" type="submit">
                Importer vaisseau
            </button>
        </form>
    );
};

export default MilitaryShipInformationsForm;
