import {doc, runTransaction} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {db} from "../../utils/firebase.config";

const RANKS = [
    "01 - vaisseau amiral",
    "02 - vaisseau de commandement de sous flotte",
    "03 - Vaisseau de commandement d'aile de combat",
    "04 - Vaisseau chef de groupe",
    "05 - Vaisseau chef d'escadrille",
    "06 - Ailier",
];

const ShipRankChoice = ({ownedShipDatas}) => {
    const rank = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const handleRankSwitch = async (event) => {
        event.preventDefault();
        const selectedRank = rank.current?.value;
        if (!ownedShipDatas?.id || !selectedRank) {
            setErrorMessage("Choisissez un rang avant de valider.");
            return;
        }

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
                const relatedIds = [...new Set([parentId, ...childIds].filter(Boolean))];
                const relatedRefs = relatedIds.map((id) =>
                    doc(db, "shipsAndCrews", id)
                );
                const relatedSnapshots = await Promise.all(
                    relatedRefs.map((reference) => transaction.get(reference))
                );

                const parentIndex = parentId ? relatedIds.indexOf(parentId) : -1;
                const parentSnapshot =
                    parentIndex >= 0 ? relatedSnapshots[parentIndex] : null;
                const previousParent = parentSnapshot?.exists()
                    ? {
                          id: parentId,
                          shipName: parentSnapshot.data().shipName ?? "",
                      }
                    : "";

                if (parentSnapshot?.exists()) {
                    const parentSubordinates =
                        parentSnapshot.data().subordonateShips ?? [];
                    transaction.update(relatedRefs[parentIndex], {
                        subordonateShips: parentSubordinates.filter(
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
                    rank: selectedRank,
                    subordonateShips: [],
                    oldShipHierarchicalSuperior: previousParent,
                    newShipHierarchicalSuperior: "",
                });
            });

            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Le changement de rang a échoué.");
            console.error("Unable to change ship rank:", error);
        }
    };

    return (
        <div>
            <select ref={rank} defaultValue="">
                <option value="">Veuillez choisir un rang...</option>
                {RANKS.filter((option) => option !== ownedShipDatas?.rank).map(
                    (option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    )
                )}
            </select>
            <button onClick={handleRankSwitch}>Valider</button>
            {errorMessage && (
                <span className="error-message" role="alert">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export default ShipRankChoice;
