import React from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import ConnectModal from "../AccountStatment/ConnectModal";
import SocialNetworkBtn from "./SocialNetworkBtn";
import CareerBtn from "./CareerBtn";
import ContactBtn from "./ContactBtn";
import HomeBtn from "./HomeBtn";
import AdministrationBtn from "./AdministrationBtn";
import AccountBtn from "./AccountBtn";
import CrewBtn from "./CrewBtn";
import SCEncyclopediaBtn from "./SCEncyclopediaBtn";
import BulletinBoardBtn from "./BulletinBoardBtn";
import PrimarisIngameShopBtn from "./PrimarisIngameShopBtn";

const NavBar = ({factionPart, pageActive}) => {
    const user = useSelector((state) => state.user.currentUser);
    const userWebSiteRole = useSelector((state) => state.user.webSiteRole);
    const userFactionPart = useSelector((state) => state.user.factionPart);
    let navBarClasseName = "";

    switch (factionPart) {
        case "civilian":
            navBarClasseName = "civilian";
            break;
        case "military":
            navBarClasseName = "military";
            break;
        case "battlefield":
            navBarClasseName = "battlefield";
            break;
        case "primarisIngameShop":
            navBarClasseName = "primaris-ingame-shop-nav-bar";
            break;
        case "administration":
            navBarClasseName = "administration-nav-bar";
            break;
        case "diabloIV":
            navBarClasseName = "diabloIV-nav-bar";
            break;
        default:
    }

    return (
        <div className={` ${navBarClasseName} header-container`}>
            {/* Left part */}
            <CareerBtn factionPart={factionPart} pageActive={pageActive} />
            {userWebSiteRole === "administrateur" ||
            userFactionPart === "militaire" ||
            userFactionPart === "civil-militaire" ||
            userFactionPart === "civil" ? (
                <BulletinBoardBtn
                    factionPart={factionPart}
                    pageActive={pageActive}
                />
            ) : (
                <NavLink></NavLink>
            )}
            {user &&
            (userWebSiteRole === "administrateur" ||
                userWebSiteRole === "moderateur") ? (
                // userFactionPart === "militaire" ||
                // userFactionPart === "civil-militaire" ||
                // userFactionPart === "civil"
                <CrewBtn factionPart={factionPart} pageActive={pageActive} />
            ) : (
                <NavLink></NavLink>
            )}
            {user &&
            (userWebSiteRole === "administrateur" ||
                userWebSiteRole === "moderateur" ||
                userWebSiteRole === "membre" ||
                userWebSiteRole === "invité") ? (
                <SocialNetworkBtn
                    factionPart={factionPart}
                    pageActive={pageActive}
                />
            ) : (
                <NavLink></NavLink>
            )}
            {userWebSiteRole === "administrateur" ||
            userWebSiteRole === "moderateur" ||
            userWebSiteRole === "membre" ||
            userWebSiteRole === "invité" ? (
                <PrimarisIngameShopBtn
                    factionPart={factionPart}
                    pageActive={pageActive}
                />
            ) : (
                <NavLink></NavLink>
            )}
            {/* Middle button */}
            <HomeBtn factionPart={factionPart} pageActive={pageActive} />
            {/* Right part */}
            <NavLink></NavLink>
            {(user && userWebSiteRole === "administrateur") ||
            (user && userWebSiteRole === "moderateur") ? (
                <AdministrationBtn
                    factionPart={factionPart}
                    pageActive={pageActive}
                />
            ) : (
                <NavLink></NavLink>
            )}
            <SCEncyclopediaBtn
                factionPart={factionPart}
                pageActive={pageActive}
            />
            <ContactBtn factionPart={factionPart} pageActive={pageActive} />
            <AccountBtn factionPart={factionPart} />
            <ConnectModal factionPart={factionPart} pageActive={pageActive} />
        </div>
    );
};

export default NavBar;
