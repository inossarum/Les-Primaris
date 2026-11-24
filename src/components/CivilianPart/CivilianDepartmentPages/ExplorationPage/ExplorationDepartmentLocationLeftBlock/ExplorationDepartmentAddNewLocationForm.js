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

  const [imagesAdded, setImagesAdded] = useState([]);
  const locationName = useRef();
  const locationCelestialObject = useRef();
  const coordonate1 = useRef();
  const coordonate2 = useRef();
  const coordonate3 = useRef();
  const coordonate4 = useRef();
  const locationDescription = useRef();
  const locationScreenshots = useRef();

  const handleAddImage = (e) => {
    e.preventDefault();

    if (
      locationScreenshots.current.files[0].name !== undefined &&
      locationScreenshots.current.files[0].size <= 10000000
    ) {
      setImagesAdded([...imagesAdded, locationScreenshots.current.files[0]]);
    } else {
      setFileWeightTooHeavyMessage(
        "La taille maximale de l'image ne doit pas dépasser 10 Mo"
      );
      setTimeout(() => setFileWeightTooHeavyMessage(""), 5000);
    }
  };

  const handleDeleteImageRef = (e, image) => {
    setImagesAdded(
      [...imagesAdded].filter((imageAdded) => image.name !== imageAdded.name)
    );
    deleteObject(ref(storage, image.storageRef));
    dispatch(removeDepartmentScreensToDownload(e.target.currentSrc));
  };

  const handleGetImagesUrl = async (e) => {
    const imageRef = ref(
      storage,
      `images/explorationDepartmentLocations/${e.target.files[0].name}`
    );

    const imagesDatas = {
      id: Math.random(Date.now()),
      name: e.target.files[0].name,
      URL: "",
      storageRef: `images/explorationDepartmentLocations/${e.target.files[0].name}`,
    };

    if (
      (e.target.files[0].name !== "" || e.target.files[0].name !== undefined) &&
      locationScreenshots.current.files[0].size <= 10000000
    ) {
      uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(
          (url) =>
            (imagesDatas.URL = url) &
            dispatch(setDepartmentScreensToDownload(imagesDatas))
        );
      });
    }
  };

  const handleAddNewLocation = async (e) => {
    e.preventDefault();

    const locationDatas = {
      creator: actualUser.currentUser,
      creatorId: actualUser.userId,
      name: locationName.current.value,
      celestialObject: locationCelestialObject.current.value,
      coordonate1: coordonate1.current.value,
      coordonate2: coordonate2.current.value,
      coordonate3: coordonate3.current.value,
      coordonate4: coordonate4.current.value,
      description: locationDescription.current.value,
      images: imagesToDownload,
    };

    if (
      locationDatas.name !== "" &&
      locationDatas.celestialObject !== "" &&
      locationDatas.coordonate1 !== ""
    ) {
      try {
        await addDoc(collection(db, "explorationLocations"), locationDatas);
      } catch (err) {
        console.log(err);
      }
      locationName.current.value = "";
      locationCelestialObject.current.value = "";
      coordonate1.current.value = "";
      coordonate2.current.value = "";
      coordonate3.current.value = "";
      coordonate4.current.value = "";
      locationDescription.current.value = "";
      dispatch(resetDepartmentScreensToDownload());
      dispatch(setDepartmentDisplayedBlock("left"));
    } else {
      console.log("remplir les champs");
    }
  };

  return (
    <div className="exploration-department-add-location-form-body">
      <div className="exploration-department-add-location-form-header">
        <span
          className="primaris-ingame-shop-new-product-form-button-exploration"
          onClick={() =>
            dispatch(setDepartmentDisplayedBlock("left")) &
            dispatch(resetDepartmentScreensToDownload())
          }
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
              accept=".png,.webp,.jpeg,.webp"
              onChange={(e) => handleAddImage(e) & handleGetImagesUrl(e)}
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
                  alt={image}
                  key={image.URL}
                  onClick={(e) => handleDeleteImageRef(e, image)}
                />
              )),
            ]}
          </div>
        </div>
      </div>
      <span
        className="primaris-ingame-shop-new-product-form-button-exploration"
        onClick={(e) => handleAddNewLocation(e)}
      >
        Valider le point d'intérêt
      </span>
    </div>
  );
};

export default ExplorationDepartmentAddNewLocationForm;
