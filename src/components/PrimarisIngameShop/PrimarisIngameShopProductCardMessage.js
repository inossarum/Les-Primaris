import {Delete} from "@mui/icons-material";
import {doc, updateDoc} from "firebase/firestore";
import React from "react";
import {db} from "../../utils/firebase.config";
import {useSelector} from "react-redux";

const PrimarisIngameShopProductCardMessage = ({message, product}) => {
  const currentUser = useSelector((state) => state.user);
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

    const messagesAfterDelete = product.messages.filter(
      (productMessage) =>
        message.messageCreatedAt !== productMessage.messageCreatedAt
    );

    updateDoc(doc(db, "primarisIngameShop", product.id), {
      messages: messagesAfterDelete,
    });
  };

  return (
    <div className="primaris-ingame-shop-product-card-message-body">
      <div className="primaris-ingame-shop-product-card-message-header">
        <div>
          <span className="primaris-ingame-shop-product-card-message-author">
            {message?.messageAuthor}
          </span>{" "}
          <span className="primaris-ingame-shop-product-card-message-date">
            {dateFormater(message?.messageCreatedAt)}
          </span>
        </div>
        {message?.messageAuthorId === currentUser.userId ||
        currentUser.webSiteRole === "administrateur" ||
        currentUser.webSiteRole === "moderateur" ? (
          <div>
            <Delete onClick={(e) => handleDeleteMessage(e)} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="primaris-ingame-shop-product-card-message-content">
        <span className="info-green">{message?.messageContent}</span>
      </div>
    </div>
  );
};

export default PrimarisIngameShopProductCardMessage;
