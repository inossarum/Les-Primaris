import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../utils/firebase.config";
import {setSelectedShip} from "../../feature/userPrivateRoom.slice";

const CivilianShipInformationsForm = ({ship, shipFactionPart}) => {
  const [shared, setShared] = useState("non");
  const users = useSelector((state) => state.user.users);
  const department = useRef();
  const fleet = useRef();
  const shipName = useRef();
  const shipRole = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [shipNameErrorMessage, setShipNameErrorMessage] = useState("");
  const [departmentErrorMessage, setDepartmentErrorMessage] = useState("");
  const [actualDepartment, setActualDepartment] = useState("");

  const handleNewShipOwned = async (e) => {
    e.preventDefault();

    if (department?.current?.value !== "" && shipName?.current?.value !== "") {
      if (shared === "non") {
        const data = {
          owner: currentUser?.currentUser,
          ownerId: currentUser?.userId,
          ownerFactionRank: currentUser?.factionRank,
          ownerFactionPart: currentUser?.factionPart,
          ownerWebSiteRole: currentUser?.webSiteRole,
          ownerPhoto: currentUser?.photo,
          createdAt: Date.now(),
          crewMembers: [],
          shipName: shipName?.current?.value,
          ship: ship,
          shared: shared,
          factionPart: shipFactionPart,
        };

        await addDoc(collection(db, "shipsAndCrews"), data);
      }
      if (shared === "oui") {
        const data = {
          owner: currentUser?.currentUser,
          ownerId: currentUser?.userId,
          ownerFactionRank: currentUser?.factionRank,
          ownerFactionPart: currentUser?.factionPart,
          ownerWebSiteRole: currentUser?.webSiteRole,
          ownerPhoto: currentUser?.photo,
          createdAt: Date.now(),
          crewMembers: [],
          crewMemberPostulants: [],
          department: department?.current?.value,
          shipName: shipName?.current?.value,
          fleet: fleet?.current?.value,
          ship: ship,
          shipRole: shipRole.current.value,
          shared: shared,
          factionPart: shipFactionPart,
          notificationId: Date.now() + Math.random(),
        };

        await addDoc(collection(db, "shipsAndCrews"), data);

        const notificationDatas = {
          shipOwner: currentUser?.currentUser,
          shipOwnerId: currentUser?.userId,
          createdAt: Date.now(),
          shipName: ship.name,
          associatedSharedShip: data.notificationId,
          type: "nouveau vaisseau civil partagé",
        };

        users &&
          [...users]
            .filter(
              (user) =>
                (user.factionPart === "civil-militaire" &&
                  user.id !== currentUser?.userId) ||
                (user.factionPart === "civil" &&
                  user.id !== currentUser?.userId)
            )
            .map((user) => {
              const userNotifications = user.notifications;
              updateDoc(doc(db, "users", user.id), {
                notifications: [...userNotifications, notificationDatas],
              });
            });
      }

      dispatch(dispatch(setSelectedShip(false)));
    }
  };

  let fleetChoiceMenu = "";

  switch (actualDepartment) {
    case "central administration":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CPFG.">Flotte civile gouvernementale - CPFG.</option>
          </select>
        </>
      );
      break;
    case "academy":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1Fo.">
              1ère flotte civile de formation - CP1Fo.
            </option>
          </select>
        </>
      );
      break;
    case "exploration":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1Ex.">1ère flotte d'exploration - CP1Ex.</option>
          </select>
        </>
      );
      break;
    case "tourism":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1Te.">1ère flotte de tourisme - CP1Te.</option>
          </select>
        </>
      );
      break;
    case "trade & transport":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1Ci.">
              1ère flotte de commerce itinérante - CP1Ci.
            </option>
            <option value="CP1Tp.">
              1ère flotte de commerce transport - CP1Tp.
            </option>
          </select>
        </>
      );
      break;
    case "industry":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1MiRa.">
              1ère flotte de minage et de raffinage - CP1MiRa.
            </option>
            <option value="CP1Ry.">1ère flotte de recyclage - CP1Ry.</option>
          </select>
        </>
      );
      break;
    case "sciences":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1Cr.">
              1ère flotte de civile recherche - CP1Cr.
            </option>
          </select>
        </>
      );
      break;
    case "medicine":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1He.">
              1ère flotte civile hospitalière - CP1He.
            </option>
          </select>
        </>
      );
      break;
    case "culture & sports":
      fleetChoiceMenu = (
        <>
          <select ref={fleet}>
            <option value="">Veuillez choisir une flotte...</option>
            <option value="CP1FeC.">
              1ère flottille de course Primaris - CP1FeC.
            </option>
          </select>
        </>
      );
      break;

    default:
  }

  return (
    <form
      className="ship-informations-form-body"
      onSubmit={(e) => handleNewShipOwned(e)}
    >
      <h3>Civil Primaris sélectionnés</h3>
      <h4>Mettre ce vaisseau à disposition de la corporation ?</h4>
      <select onChange={(e) => setShared(e.target.value)}>
        <option value="non">Non</option>
        <option value="oui">Oui</option>
      </select>
      {shared === "oui" ? (
        <>
          <p>
            En mettant votre vaisseau à disposition, vous acceptez que ce
            dernier ainsi que son équipage puissent faire l'objet d'une
            modification d'affectation par le gestionnaire.
          </p>

          <div className="ship-informations-form-ship-employment">
            <div className="ship-informations-form-ship-employment-sub-container">
              <h4>Choix du département</h4>
              <select
                ref={department}
                onChange={(e) => setActualDepartment(e.target.value)}
              >
                <option value="">Veuillez choisir un département...</option>
                <option value="central administration">
                  Administration centrale
                </option>
                <option value="academy">Académie</option>
                <option value="exploration">Exploration</option>
                <option value="tourism">Tourisme</option>
                <option value="trade & transport">Commerce & transport</option>
                <option value="industry">Industrie</option>
                <option value="sciences">Sciences</option>
                <option value="medicine">Médecine</option>
                <option value="culture & sports">Culture & sports</option>
              </select>
            </div>{" "}
            <span className="error-message">{departmentErrorMessage}</span>
            <div className="ship-informations-form-ship-employment-sub-container">
              <h4>Choix de la flotte</h4>
              {fleetChoiceMenu}
            </div>
            <div className="ship-informations-form-ship-employment-sub-container">
              <h4>Nom du vaisseau</h4>
              <input type="text" placeholder="Nom..." ref={shipName} />
              <span className="error-message">{shipNameErrorMessage}</span>
            </div>
            <div className="ship-informations-form-ship-employment-sub-container">
              <h4>Mission ou rôle souhaité</h4>
              <input
                type="text"
                placeholder="Mission ou rôle souhaité..."
                ref={shipRole}
              />
              <span className="error-message">{shipNameErrorMessage}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="ship-informations-form-ship-employment-sub-container">
          <h4>Nom du vaisseau</h4>
          <input type="text" placeholder="Nom..." ref={shipName} />
          <span className="error-message">{shipNameErrorMessage}</span>
        </div>
      )}
      <button id="ship-informations-form-submit-button" type="submit">
        Importer vaisseau
      </button>
    </form>
  );
};

export default CivilianShipInformationsForm;
