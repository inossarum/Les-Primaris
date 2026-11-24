import React from "react";
import {NavLink} from "react-router-dom";

const Notification = ({notification}) => {
  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  let className = "";
  switch (notification.missionType) {
    case "mission officielle":
      className = "info-red-uppercase";
      break;
    case "entrainement":
      className = "info-blue-uppercase";
      break;
    case "sortie détente":
      className = "info-green-uppercase";
      break;
    default:
  }

  if (notification?.type === "postulat pour un vaisseau") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          <span className="info-green">{notification?.pseudo}</span> à postulé
          pour rejoindre le vaisseau suivant:{" "}
          <span className="info-blue">{notification?.shipDesiredFleet}</span>{" "}
          <span className="info-blue">{notification?.shipDesiredName}</span> le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.createdAt)}
          </span>{" "}
          en tant que{" "}
          <span className="info-red-uppercase">{notification?.job}</span>
        </p>
        <NavLink className="notification-nav-link" to={`/userHangar`}>
          Hangar
        </NavLink>
        <NavLink className="notification-nav-link" to={`/militaryCrew`}>
          Equipages Militaires
        </NavLink>
      </div>
    );
  } else if (notification?.type === "commentaire à un post") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          <span className="info-green">{notification?.commentAuthor}</span> à
          répondu "
          <span className="info-red">{notification?.commentContent}</span>" au
          post suivant: "
          <span className="info-blue">{notification?.postContent}</span>" le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.createdAt)}
          </span>
        </p>
        <NavLink
          className="notification-nav-link"
          to={`/socialNetwork#${notification.postId}`}
        >
          Centre de communication Primaris
        </NavLink>
      </div>
    );
  } else if (notification?.type === "nouveau post") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          <span className="info-green">{notification?.postAuthor}</span> à
          écrit: "<span className="info-red">{notification?.postContent}</span>"{" "}
          <span className="info-yellow">
            le {dateFormater(notification?.createdAt)}
          </span>
        </p>
        <NavLink className="notification-nav-link" to={`/socialNetwork`}>
          Centre de communication Primaris
        </NavLink>
      </div>
    );
  } else if (notification?.type === "evenement militaire") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          Nouvel(le){" "}
          <span className={className}>{notification?.missionType}</span>{" "}
          organisé par:{" "}
          <span className="info-green">{notification?.creator}</span> le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.eventDate)}
          </span>
        </p>
        <NavLink
          className="notification-nav-link"
          to={`/militaryBulletinBoard`}
        >
          Tableau d'affichage militaire
        </NavLink>
      </div>
    );
  } else if (notification?.type === "evenement civil") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          Nouvel(le){" "}
          <span className={className}>{notification?.eventType}</span> organisé
          par: <span className="info-green">{notification?.creator}</span> le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.eventDate)}
          </span>
        </p>
        <NavLink
          className="notification-nav-link"
          to={`/civilianBulletinBoard`}
        >
          Tableau d'affichage civil
        </NavLink>
      </div>
    );
  } else if (notification?.type === "nouveau vaisseau civil partagé") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          Nouveau vaisseau civil{" "}
          <span className="info-red">{notification?.shipName}</span> partagé
          par: <span className="info-green">{notification?.shipOwner}</span> le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.createdAt)}
          </span>
        </p>
        <NavLink className="notification-nav-link" to={`/civilianCrew`}>
          Equipages civils
        </NavLink>
      </div>
    );
  } else if (notification?.type === "nouveau vaisseau militaire partagé") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          Nouveau vaisseau militaire{" "}
          <span className="info-red">{notification?.shipName}</span> partagé
          par: <span className="info-green">{notification?.shipOwner}</span> le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.createdAt)}
          </span>
        </p>
        <NavLink className="notification-nav-link" to={`/militaryCrew`}>
          Equipages militaires
        </NavLink>
      </div>
    );
  } else if (notification?.type === "nouveau sujet modérateur") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          <span className="info-green">{notification?.threadAuthor}</span> à
          publié un nouveau sujet: "
          <span className="info-red">{notification?.threadSubject}</span>" dans
          le forum des modérateurs le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.createdAt)}
          </span>
        </p>
        <NavLink
          className="notification-nav-link"
          to={`/administrationPrivateMessagingServices`}
        >
          Forum des modérateurs
        </NavLink>
      </div>
    );
  } else if (notification?.type === "nouvelle réponse à un sujet modérateur") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          <span className="info-green">{notification?.responseAuthor}</span> à
          publié une réponse au sujet suivant: "
          <span className="info-red">{notification?.threadSubject}</span>" dans
          le forum des modérateurs le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.createdAt)}
          </span>
        </p>
        <NavLink
          className="notification-nav-link"
          to={`/administrationPrivateMessagingServices`}
        >
          Forum des modérateurs
        </NavLink>
      </div>
    );
  } else if (notification?.type === "nouvelle annonce de vente") {
    return (
      <div className="notification-body">
        <p className="notification-content">
          {" "}
          <span className="info-green">
            {notification?.announcementCreatorName}
          </span>{" "}
          à mis en vente{" "}
          <span className="info-violet">{notification?.productQuantity}</span>{" "}
          <span className="info-red">{notification?.productSubCategory}</span>{" "}
          <span className="info-orange">({notification?.productName})</span>{" "}
          {""}
          dans la boutique Primaris le{" "}
          <span className="info-yellow">
            {dateFormater(notification?.createdAt)}
          </span>
        </p>
        <NavLink className="notification-nav-link" to={`/primarisIngameShop`}>
          Boutique Primaris
        </NavLink>
      </div>
    );
  }
};

export default Notification;
