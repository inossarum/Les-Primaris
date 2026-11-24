import React from "react";
import {useSelector} from "react-redux";
import UnderFleetCommanderCard from "../UnderFleetCommanderCard";
import BattleWingCommanderCard from "../BattleWingCommanderCard";
import GroupCommanderCard from "../GroupCommanderCard";
import SquadronChiefCard from "../SquadronChiefCard";
import WingManCard from "../WingManCard";

function SubordonateRankFilter({fleetCard}) {
    const user = useSelector((state) => state.user);
    const sharedShipsList = useSelector(
        (state) => state.sharedShips.sharedShipsList
    );

    // Récupération des infos complètes de vaisseau actuel.
    const actualShip = useSelector((state) =>
        state.sharedShips.sharedShipsList.find(
            (ship) => ship.id === fleetCard.id
        )
    );

    // Récupération des infos concernant les vaisseaux subordonnés au vaisseau actuel

    const actualShipSubordonateShipsList = actualShip?.subordonateShips.map(
        (subordonateShip) => subordonateShip
    );

    // Récupération des infos détaillées de chaque subordonnés.

    let actualShipSubordonateShipsListDetailed = [];

    const sharedShipsListMapped = sharedShipsList.map((ship) => ship.id);

    console.log(actualShip.id);

    let rankFilter = "";

    switch (actualShip.rank) {
        case "02 - vaisseau de commandement de sous flotte":
            rankFilter = (
                <>
                    <UnderFleetCommanderCard
                        key={Math.random()}
                        underFleetCommanderShip={actualShip}
                    />
                </>
            );
            break;
        case "03 - Vaisseau de commandement d'aile de combat":
            rankFilter = (
                <>
                    <BattleWingCommanderCard
                        key={Math.random()}
                        battleWingCommanderShip={actualShip}
                    />
                </>
            );
            break;
        case "04 - Vaisseau chef de groupe":
            rankFilter = (
                <>
                    <GroupCommanderCard
                        key={Math.random()}
                        groupCommandership={actualShip}
                    />
                </>
            );
            break;
        case "05 - Vaisseau chef d'escadrille":
            rankFilter = (
                <>
                    <SquadronChiefCard
                        key={Math.random()}
                        squadronChiefShip={actualShip}
                    />
                </>
            );
            break;
        case "05 - Vaisseau chef d'escadrille":
            rankFilter = (
                <>
                    <SquadronChiefCard
                        key={Math.random()}
                        squadronChiefShip={actualShip}
                    />
                </>
            );
            break;
        case "06 - Ailier":
            rankFilter = (
                <>
                    <WingManCard key={Math.random()} wingManShip={actualShip} />
                </>
            );
            break;
        default:
    }

    return <div>{rankFilter}</div>;
}

export default SubordonateRankFilter;
