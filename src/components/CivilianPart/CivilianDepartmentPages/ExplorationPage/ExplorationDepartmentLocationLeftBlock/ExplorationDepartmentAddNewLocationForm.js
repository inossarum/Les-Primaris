import {addDoc, collection} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {db, storage} from "../../../../../utils/firebase.config";
import {
  removeDepartmentScreensToDownload,
  resetDepartmentScreensToDownload,
  setDepartmentDisplayedBlock,
  setDepartmentScreensToDownload,
} from "../../../../../feature/departmentPages.slice";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {Photo} from "@mui/icons-material";

const ExplorationDepartmentAddNewLocationForm = () => {
  const dispatch = useDispatch();
  const actualUser = useSelector((state) => state.user);

  const imagesToDownload = useSelector(
    (state) => state.departmentPages.departmentScreensToDownload
  );

  const [fileWeightTooHeavyMessage, setFileWeightTooHeavyMessage] =
    useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const locationName = useRef();
  const locationCelestialObject = useRef();
  const coordonate1 = useRef();
  const coordonate2 = useRef();
  const coordonate3 = useRef();
  const coordonate4 = useRef();
  const locationDescription = useRef();
  const locationScreenshots = useRef();

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 10000000) {
      setFileWeightTooHeavyMessage("Choisissez une image de 10 Mo maximum.");
      setTimeout(() => setFileWeightTooHeavyMessage(""), 5000);
      e.target.value = "";
      return;
    }

    const storagePath = `images/explorationDepartmentLocations/${Date.now()}-${file.name}`;
    try {
      const snapshot = await uploadBytes(ref(storage, storagePath), file);
      const url = await getDownloadURL(snapshot.ref);
      dispatch(setDepartmentScreensToDownload({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        URL: url,
        storageRef: storagePath,
      }));
      setFileWeightTooHeavyMessage("");
    } catch (error) {
      console.error("Échec du téléversement de l’image :", error);
      setFileWeightTooHeavyMessage("L’image n’a pas pu être téléversée. Réessayez.");
    } finally {
      e.target.value = "";
    }
  };

  const handleDeleteImageRef = async (image) => {
    try {
      if (image.storageRef) await deleteObject(ref(storage, image.storageRef));
      dispatch(removeDepartmentScreensToDownload(image.URL));
    } catch (error) {
      console.error("Échec de la suppression de l’image :", error);
      setFileWeightTooHeavyMessage("L’image n’a pas pu être supprimée.");
    }
  };

  const handleCancel = async () => {
    await Promise.allSettled(
      (imagesToDownload || [])
        .filter((image) => image.storageRef)
        .map((image) => deleteObject(ref(storage, image.storageRef)))
    );
    dispatch(resetDepartmentScreensToDownload());
    dispatch(setDepartmentDisplayedBlock("left"));
  };

  const handleAddNewLocation = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    if (!actualUser?.userId) {
      setFormError("Connectez-vous pour ajouter un point d’intérêt.");
      return;
    }

    const locationDatas = {
      creator: actualUser.currentUser || "",
      creatorId: actualUser.userId,
      name: locationName.current?.value.trim() || "",
      celestialObject: locationCelestialObject.current?.value.trim() || "",
      coordonate1: coordonate1.current?.value.trim() || "",
      coordonate2: coordonate2.current?.value.trim() || "",
      coordonate3: coordonate3.current?.value.trim() || "",
      coordonate4: coordonate4.current?.value.trim() || "",
      description: locationDescription.current?.value.trim() || "",
      images: imagesToDownload || [],
    };

    if (!locationDatas.name || !locationDatas.celestialObject || !locationDatas.coordonate1) {
      setFormError("Le nom, l’emplacement et la première coordonnée sont requis.");
      return;
    }

    setIsSaving(true);
    setFormError("");
    try {
      await addDoc(collection(db, "explorationLocations"), locationDatas);
      dispatch(resetDepartmentScreensToDownload());
      dispatch(setDepartmentDisplayedBlock("left"));
    } catch (error) {
      console.error("Échec de la création du point d’intérêt :", error);
      setFormError("Le point d’intérêt n’a pas pu être enregistré. Réessayez.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="exploration-department-add-location-form-body">
      <div className="exploration-department-add-location-form-header">
        <span
          className="primaris-ingame-shop-new-product-form-button-exploration"
          onClick={() => void handleCancel()}
        >
          Annuler
        </span>
        <div className="exploration-department-add-location-form-header-location-name">
          <div className="exploration-department-add-location-form-header-sub-container">
            <label htmlFor="location-name">Nom du point d'intérêt</label>
            <input
              ref={locationName}
              id="location-name"
              type="text"
              placeholder="Caverne de sable"
            />
          </div>
          <div className="exploration-department-add-location-form-header-sub-container">
            <label htmlFor="location-name">Emplacement</label>
            <input
              ref={locationCelestialObject}
              id="location-celestial-object-name"
              type="text"
              placeholder="ex: Huston, CRU-L1 "
            />
          </div>
        </div>
        <div className="exploration-department-add-location-form-header-coordonate-container">
          <div className="exploration-department-add-location-form-header-sub-container">
            <label htmlFor="first-coordonate">Coordonnées 1</label>
            <input
              ref={coordonate1}
              id="first-coordonate"
              type="text"
              placeholder="ex: 24km HDMS-EDMOND"
            />
          </div>
          <div className="exploration-department-add-location-form-header-sub-container">
            <label htmlFor="first-coordonate">Coordonnées 2</label>
            <input
              ref={coordonate2}
              id="second-coordonate"
              type="text"
              placeholder="ex: 415km HDMS-Hadley"
            />
          </div>
          <div className="exploration-department-add-location-form-header-sub-container">
            <label htmlFor="first-coordonate">Coordonnées 3</label>
            <input
              ref={coordonate3}
              id="third-coordonate"
              type="text"
              placeholder="ex: 256km HDMS-Lathan"
            />
          </div>
          <div className="exploration-department-add-location-form-header-sub-container">
            <label htmlFor="first-coordonate">Coordonnées 4</label>
            <input
              ref={coordonate4}
              id="fourth-coordonate"
              type="text"
              placeholder="ex: 527km HDMS-Oparei"
            />
          </div>
        </div>
      </div>
      <div className="exploration-department-add-location-form-header-main-container">
        <span className="label">Décrivez l'emplacement</span>
        <textarea
          ref={locationDescription}
          placeholder="ex: Caverne sableuse contenant des pirates, ainsi que de nombreux gisement de Laranite minables à la main"
        ></textarea>
      </div>

      <div className="exploration-department-add-location-form-header-picture-selector-container">
        <span className="label">Ajouter des images</span>
        <div className="exploration-department-add-location-form-header-picture-displayer">
          <div className="exploration-department-add-location-form-header-picture-selector-header">
            <input
              type="file"
              ref={locationScreenshots}
              hidden
              accept="image/png,image/webp,image/jpeg"
              onChange={handleImageChange}
            />
            <Photo onClick={(e) => locationScreenshots.current.click(e)} />
            <span className="info-red-uppercase">
              {fileWeightTooHeavyMessage}
            </span>
          </div>
          <div className="exploration-department-add-location-form-header-picture-selector-preview">
            {imagesToDownload && [
              ...imagesToDownload.map((image) => (
                <img
                  src={image.URL}
                  alt={image.name || "Image du lieu"}
                  key={image.URL}
                  onClick={() => void handleDeleteImageRef(image)}
                />
              )),
            ]}
          </div>
        </div>
      </div>
      {formError && <p role="alert">{formError}</p>}
      <button
        className="primaris-ingame-shop-new-product-form-button-exploration"
        type="button"
        disabled={isSaving}
        onClick={(e) => void handleAddNewLocation(e)}
      >
        {isSaving ? "Enregistrement…" : "Valider le point d'intérêt"}
      </button>
    </div>
  );
};

export default ExplorationDepartmentAddNewLocationForm;
