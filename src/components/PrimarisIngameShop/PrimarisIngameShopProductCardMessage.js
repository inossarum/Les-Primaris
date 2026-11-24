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
    const canDelete =
      message?.messageAuthorId === currentUser.userId ||
      ["administrateur", "moderateur"].includes(currentUser.webSiteRole);
    if (!canDelete || !product?.id) return;

    const messages = Array.isArray(product.messages) ? product.messages : [];
    const messagesAfterDelete = messages.filter((productMessage) =>
      message?.messageId
        ? productMessage?.messageId !== message.messageId
        : productMessage !== message
    );

    try {
      await updateDoc(doc(db, "primarisIngameShop", product.id), {
        messages: messagesAfterDelete,
      });
    } catch (error) {
      console.error("Impossible de supprimer le message :", error);
    }
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
          <button
            className="primaris-ingame-shop-product-card-message-delete-button"
            type="button"
            aria-label="Supprimer le message"
            onClick={handleDeleteMessage}
          >
            <Delete />
          </button>
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
