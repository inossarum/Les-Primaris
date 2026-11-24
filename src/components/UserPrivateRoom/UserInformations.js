import React from "react";
import {useSelector} from "react-redux";
import RankImgSelector from "../RankImgSelector";
import EditDisplayName from "./EditDisplayName";
import EditEmail from "./EditEmail";
import ResetPassword from "./ResetPassword";
import EditRPName from "./EditRPName";

const UserInformations = () => {
  const factionPart = useSelector((state) => state.user.factionPart);
  const factionRank = useSelector((state) => state.user.factionRank);
  const webSiteRole = useSelector((state) => state.user.webSiteRole);

  return (
    <div className="user-informations-main-container">
      {/* ----------- Decoration ------------*/}
      <span className="block1"></span>
      <span className="block2"></span>
      {/* ----------- Decoration ------------*/}

      <div className="title-container">
        <h2 className="title">Informations du compte</h2>
      </div>
      <div className="general-infos-container">
        <div className="info-container">
          <h2 className="info-category">
            Votre Pseudo
            {/* ----------- Decoration ------------*/}
            <span className="block3"></span>
            <span className="block4"></span>
            {/* ----------- Decoration ------------*/}
          </h2>
          <EditDisplayName />
        </div>
        <div className="info-container">
          <h2 className="info-category">
            Votre Nom RP
            {/* ----------- Decoration ------------*/}
            <span className="block3"></span>
            <span className="block4"></span>
            {/* ----------- Decoration ------------*/}
          </h2>
          <EditRPName />
        </div>
        <div className="info-container">
          <h2 className="info-category">
            Adresse Email
            {/* ----------- Decoration ------------*/}
            <span className="block3"></span>
            <span className="block4"></span>
            {/* ----------- Decoration ------------*/}
          </h2>
          <EditEmail />
        </div>
        <div className="info-container">
          <h2 className="info-category">
            Mot de passe
            {/* ----------- Decoration ------------*/}
            <span className="block3"></span>
            <span className="block4"></span>
            {/* ----------- Decoration ------------*/}
          </h2>
          <ResetPassword />
        </div>
        <div className="info-container">
          <h2 className={`info-category-${factionPart} `}>
            Statut(s) administratif(s)
            {/* ----------- Decoration ------------*/}
            <span className="block3"></span>
            <span className={`block4 ${factionPart}`}></span>
            {/* ----------- Decoration ------------*/}
          </h2>
          <div className="info">
            <h3 className="faction-part">{factionPart ? factionPart : ""}</h3>
          </div>
        </div>
        <div className={`info-container`}>
          <h2 className={`info-category-${factionPart} `}>
            Rang occupé
            {/* ----------- Decoration ------------*/}
            <span className="block3"></span>
            <span className={`block4 ${factionPart}`}></span>
            {/* ----------- Decoration ------------*/}
          </h2>
          <div className="info">
            <h3 className="faction-rank">{factionRank ? factionRank : ""}</h3>
            <div className="img-wrapper">
              <RankImgSelector
                factionRank={factionRank}
                factionPart={factionPart}
              />
            </div>
          </div>
        </div>
        <div className="info-container">
          <h2 className={`info-category-${webSiteRole} `}>
            Role occupé sur le site web
            {/* ----------- Decoration ------------*/}
            <span className="block3"></span>
            <span className={`block4 ${webSiteRole}`}></span>
            {/* ----------- Decoration ------------*/}
          </h2>
          <div className="info">
            <h3 className="web-site-role">{webSiteRole ? webSiteRole : ""}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformations;
