import {doc, updateDoc} from "firebase/firestore";
import React, {useRef} from "react";
import {db} from "../../utils/firebase.config";
import {useDispatch, useSelector} from "react-redux";
import {setHierarchicalShipSelected} from "../../feature/sharedShips.slice";

const ShipHierarchicalSuperiorChoice = ({ownedShipDatas}) => {
    const dispatch = useDispatch();
    const shipHierarchicalSuperior = useRef();
    const dispatchedShipSuperior = useSelector(
        (state) => state.sharedShips?.hierarchicalShipSelected
    );
    const sharedShipList = useSelector(
        (state) => state.sharedShips.sharedShipsList
    );
    const oldShipSuperior = sharedShipList.find(
        (ship) => ship?.id === ownedShipDatas?.newShipHierarchicalSuperior?.id
    );

    const sameFleetAdmiralShipsList = useSelector((state) =>
        [...state.sharedShips.sharedShipsList]
            .filter((ship) => ship.fleet === ownedShipDatas.fleet)
            .filter((ship) => ship.rank === "01 - vaisseau amiral")
    );

    const sameFleetUnderFleetShipsList = useSelector((state) =>
        [...state.sharedShips.sharedShipsList]
            .filter((ship) => ship.fleet === ownedShipDatas.fleet)
            .filter(
                (ship) =>
                    ship.rank === "02 - vaisseau de commandement de sous flotte"
            )
    );
    const sameFleetBattleWingShipsList = useSelector((state) =>
        [...state.sharedShips.sharedShipsList]
            .filter((ship) => ship.fleet === ownedShipDatas.fleet)
            .filter(
                (ship) =>
                    ship.rank ===
                    "03 - Vaisseau de commandement d'aile de combat"
            )
    );
    const sameFleetGroupChiefShipsList = useSelector((state) =>
        [...state.sharedShips.sharedShipsList]
            .filter((ship) => ship.fleet === ownedShipDatas.fleet)
            .filter((ship) => ship.rank === "04 - Vaisseau chef de groupe")
    );

    const sameFleetSquadronShipsList = useSelector((state) =>
        [...state.sharedShips.sharedShipsList]
            .filter((ship) => ship.fleet === ownedShipDatas.fleet)
            .filter((ship) => ship.rank === "05 - Vaisseau chef d'escadrille")
    );

    const handleHierarchicalSuperiorSwitch = async (e) => {
        e.preventDefault();

        const shipSuperior = sharedShipList.find(
            (ship) =>
                ship?.shipName === shipHierarchicalSuperior?.current?.value
        );

        await dispatch(setHierarchicalShipSelected(shipSuperior));

        console.log(sameFleetBattleWingShipsList);
    };

    const sendHierarchicalShipDatas = async (e) => {
        let subordonateShips = dispatchedShipSuperior?.subordonateShips;

        const subordonateShipData = {
            id: ownedShipDatas.id,
            shipName: ownedShipDatas.shipName,
        };

        await console.log("data collectée");

        try {
            oldShipSuperior !== (undefined && null) ||
            subordonateShips !== (undefined && null)
                ? await updateDoc(
                      doc(db, "shipsAndCrews", oldShipSuperior?.id),
                      {
                          subordonateShips:
                              oldShipSuperior?.subordonateShips.filter(
                                  (ship) => ship?.id !== ownedShipDatas?.id
                              ),
                      }
                  )
                : await console.log(
                      "erreur retrait du vaisseau subalterne de l'ancien supérieur hiérarchique"
                  );
        } catch (error) {
            await console.log(
                error +
                    "erreur retrait du vaisseau subalterne de l'ancien supérieur hiérarchique"
            );
        }

        // Modification du vaisseau supérieur
        if (oldShipSuperior !== undefined && oldShipSuperior !== "") {
            await updateDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id), {
                oldShipHierarchicalSuperior: {
                    id: oldShipSuperior?.id,
                    shipName: oldShipSuperior?.shipName,
                },
            });
        } else await console.log("erreur MAJ ancien supérieur");

        await console.log("MAJ ancien supérieur OK");

        dispatchedShipSuperior !== undefined
            ? await updateDoc(doc(db, "shipsAndCrews", ownedShipDatas?.id), {
                  newShipHierarchicalSuperior: {
                      id: dispatchedShipSuperior?.id,
                      shipName: dispatchedShipSuperior?.shipName,
                  },
              })
            : await console.log("erreur MAJ du supérieur hiérarchique");

        await console.log("MAJ du supérieur hiérarchique OK");

        // Modification des vaisseaux subalternes
        dispatchedShipSuperior !== (undefined || null || "") ||
        subordonateShips !== (undefined || null || "")
            ? await updateDoc(
                  doc(db, "shipsAndCrews", dispatchedShipSuperior?.id),
                  {
                      subordonateShips: [
                          ...subordonateShips,
                          subordonateShipData,
                      ],
                  }
              )
            : await console.log("erreur ajout du vaisseau subalterne");

        await console.log("ajout du vaisseau subalterne OK");

        // retrait du vaisseau subordonné de l'ancien superieur hiérarchique

        await console.log("datas sent");
    };

    console.log(sameFleetUnderFleetShipsList);

    let selectShipsCommanderList = "";

    switch (ownedShipDatas?.rank) {
        case "02 - vaisseau de commandement de sous flotte":
            selectShipsCommanderList = (
                <>
                    <select
                        ref={shipHierarchicalSuperior}
                        onChange={(e) => handleHierarchicalSuperiorSwitch(e)}
                    >
                        <option value="">
                            Veuillez choisir un vaisseau de commandement...
                        </option>
                        {sameFleetAdmiralShipsList.map((ship) =>
                            oldShipSuperior?.id !== ship?.id ? (
                                <option>{ship.shipName}</option>
                            ) : (
                                ""
                            )
                        )}
                    </select>
                    <button onClick={(e) => sendHierarchicalShipDatas(e)}>
                        Valider
                    </button>
                </>
            );
            break;
        case "03 - Vaisseau de commandement d'aile de combat":
            selectShipsCommanderList = (
                <>
                    <select
                        ref={shipHierarchicalSuperior}
                        onChange={(e) => handleHierarchicalSuperiorSwitch(e)}
                    >
                        <option value="">
                            Veuillez choisir un vaisseau de commandement...
                        </option>
                        {sameFleetUnderFleetShipsList.map((ship) =>
                            oldShipSuperior?.id !== ship?.id ? (
                                <option>{ship.shipName}</option>
                            ) : (
                                ""
                            )
                        )}
                    </select>
                    <button onClick={(e) => sendHierarchicalShipDatas(e)}>
                        Valider
                    </button>
                </>
            );
            break;
        case "04 - Vaisseau chef de groupe":
            selectShipsCommanderList = (
                <>
                    <select
                        ref={shipHierarchicalSuperior}
                        onChange={(e) => handleHierarchicalSuperiorSwitch(e)}
                    >
                        <option value="">
                            Veuillez choisir un vaisseau de commandement...
                        </option>
                        {sameFleetBattleWingShipsList.map((ship) =>
                            oldShipSuperior?.id !== ship?.id ? (
                                <option>{ship.shipName}</option>
                            ) : (
                                ""
                            )
                        )}
                    </select>
                    <button onClick={(e) => sendHierarchicalShipDatas(e)}>
                        Valider
                    </button>
                </>
            );
            break;
        case "05 - Vaisseau chef d'escadrille":
            selectShipsCommanderList = (
                <>
                    <select
                        ref={shipHierarchicalSuperior}
                        onChange={(e) => handleHierarchicalSuperiorSwitch(e)}
                    >
                        <option value="">
                            Veuillez choisir un vaisseau de commandement...
                        </option>
                        {sameFleetGroupChiefShipsList.map((ship) =>
                            oldShipSuperior?.id !== ship?.id ? (
                                <option>{ship.shipName}</option>
                            ) : (
                                ""
                            )
                        )}
                    </select>
                    <button onClick={(e) => sendHierarchicalShipDatas(e)}>
                        Valider
                    </button>
                </>
            );
            break;

        case "06 - Ailier":
            selectShipsCommanderList = (
                <>
                    <select
                        ref={shipHierarchicalSuperior}
                        onChange={(e) => handleHierarchicalSuperiorSwitch(e)}
                    >
                        <option value="">
                            Veuillez choisir un vaisseau de commandement...
                        </option>
                        {sameFleetSquadronShipsList.map((ship) =>
                            oldShipSuperior?.id !== ship?.id ? (
                                <option>{ship.shipName}</option>
                            ) : (
                                ""
                            )
                        )}
                    </select>
                    <button onClick={(e) => sendHierarchicalShipDatas(e)}>
                        Valider
                    </button>
                </>
            );
            break;
        default:
    }

    let rankChoiceMenu = "";

    return (
        <div>
            {rankChoiceMenu}
            <>{selectShipsCommanderList}</>
        </div>
    );
};

export default ShipHierarchicalSuperiorChoice;
