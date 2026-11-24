import {doc, runTransaction} from "firebase/firestore";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {db} from "../../utils/firebase.config";

const REQUIRED_SUPERIOR_RANK = {
    "02 - vaisseau de commandement de sous flotte": "01 - vaisseau amiral",
    "03 - Vaisseau de commandement d'aile de combat":
        "02 - vaisseau de commandement de sous flotte",
    "04 - Vaisseau chef de groupe":
        "03 - Vaisseau de commandement d'aile de combat",
    "05 - Vaisseau chef d'escadrille": "04 - Vaisseau chef de groupe",
    "06 - Ailier": "05 - Vaisseau chef d'escadrille",
};

const ShipHierarchicalSuperiorChoice = ({ownedShipDatas}) => {
    const [selectedSuperiorId, setSelectedSuperiorId] = useState(
        ownedShipDatas?.newShipHierarchicalSuperior?.id ?? ""
    );
    const [errorMessage, setErrorMessage] = useState("");
    const sharedShipList = useSelector(
        (state) => state.sharedShips.sharedShipsList
    );
    const expectedSuperiorRank = REQUIRED_SUPERIOR_RANK[ownedShipDatas?.rank];
    const superiorCandidates = (sharedShipList ?? []).filter(
        (ship) =>
            ship.id !== ownedShipDatas?.id &&
            ship.fleet === ownedShipDatas?.fleet &&
            ship.rank === expectedSuperiorRank
    );

    const sendHierarchicalShipDatas = async (event) => {
        event.preventDefault();
        const currentShipId = ownedShipDatas?.id;
        if (!currentShipId || !selectedSuperiorId || !expectedSuperiorRank) {
            setErrorMessage("Choisissez un vaisseau supérieur valide.");
            return;
        }

        const currentShipRef = doc(db, "shipsAndCrews", currentShipId);
        const newSuperiorRef = doc(
            db,
            "shipsAndCrews",
            selectedSuperiorId
        );

        try {
            await runTransaction(db, async (transaction) => {
                const [currentShipSnapshot, newSuperiorSnapshot] =
                    await Promise.all([
                        transaction.get(currentShipRef),
                        transaction.get(newSuperiorRef),
                    ]);
                if (!currentShipSnapshot.exists() || !newSuperiorSnapshot.exists()) {
                    throw new Error("Le vaisseau sélectionné est introuvable.");
                }

                const currentShip = currentShipSnapshot.data();
                const newSuperior = newSuperiorSnapshot.data();
                if (
                    newSuperior.rank !==
                        REQUIRED_SUPERIOR_RANK[currentShip.rank] ||
                    newSuperior.fleet !== currentShip.fleet
                ) {
                    throw new Error("Le supérieur choisi n'est pas compatible.");
                }

                const previousSuperiorId =
                    currentShip.newShipHierarchicalSuperior?.id;
                const previousSuperiorRef = previousSuperiorId
                    ? doc(db, "shipsAndCrews", previousSuperiorId)
                    : null;
                const previousSuperiorSnapshot =
                    previousSuperiorRef &&
                    previousSuperiorId !== selectedSuperiorId
                        ? await transaction.get(previousSuperiorRef)
                        : null;

                if (previousSuperiorSnapshot?.exists()) {
                    const previousSubordinates =
                        previousSuperiorSnapshot.data().subordonateShips ?? [];
                    transaction.update(previousSuperiorRef, {
                        subordonateShips: previousSubordinates.filter(
                            (ship) =>
                                (typeof ship === "string" ? ship : ship?.id) !==
                                currentShipSnapshot.id
                        ),
                    });
                }

                const newSubordinates =
                    newSuperior.subordonateShips ?? [];
                transaction.update(newSuperiorRef, {
                    subordonateShips: [
                        ...newSubordinates.filter(
                            (ship) =>
                                (typeof ship === "string" ? ship : ship?.id) !==
                                currentShipSnapshot.id
                        ),
                        {
                            id: currentShipSnapshot.id,
                            shipName: currentShip.shipName ?? "",
                        },
                    ],
                });
                transaction.update(currentShipRef, {
                    oldShipHierarchicalSuperior: previousSuperiorId
                        ? {
                              id: previousSuperiorId,
                              shipName:
                                  previousSuperiorSnapshot?.data()?.shipName ??
                                  currentShip.newShipHierarchicalSuperior
                                      ?.shipName ??
                                  "",
                          }
                        : "",
                    newShipHierarchicalSuperior: {
                        id: newSuperiorSnapshot.id,
                        shipName: newSuperior.shipName ?? "",
                    },
                });
            });

            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Le changement de supérieur hiérarchique a échoué.");
            console.error("Unable to change ship hierarchy:", error);
        }
    };

    if (!expectedSuperiorRank) return null;

    return (
        <div>
            <select
                value={selectedSuperiorId}
                onChange={(event) => setSelectedSuperiorId(event.target.value)}
            >
                <option value="">Veuillez choisir un vaisseau de commandement...</option>
                {superiorCandidates.map((ship) => (
                    <option key={ship.id} value={ship.id}>
                        {ship.shipName}
                    </option>
                ))}
            </select>
            <button type="button" onClick={sendHierarchicalShipDatas}>
                Valider
            </button>
            {errorMessage && (
                <span className="error-message" role="alert">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export default ShipHierarchicalSuperiorChoice;
