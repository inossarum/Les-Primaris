import React from "react";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {setEventDetailsWindowActive} from "../../feature/events.slice";

const BulletinBoardBtn = ({factionPart, pageActive}) => {
  let btnClasseName = "";
  let navLinkTo = "";
  let btnTitle = "";

  const dispatch = useDispatch();

  switch (factionPart) {
    case "civilian":
      btnClasseName = "civilian-btn";
      navLinkTo = `${
        pageActive === "civilianBulletinBoard" ? "/" : "/civilianBulletinBoard"
      }`;
      btnTitle = `${
        pageActive === "civilianBulletinBoard"
          ? "Accueil"
          : "Tableau d'affichage civil"
      }`;
      break;
    case "military":
      btnClasseName = "military-btn";
      navLinkTo = `${
        pageActive === "militaryBulletinBoard"
          ? "/militaryHome"
          : "/militaryBulletinBoard"
      }`;
      btnTitle = `${
        pageActive === "militaryBulletinBoard"
          ? "Accueil"
          : "Tableau d'affichage militaire"
      }`;
      break;
    case "battlefield":
      btnClasseName = "bf2042-btn";
      navLinkTo = `${
        pageActive === "battlefieldBulletinBoard"
          ? "/battlefield"
          : "/battlefieldBulletinBoard"
      }`;
      btnTitle = `${
        pageActive === "battlefieldBulletinBoard"
          ? "Accueil"
          : "Tableau d'affichage BF2042"
      }`;
      break;
    case "primarisIngameShop":
      btnClasseName = "primaris-ingame-shop-btn";
      break;
    case "administration":
      btnClasseName = "administration-btn";
      break;
    case "diabloIV":
      btnClasseName = "diabloIV-btn";
      navLinkTo = `${
        pageActive === "diabloIVBulletinBoard"
          ? "/diabloIV"
          : "/diabloIVBulletinBoard"
      }`;
      btnTitle = `${
        pageActive === "battlefieldBulletinBoard"
          ? "Accueil"
          : "Tableau d'affichage Diablo IV"
      }`;
      break;
    default:
  }

  return (
    <NavLink
      to={navLinkTo}
      className={btnClasseName}
      onClick={() => dispatch(setEventDetailsWindowActive(""))}
    >
      {btnTitle}
    </NavLink>
  );
};

export default BulletinBoardBtn;
