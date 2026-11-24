import {doc, getDoc, updateDoc} from "firebase/firestore";
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../utils/firebase.config";
import {setShipOwnerDatas} from "../../feature/userPrivateRoom.slice";
import {setJobSelectionActive} from "../../feature/window.slice";

const JobSelectionPanel = ({ownedShipDatas}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const actualShipSelected = useSelector(
    (state) => state.sharedShips.actualShipSelected
  );
  const job = useRef();
  const ownerShipDatas = useSelector(
    (state) => state.userPrivateRoom.ownerShipDatas
  );

  useEffect(() => {
    getDoc(doc(db, "users", actualShipSelected.ownerId)).then((res) =>
      dispatch(setShipOwnerDatas({...res.data()}))
    );
  }, []);

  const handleAddCrewMemberPostulant = async (e) => {
    e.preventDefault();

    const crewMemberPostulants = actualShipSelected.crewMemberPostulants;

    const postulantData = {
      createdAt: Date.now(),
      pseudo: user.currentUser,
      photo: user.photo,
      userId: user.userId,
      factionPart: user.factionPart,
      factionRank: user.factionRank,
      job: job.current.value,
      shipDesired: actualShipSelected.id,
      notificationId: Date.now() + Math.random(),
    };

    await updateDoc(doc(db, "shipsAndCrews", actualShipSelected?.id), {
      crewMemberPostulants: [...crewMemberPostulants, postulantData],
    });

    const actualShipSelectedOwnerNotifications = ownerShipDatas?.notifications;

    const notificationDatas = {
      pseudo: user.currentUser,
      shipDesiredFleet: actualShipSelected.fleet,
      shipDesiredName: actualShipSelected.shipName,
      createdAt: postulantData.createdAt,
      job: postulantData.job,
      type: "postulat pour un vaisseau",
      associatedPostulate: postulantData.notificationId,
    };

    await updateDoc(doc(db, "users", user.userId), {
      postulant: "oui",
    });
    await updateDoc(doc(db, "users", actualShipSelected.ownerId), {
      notifications: [
        ...actualShipSelectedOwnerNotifications,
        notificationDatas,
      ],
    });
  };

  if (ownedShipDatas.id === actualShipSelected.id) {
    return (
      <div className="user-search-panel-body">
        <div className="user-search-panel-drop-filter">
          <h2>Selectionner un poste</h2>
          <h3>
            Vaisseau selectionné:
            <span>
              {ownedShipDatas.fleet} {ownedShipDatas.shipName}
            </span>
          </h3>
          <h3>
            Nom:
            <span>{user.currentUser}</span>
          </h3>
          <h3>
            Grade:
            <span>{user.factionRank}</span>
          </h3>
          <div className="user-search-panel-user-list-container">
            <div className="user-search-panel-user-container"></div>
          </div>
          <div className="crew-member-search-panel-job-selector">
            {ownedShipDatas.ship.maxCrew <= 1 ? (
              <select ref={job}>
                <option value="">Selection...</option>
                <option value="pilote">Pilote</option>
              </select>
            ) : (
              <select ref={job}>
                <option value="">Selection...</option>
                <option value="commandant">Commandant</option>
                <option value="commandant en second">
                  Commandant en second
                </option>
                <option value="pilote">Pilote</option>
                <option value="Medecin Chef de bord">
                  Medecin Chef de bord
                </option>
                <option value="Medecin de bord">Medecin de bord</option>
                <option value="Medecin urgentiste">Medecin urgentiste</option>
                <option value="Chef artilleur">Chef artilleur</option>
                <option value="Artilleur">Artilleur</option>
                <option value="Chef ingénieur">Chef ingénieur</option>
                <option value="Ingénieur">Ingénieur</option>
                <option value="Chef d'escadrille">Chef d'escadrille</option>
                <option value="Ailier">Ailier</option>
                <option value="Responsable matériel">
                  Responsable matériel
                </option>
                <option value="Manutentionnaire">Manutentionnaire</option>
              </select>
            )}

            <button
              type="submit"
              onClick={(e) =>
                { handleAddCrewMemberPostulant(e); dispatch(setJobSelectionActive(false)); }
              }
            >
              Valider le choix
            </button>
          </div>

          <button
            className="user-search-panel-user-container-cancel-button"
            type="submit"
            onClick={() => dispatch(setJobSelectionActive(false))}
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }
};

export default JobSelectionPanel;
