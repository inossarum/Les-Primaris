import React from "react";
import {useSelector} from "react-redux";
import UnderFleetCommanderCard from "../UnderFleetCommanderCard";
import BattleWingCommanderCard from "../BattleWingCommanderCard";
import GroupCommanderCard from "../GroupCommanderCard";
import SquadronChiefCard from "../SquadronChiefCard";
import WingManCard from "../WingManCard";

function SubordonateRankFilter({fleetCard}) {
    const actualShip = useSelector((state) =>
        state.sharedShips.sharedShipsList.find(
            (ship) => ship.id === fleetCard.id
        )
    );
    if (!actualShip) return null;

    let rankFilter = "";

    switch (actualShip.rank) {
        case "02 - vaisseau de commandement de sous flotte":
            rankFilter = (
                <>
                    <UnderFleetCommanderCard
                        key={actualShip.id}
                        underFleetCommanderShip={actualShip}
                    />
                </>
            );
            break;
        case "03 - Vaisseau de commandement d'aile de combat":
            rankFilter = (
                <>
                    <BattleWingCommanderCard
                        key={actualShip.id}
                        battleWingCommanderShip={actualShip}
                    />
                </>
            );
            break;
        case "04 - Vaisseau chef de groupe":
            rankFilter = (
                <>
                    <GroupCommanderCard
                        key={actualShip.id}
                        groupCommandership={actualShip}
                    />
                </>
            );
            break;
        case "05 - Vaisseau chef d'escadrille":
            rankFilter = (
                <>
                    <SquadronChiefCard
                        key={actualShip.id}
                        squadronChiefShip={actualShip}
                    />
                </>
            );
            break;
        case "06 - Ailier":
            rankFilter = (
                <>
                    <WingManCard key={actualShip.id} wingManShip={actualShip} />
                </>
            );
            break;
        default:
    }

    return <div>{rankFilter}</div>;
}

export default SubordonateRankFilter;
