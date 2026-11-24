import {deleteObject, ref} from "firebase/storage";
import React, {useState} from "react";
import {db, storage} from "../../../../../utils/firebase.config";
import {deleteDoc, doc} from "firebase/firestore";
import {useSelector} from "react-redux";

const ExplorationDepartmentLocationCard = ({location}) => {
  const actualUser = useSelector((state) => state.user);
  const [isOpened, setIsOpened] = useState(false);
  const locationImages = Array.isArray(location?.images)
    ? location.images
    : [];
  const canDeleteLocation =
    ["administrateur", "moderateur"].includes(actualUser.webSiteRole) ||
    actualUser.userId === location?.creatorId;

  const handleDeleteLocationCard = async (e) => {
    e.preventDefault();
    if (!location?.id || !canDeleteLocation) return;
    if (!window.confirm("Supprimer ce point d’intérêt et ses images ?")) return;

    try {
      await Promise.all(
        locationImages
          .filter((image) => image?.storageRef)
          .map(async (image) => {
            try {
              await deleteObject(ref(storage, image.storageRef));
            } catch (error) {
              if (error?.code !== "storage/object-not-found") throw error;
            }
          })
      );
      await deleteDoc(doc(db, "explorationLocations", location.id));
    } catch (error) {
      console.error("Échec de la suppression du point d’intérêt :", error);
      window.alert(
        "Le point d’intérêt ou l’une de ses images n’a pas pu être supprimé."
      );
    }
  };

  return (
    <>
      {isOpened ? (
        <div className="exploration-department-location-card-body card-opened">
          <div className="exploration-department-location-card-buttons-container">
            <span
              className="primaris-ingame-shop-new-product-form-button-exploration"
              onClick={() => setIsOpened(false)}
            >
              fermer
            </span>
            {canDeleteLocation ? (
              <span
                className="primaris-ingame-shop-new-product-form-button-red"
                onClick={(e) => handleDeleteLocationCard(e)}
              >
                supprimer
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="exploration-department-location-card-header">
            <span className="exploration-department-location-card-container-title">
              Localisation
            </span>
            <div className="exploration-department-location-card-header-sub-container">
              <div className="exploration-department-location-card-header-detail-container">
                <span className="label">Nom:</span>
                <span className="info-blue-capitalize">{location?.name}</span>
              </div>
              <div className="exploration-department-location-card-header-detail-container">
                <span className="label">Emplacement:</span>
                <span className="info-blue-capitalize">
                  {location?.celestialObject}
                </span>
              </div>
            </div>
          </div>

          <div className="exploration-department-location-card-coordonates-container">
            <span className="exploration-department-location-card-container-title">
              coordonnées
            </span>
            <div className="exploration-department-location-card-coordonates-sub-container">
              {location?.coordonate1 ? (
                <div className="exploration-department-location-card-coordonates-detail-container">
                  <span className="label">Coordonnées 1:</span>
                  <span className="info-yellow">{location?.coordonate1}</span>
                </div>
              ) : (
                ""
              )}
              {location?.coordonate2 ? (
                <div className="exploration-department-location-card-coordonates-detail-container">
                  <span className="label">Coordonnées 2:</span>
                  <span className="info-yellow">{location?.coordonate2}</span>
                </div>
              ) : (
                ""
              )}
              {location?.coordonate3 ? (
                <div className="exploration-department-location-card-coordonates-detail-container">
                  <span className="label">Coordonnées 3:</span>
                  <span className="info-yellow">{location?.coordonate3}</span>
                </div>
              ) : (
                ""
              )}
              {location?.coordonate4 ? (
                <div className="exploration-department-location-card-coordonates-detail-container">
                  <span className="label">Coordonnées 4:</span>
                  <span className="info-yellow">{location?.coordonate4}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="exploration-department-location-card-images-container">
            <span className="exploration-department-location-card-container-title">
              Images
            </span>
            <div className="exploration-department-location-card-images-wrapper-sub-container">
              {locationImages.map((image) => (
                <div
                  className="exploration-department-location-card-images-sub-container"
                  key={image.storageRef || image.URL}
                >
                  <img
                    src={image.URL}
                    alt={image.name || "Image du point d’intérêt"}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="exploration-department-location-card-description-container">
            <span className="exploration-department-location-card-container-title">
              Description
            </span>

            <span className="exploration-department-location-card-description">
              {location?.description}
            </span>
          </div>
        </div>
      ) : (
        <div className="exploration-department-location-card-body card-retracted">
          <div className="exploration-department-location-card-header">
            <div className="exploration-department-location-card-header-sub-container">
              <span className="label">Nom:</span>
              <span className="info-blue">{location?.name}</span>
            </div>
            <div className="exploration-department-location-card-header-sub-container">
              <span className="label">Emplacement:</span>
              <span className="info-blue-capitalize">
                {location?.celestialObject}
              </span>
            </div>
          </div>
          <div className="exploration-department-location-card-header-buttons-sub-container">
            {canDeleteLocation ? (
              <span
                className="primaris-ingame-shop-new-product-form-button-red"
                onClick={(e) => handleDeleteLocationCard(e)}
              >
                supprimer
              </span>
            ) : (
              ""
            )}
            <span
              className="primaris-ingame-shop-new-product-form-button-exploration"
              onClick={() => setIsOpened(true)}
            >
              ouvrir
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ExplorationDepartmentLocationCard;
