import {doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {db} from "../../utils/firebase.config";
import {useDispatch, useSelector} from "react-redux";
import {setChosenRank} from "../../feature/militaryRanks.slice";

const ShipRankChoice = ({ownedShipDatas}) => {
    const rank = useRef();
    const dispatch = useDispatch();

    const chosenRank = useSelector((state) => state.militaryRanks.chosenRank);
    const sharedShipList = useSelector(
        (state) => state.sharedShips.sharedShipsList
    );
    const newShipSuperior = ownedShipDatas?.newShipHierarchicalSuperior;

    const oldShipSuperior = sharedShipList.find(
        (ship) => ship?.id === ownedShipDatas?.newShipHierarchicalSuperior?.id
    );

    const shipSubordonates = ownedShipDatas?.subordonateShips.map(
        (ship) => ship?.id
    );

    const handleRankSwitch = async (e) => {
        e.preventDefault();

        // supprimer le vaisseau courant de la liste des subalternes de son ancien supérieur hiérarchique.

        if (oldShipSuperior !== undefined && newShipSuperior !== undefined) {
            await updateDoc(doc(db, "shipsAndCrews", oldShipSuperior?.id), {
                subordonateShips: oldShipSuperior?.subordonateShips?.filter(
                    (ship) => ship?.id !== ownedShipDatas?.id
                ),
            });
        } else {
            await console.log("ship superior inexistant");
        }

        // supprimer le vaisseau courant comme vaisseau hierarchique de tous ses anciens subalternes.

        shipSubordonates !== (undefined || null || []) ||
        oldShipSuperior !== (undefined || null || "") ||
        newShipSuperior !== (undefined || null || "")
            ? await shipSubordonates?.forEach((ship) => {
                  updateDoc(doc(db, "shipsAndCrews", ship), {
                      oldShipHierarchicalSuperior: newShipSuperior,
                      newShipHierarchicalSuperior: "",
                      rank: "",
                  });
              })
            : console.log("subalternes inexistants");

        // changer le rang, MAJ ancien vaisseau commandement et supprimer tous les vaisseaux subalternes.

        let oldShipHierarchicalSuperior = {};

        if (ownedShipDatas?.newShipHierarchicalSuperior?.id !== undefined) {
            oldShipHierarchicalSuperior = {
                id: ownedShipDatas?.newShipHierarchicalSuperior?.id,
                shipName: ownedShipDatas?.newShipHierarchicalSuperior?.shipName,
            };
        } else {
            oldShipHierarchicalSuperior = "";
        }

        let subordonateShips = shipSubordonates.filter(
            (ship) => ship?.id === ownedShipDatas?.id
        );

        shipSubordonates !== (undefined || null || "")
            ? await updateDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id), {
                  rank: chosenRank,
                  subordonateShips: subordonateShips,
                  oldShipHierarchicalSuperior: oldShipHierarchicalSuperior,
                  newShipHierarchicalSuperior: "",
              })
            : await console.log("pas de subordonnés à mettre à jour");
    };

    let rankChoiceMenu = "";

    return (
        <div>
            {rankChoiceMenu}
            <>
                <select
                    ref={rank}
                    onChange={() => dispatch(setChosenRank(rank.current.value))}
                >
                    <option value="">Veuillez choisir un rang...</option>
                    {ownedShipDatas?.rank !== "01 - vaisseau amiral" ? (
                        <option value="01 - vaisseau amiral">
                            01 - vaisseau amiral
                        </option>
                    ) : (
                        ""
                    )}
                    {ownedShipDatas?.rank !==
                    "02 - vaisseau de commandement de sous flotte" ? (
                        <option value="02 - vaisseau de commandement de sous flotte">
                            02 - vaisseau de commandement de sous flotte
                        </option>
                    ) : (
                        ""
                    )}
                    {ownedShipDatas?.rank !==
                    "03 - Vaisseau de commandement d'aile de combat" ? (
                        <option value="03 - Vaisseau de commandement d'aile de combat">
                            03 - Vaisseau de commandement d'aile de combat
                        </option>
                    ) : (
                        ""
                    )}
                    {ownedShipDatas?.rank !== "04 - Vaisseau chef de groupe" ? (
                        <option value="04 - Vaisseau chef de groupe">
                            04 - Vaisseau chef de groupe
                        </option>
                    ) : (
                        ""
                    )}
                    {ownedShipDatas?.rank !==
                    "05 - Vaisseau chef d'escadrille" ? (
                        <option value="05 - Vaisseau chef d'escadrille">
                            05 - Vaisseau chef d'escadrille
                        </option>
                    ) : (
                        ""
                    )}
                    {ownedShipDatas?.rank !== "06 - Ailier" ? (
                        <option value="06 - Ailier">06 - Ailier</option>
                    ) : (
                        ""
                    )}
                </select>
                <button onClick={(e) => handleRankSwitch(e)}>Valider</button>
            </>
        </div>
    );
};

export default ShipRankChoice;
