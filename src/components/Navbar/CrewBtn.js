import React from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const CrewBtn = ({factionPart, pageActive}) => {
    const userFactionPart = useSelector((state) => state.user.factionPart);
    let btnClasseName = "";
    let navLinkTo = "";
    let btnTitle = "";

    switch (factionPart) {
        // case "civilian":
        //     btnClasseName = "civilian-btn";
        //     navLinkTo = `${
        //         pageActive === "civilianCrew" ? "/" : "/civilianCrew"
        //     }`;
        //     btnTitle = `${
        //         pageActive === "civilianCrew" ? "Accueil" : "Equipages Civils"
        //     }`;
        //     break;
        case "military":
            btnClasseName = "military-btn";
            navLinkTo = `${
                pageActive === "militaryCrew"
                    ? "/militaryHome"
                    : "/militaryFleets"
            }`;
            btnTitle = `${
                pageActive === "militaryCrew"
                    ? "Accueil"
                    : "Equipages militaires"
            }`;
            break;

        // case "primarisIngameShop":
        //     btnClasseName = "primaris-ingame-shop-btn";
        //     break;
        // case "administration":
        //     btnClasseName = "administration-btn";
        //     break;

        default:
    }

    if (
        userFactionPart === "civil-militaire" ||
        // userFactionPart === "civil" ||
        userFactionPart === "militaire"
    ) {
        return (
            <NavLink to={navLinkTo} className={btnClasseName}>
                {btnTitle}
            </NavLink>
        );
    } else {
        return <NavLink></NavLink>;
    }
};

export default CrewBtn;
