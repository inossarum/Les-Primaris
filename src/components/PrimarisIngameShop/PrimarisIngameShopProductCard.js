import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {db} from "../../utils/firebase.config";
import PrimarisIngameShopProductCardMessage from "./PrimarisIngameShopProductCardMessage";
import {Delete} from "@mui/icons-material";

const PrimarisIngameShopProductCard = ({product}) => {
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isWritingMessage, setIsWritingMessage] = useState(false);
  const announcementMessage = useRef();

  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleDeleteProduct = (e) => {
    e.preventDefault();

    users &&
      [...users].map((user) => {
        const userNotificationsAfterRemoval = user.notifications.filter(
          (notification) =>
            notification.associatedAnnouncement !== product.notificationId
        );

        updateDoc(doc(db, "users", user.id), {
          notifications: userNotificationsAfterRemoval,
        });
      });

    deleteDoc(doc(db, "primarisIngameShop", product.id));
  };

  const handleRemoveAssociatedNotification = async (e) => {
    e.preventDefault();
    const userNotificationsAfterRemoval = currentUser.notifications.filter(
      (notification) =>
        notification.associatedAnnouncement !== product?.notificationId
    );

    await updateDoc(doc(db, "users", currentUser.userId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  const handleMessageSending = async (e) => {
    e.preventDefault();

    const messageDatas = {
      messageCreatedAt: Date.now(),
      messageAuthor: currentUser.currentUser,
      messageAuthorId: currentUser.userId,
      messageContent: announcementMessage.current.value,
      notificationId: Math.random(Date.now()),
    };

    const productMessages = product?.messages;

    if (messageDatas.messageContent !== "") {
      await updateDoc(doc(db, "primarisIngameShop", product.id), {
        messages: [...productMessages, messageDatas],
      });
    } else {
      console.log("veuillez entre un message");
    }

    setIsWritingMessage(false);
  };

  if (isCollapsed === true) {
    return (
      <div className="primaris-ingame-shop-product-card-body">
        <div className="primaris-ingame-shop-product-card-header">
          <div>
            <span>Vendeur: </span>
            <span className="info-red">{product?.announcementCreatorName}</span>
          </div>

          <div>
            <span>Postée le: </span>
            <span className="info-orange">
              {dateFormater(product?.announcementCreatedAt)}
            </span>
          </div>
        </div>
        <div className="primaris-ingame-shop-product-card-main-container">
          {" "}
          <div className="primaris-ingame-shop-product-card-sub-container-name">
            <span>Objet vendu: </span>
            <span className="info-blue">{product?.productName}</span>
          </div>
          <span className="primaris-ingame-shop-product-card-sub-container-separator"></span>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Categorie: </span>
            <span className="info-orange-uppercase">
              {product?.productCategory}
            </span>
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Sous-Categorie: </span>
            <span className="info-yellow-uppercase">
              {product?.productSubCategory}
            </span>
          </div>
          <span className="primaris-ingame-shop-product-card-sub-container-separator"></span>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Lieu de vente: </span>
            <span className="info-white-capitalize">
              {product?.productLocation}
            </span>
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Livraison possible: </span>
            {product?.deliveryAvailable === "oui" ? (
              <span className="info-green-uppercase">
                {product?.deliveryAvailable}
              </span>
            ) : (
              <span className="info-red-uppercase">
                {product?.deliveryAvailable}
              </span>
            )}
          </div>
          <span className="primaris-ingame-shop-product-card-sub-container-separator"></span>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Quantité: </span>
            <span className="info-green-capitalize">
              {product?.productQuantity.toLocaleString("fr-FR")}
            </span>{" "}
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Prix à l'unité: </span>
            <span className="info-green">
              {Number(product?.productSellingPrice).toLocaleString("fr-FR")}{" "}
              aUEC
            </span>{" "}
          </div>
          <span className="primaris-ingame-shop-product-card-sub-container-separator"></span>
          <div className="primaris-ingame-shop-product-card-description-container">
            <span>Description: </span>
            <span className="info-white">
              {product?.productDescription}
            </span>{" "}
          </div>
          {product?.messages && product?.messages[0] ? (
            <div className="primaris-ingame-shop-product-card-messages-container">
              {product?.messages &&
                [...product?.messages]
                  .sort((a, b) => a.messageCreatedAt - b.messageCreatedAt)
                  .map((message) => (
                    <PrimarisIngameShopProductCardMessage
                      key={message?.messageCreatedAt}
                      message={message}
                      product={product}
                    />
                  ))}
            </div>
          ) : (
            ""
          )}
          <div className="primaris-ingame-shop-product-card-main-button-container">
            {isWritingMessage ? (
              <>
                <textarea
                  autoFocus
                  className="info-green"
                  ref={announcementMessage}
                ></textarea>
                <span
                  className="primaris-ingame-shop-new-product-form-button-green"
                  onClick={(e) => handleMessageSending(e)}
                >
                  Valider
                </span>
                <span
                  className="primaris-ingame-shop-new-product-form-button-red"
                  onClick={() => setIsWritingMessage(false)}
                >
                  Annuler
                </span>
              </>
            ) : (
              <span
                className="primaris-ingame-shop-new-product-form-button-green"
                onClick={() => setIsWritingMessage(true)}
              >
                Envoyer un message
              </span>
            )}
            <span
              className="primaris-ingame-shop-new-product-form-button-blue"
              onClick={() => setIsCollapsed(false)}
            >
              Réduire
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="primaris-ingame-shop-product-card-line">
        <div
          className="primaris-ingame-shop-product-card-body-reduced"
          onClick={(e) =>
            handleRemoveAssociatedNotification(e) & setIsCollapsed(true)
          }
        >
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Vendeur: </span>
            <span className="info-red">{product?.announcementCreatorName}</span>
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Postée le: </span>
            <span className="info-orange">
              {dateFormater(product?.announcementCreatedAt)}
            </span>
          </div>{" "}
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Objet vendu: </span>
            <span className="info-blue">{product?.productName}</span>
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Lieu de vente: </span>
            <span className="info-white-capitalize">
              {product?.productLocation}
            </span>
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Quantité: </span>
            <span className="info-green-capitalize">
              {product?.productQuantity.toLocaleString("fr-FR")}
            </span>{" "}
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            <span>Prix à l'unité: </span>
            <span className="info-green">
              {Number(product?.productSellingPrice).toLocaleString("fr-FR")}{" "}
              aUEC
            </span>{" "}
          </div>
          <div className="primaris-ingame-shop-product-card-sub-container">
            {[...currentUser?.notifications].find(
              (notification) =>
                notification?.associatedAnnouncement === product?.notificationId
            ) ? (
              <div className="new-event">Nouveau</div>
            ) : (
              ""
            )}
          </div>
        </div>
        {product?.announcementCreatorId === currentUser.userId ||
        currentUser.webSiteRole === "administrateur" ||
        currentUser.webSiteRole === "moderateur" ? (
          <span
            className="primaris-ingame-shop-new-product-form-button-red"
            onClick={(e) => setIsCollapsed(false) & handleDeleteProduct(e)}
          >
            <Delete />
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }
};

export default PrimarisIngameShopProductCard;
