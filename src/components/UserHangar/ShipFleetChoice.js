import {doc, runTransaction} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {db} from "../../utils/firebase.config";

const ShipFleetChoice = ({ownedShipDatas}) => {
    const fleet = useRef();
    const [errorMessage, setErrorMessage] = useState("");

    const handleFleetSwitch = async (e) => {
        e.preventDefault();
        const nextFleet = fleet.current?.value;
        if (!ownedShipDatas?.id || !nextFleet) {
            setErrorMessage("Choisissez une flotte.");
            return;
        }
        if (nextFleet === ownedShipDatas.fleet) return;

        const shipRef = doc(db, "shipsAndCrews", ownedShipDatas.id);
        try {
            await runTransaction(db, async (transaction) => {
                const shipSnapshot = await transaction.get(shipRef);
                if (!shipSnapshot.exists()) {
                    throw new Error("Le vaisseau n'existe plus.");
                }

                const shipData = shipSnapshot.data();
                const parentId = shipData.newShipHierarchicalSuperior?.id;
                const childIds = (shipData.subordonateShips ?? [])
                    .map((child) =>
                        typeof child === "string" ? child : child?.id
                    )
                    .filter((id) => id && id !== shipSnapshot.id);
                const relatedIds = [
                    ...new Set([parentId, ...childIds].filter(Boolean)),
                ];
                const relatedRefs = relatedIds.map((id) =>
                    doc(db, "shipsAndCrews", id)
                );
                const relatedSnapshots = await Promise.all(
                    relatedRefs.map((reference) => transaction.get(reference))
                );

                const parentIndex = parentId ? relatedIds.indexOf(parentId) : -1;
                const parentSnapshot =
                    parentIndex >= 0 ? relatedSnapshots[parentIndex] : null;
                if (parentSnapshot?.exists()) {
                    transaction.update(relatedRefs[parentIndex], {
                        subordonateShips: (
                            parentSnapshot.data().subordonateShips ?? []
                        ).filter(
                            (child) =>
                                (typeof child === "string" ? child : child?.id) !==
                                shipSnapshot.id
                        ),
                    });
                }

                childIds.forEach((childId) => {
                    const childIndex = relatedIds.indexOf(childId);
                    const childSnapshot = relatedSnapshots[childIndex];
                    if (childSnapshot?.exists()) {
                        transaction.update(relatedRefs[childIndex], {
                            rank: "",
                            oldShipHierarchicalSuperior: {
                                id: shipSnapshot.id,
                                shipName: shipData.shipName ?? "",
                            },
                            newShipHierarchicalSuperior: "",
                        });
                    }
                });

                transaction.update(shipRef, {
                    fleet: nextFleet,
                    rank: "",
                    oldShipHierarchicalSuperior: "",
                    newShipHierarchicalSuperior: "",
                    subordonateShips: [],
                });
            });
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Le changement de flotte a échoué.");
            console.error("Unable to change ship fleet:", error);
        }
    };

    let fleetChoiceMenu = "";

    switch (ownedShipDatas?.department) {
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
                            1ère flotte d'approvionnement et de transport' -
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
        case "central administration":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CPFG.">
                            Flotte civile gouvernementale - CPFG.
                        </option>
                    </select>
                </>
            );
            break;
        case "academy":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1Fo.">
                            1ère flotte civile de formation - CP1Fo.
                        </option>
                    </select>
                </>
            );
            break;
        case "exploration":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1Ex.">
                            1ère flotte d'exploration - CP1Ex.
                        </option>
                    </select>
                </>
            );
            break;
        case "tourism":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1Te.">
                            1ère flotte de tourisme - CP1Te.
                        </option>
                    </select>
                </>
            );
            break;
        case "trade & transport":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1Ci.">
                            1ère flotte de commerce itinérante - CP1Ci.
                        </option>
                        <option value="CP1Tp.">
                            1ère flotte de commerce transport - CP1Tp.
                        </option>
                    </select>
                </>
            );
            break;
        case "industry":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1MiRa.">
                            1ère flotte de minage et de raffinage - CP1MiRa.
                        </option>
                        <option value="CP1Ry.">
                            1ère flotte de recyclage - CP1Ry.
                        </option>
                    </select>
                </>
            );
            break;
        case "sciences":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1Cr.">
                            1ère flotte de civile recherche - CP1Cr.
                        </option>
                    </select>
                </>
            );
            break;
        case "medicine":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1He.">
                            1ère flotte civile hospitalière - CP1He.
                        </option>
                    </select>
                </>
            );
            break;
        case "culture & sports":
            fleetChoiceMenu = (
                <>
                    <select ref={fleet}>
                        <option value="">Veuillez choisir une flotte...</option>
                        <option value="CP1FeC.">
                            1ère flottille de course Primaris - CP1FeC.
                        </option>
                    </select>
                </>
            );
            break;

        default:
    }
    return (
        <div>
            {fleetChoiceMenu}
            <button onClick={(e) => handleFleetSwitch(e)}>Valider</button>
            {errorMessage && (
                <span className="error-message" role="alert">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export default ShipFleetChoice;
