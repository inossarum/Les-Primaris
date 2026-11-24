import {Delete} from "@mui/icons-material";
import {deleteDoc, doc} from "firebase/firestore";
import React from "react";
import {db} from "../../../../utils/firebase.config";
import {useSelector} from "react-redux";

const MilitaryPromotionCard = ({promotion}) => {
  const actualUser = useSelector((state) => state.user);
  let militaryPromotionCard = "";

  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleDeleteMessage = async (e) => {
    e.preventDefault();

    await deleteDoc(doc(db, "militaryPromotions", promotion.id));
  };

  switch (promotion?.type) {
    case "promotion":
      militaryPromotionCard = (
        <div className="military-promotion-card-body">
          <div className="military-promotion-card-header">
            <span className="info-green-uppercase">Nouvelle Promotion</span>
            {actualUser?.webSiteRole === "administrateur" ||
            actualUser?.webSiteRole === "moderateur" ? (
              <Delete onClick={(e) => handleDeleteMessage(e)} />
            ) : (
              ""
            )}
          </div>
          <div className="military-promotion-card-container">
            <span>
              le{" "}
              <span className="info-yellow-capitalize">
                {promotion?.actualFactionRank}
              </span>{" "}
              <span className="info-blue">
                {promotion.RPName} ({promotion.pseudo})
              </span>{" "}
              a été promu au grade de{" "}
              <span className="info-green-capitalize">
                {promotion?.newFactionRank}
              </span>{" "}
              le{" "}
              <span className="info-violet">
                {dateFormater(promotion?.promotedAt)}
              </span>
            </span>
          </div>
        </div>
      );
      break;
    case "demotion":
      militaryPromotionCard = (
        <div className="military-promotion-card-body">
          <div className="military-promotion-card-header">
            <span className="info-red-uppercase">Nouvelle rétrogradation</span>
            {actualUser?.webSiteRole === "administrateur" ||
            actualUser?.webSiteRole === "moderateur" ? (
              <Delete onClick={(e) => handleDeleteMessage(e)} />
            ) : (
              ""
            )}
          </div>
          <div className="military-promotion-card-container">
            <span>
              le{" "}
              <span className="info-yellow-capitalize">
                {promotion?.actualFactionRank}
              </span>{" "}
              <span className="info-blue">
                {promotion.RPName} ({promotion.pseudo})
              </span>{" "}
              a été rétrogradé au grade de{" "}
              <span className="info-orange-capitalize">
                {promotion?.newFactionRank}
              </span>{" "}
              le{" "}
              <span className="info-violet">
                {dateFormater(promotion?.promotedAt)}
              </span>
            </span>
          </div>
        </div>
      );
      break;
    default:
  }

  return <>{militaryPromotionCard}</>;
};

export default MilitaryPromotionCard;
