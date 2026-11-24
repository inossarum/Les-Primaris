import React, {useState} from "react";
import MilitaryOutfitsCardsDescription from "./MilitaryOutfitsCardsDescription";

const MilitaryOutfitsCards = ({outfit, departmentOutfits, camoActive}) => {
  let img = "";

  const [isActive, setIsActive] = useState(false);

  switch (outfit) {
    // STAFF
    case "primarque":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "executeur-militaire":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "polemarque":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;

    // AEROSPATIAL
    case "chef-d'escadrille":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "pilote-forces-speciales":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "pilote-instructeur":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "pilote":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "pilote-urgentiste":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    // INFANTRY
    case "officier-marine":
      img = (
        <div className={`outfit-img-container`}>
          <div
            className={`outfit-img-slider ${departmentOutfits} ${camoActive}`}
          >
            <img
              src={`./assets/img/departments/military-outfits/${outfit}.webp`}
              alt={`tenue d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-arctic.webp`}
              alt={`tenue arctique d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-woodland.webp`}
              alt={`tenue forestière d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-desert.webp`}
              alt={`tenue desertique d(e)'${outfit}`}
            />
          </div>
        </div>
      );
      break;
    case "marine":
      img = (
        <div className={`outfit-img-container`}>
          <div
            className={`outfit-img-slider ${departmentOutfits} ${camoActive}`}
          >
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-urban.webp`}
              alt={`tenue d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-arctic.webp`}
              alt={`tenue arctique d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-woodland.webp`}
              alt={`tenue forestière d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-desert.webp`}
              alt={`tenue desertique d(e)'${outfit}`}
            />
          </div>
        </div>
      );
      break;
    case "marine-close-combat":
      img = (
        <div className={`outfit-img-container`}>
          <div
            className={`outfit-img-slider ${departmentOutfits} ${camoActive}`}
          >
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-urban.webp`}
              alt={`tenue d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-arctic.webp`}
              alt={`tenue arctique d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-woodland.webp`}
              alt={`tenue forestière d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-desert.webp`}
              alt={`tenue desertique d(e)'${outfit}`}
            />
          </div>
        </div>
      );
      break;
    case "éclaireur":
      img = (
        <div className={`outfit-img-container`}>
          <div
            className={`outfit-img-slider ${departmentOutfits} ${camoActive}`}
          >
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-urban.webp`}
              alt={`tenue d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-arctic.webp`}
              alt={`tenue arctique d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-woodland.webp`}
              alt={`tenue forestière d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-desert.webp`}
              alt={`tenue desertique d(e)'${outfit}`}
            />
          </div>
        </div>
      );
      break;
    case "tireur-longue-distance":
      img = (
        <div className={`outfit-img-container`}>
          <div
            className={`outfit-img-slider ${departmentOutfits} ${camoActive}`}
          >
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-urban.webp`}
              alt={`tenue d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-arctic.webp`}
              alt={`tenue arctique d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-woodland.webp`}
              alt={`tenue forestière d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-desert.webp`}
              alt={`tenue desertique d(e)'${outfit}`}
            />
          </div>
        </div>
      );
      break;
    case "mitrailleur":
      img = (
        <div className={`outfit-img-container`}>
          <div
            className={`outfit-img-slider ${departmentOutfits} ${camoActive}`}
          >
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-urban.webp`}
              alt={`tenue d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-arctic.webp`}
              alt={`tenue arctique d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-woodland.webp`}
              alt={`tenue forestière d(e)'${outfit}`}
            />
            <img
              src={`./assets/img/departments/military-outfits/${outfit}-desert.webp`}
              alt={`tenue desertique d(e)'${outfit}`}
            />
          </div>
        </div>
      );
      break;

    // LOGISTICS
    case "officier-support":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "ingenieur":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    case "transporteur":
      img = (
        <div className={`outfit-img-container ${departmentOutfits}`}>
          <img
            src={`./assets/img/departments/military-outfits/${outfit}.webp`}
            alt={`tenue d(e)'${outfit}`}
          />
        </div>
      );
      break;
    default:
  }

  return (
    <div
      className="military-outfit-card"
      onClick={() => setIsActive(!isActive)}
    >
      <h4>{outfit}</h4>
      {img}
      <MilitaryOutfitsCardsDescription
        outfit={outfit}
        isActive={isActive}
        camoActive={camoActive}
      />
    </div>
  );
};

export default MilitaryOutfitsCards;
