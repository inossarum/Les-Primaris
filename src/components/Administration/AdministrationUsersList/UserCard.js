import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {sendPasswordResetEmail} from "firebase/auth";
import {Avatar} from "@mui/material";
import EditFactionRank from "./EditFactionRank";
import DeleteUser from "./DeleteUser";
import {auth, db} from "../../../utils/firebase.config";
import {
  getUserFactionPart,
  getUserWebSiteRole,
} from "../../../feature/user.slice";
import EditAssignment from "./EditAssignment";
import Translator from "./Translator";

const UserCard = ({user}) => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editWebSiteRole, setEditWebSiteRole] = useState(false);
  const [editFactionPart, setEditFactionPart] = useState(false);
  const role = useRef();

  const handleEditWebSiteRole = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", user.id), {
      webSiteRole: role.current.value,
    });
    if (user.id === auth.currentUser.uid) {
      dispatch(getUserWebSiteRole(role.current.value));
    }
    setEditWebSiteRole(false);
  };

  const handleEditFactionPart = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", user.id), {
      factionPart: role.current.value,
    });
    if (user.id === auth.currentUser.uid) {
      dispatch(getUserFactionPart(role.current.value));
    }
    setEditFactionPart(false);
  };

  const passwordReseter = () => {
    sendPasswordResetEmail(auth, user.email).then((res) => console.log(res));
  };

  console.log(user);

  return (
    <div className="user-card">
      <div className="card-infos-container">
        <div className="user-infos-container">
          <div className="profil-img-container">
            {user?.photo ? (
              <img src={user.photo} alt="photo de profil de l'utilisateur" />
            ) : (
              <Avatar />
            )}
          </div>
          <h2 className="user-card-name">{user.pseudo}</h2>
        </div>

        <div className="role-container">
          <h4 className="role-title">Role sur le site web: </h4>
          <div className="role-circle-role-title">
            <span className={`role-circle ${user.webSiteRole}`}></span>
            <h5 className="user-role">{user.webSiteRole}</h5>
          </div>
        </div>
        <div className="role-container">
          <h4 className="role-title">Partie de la faction: </h4>
          <div className="role-circle-role-title">
            <span className={`role-circle ${user.factionPart}`}></span>
            <h5 className="user-role">{user.factionPart}</h5>
          </div>
        </div>
        <div className="role-container">
          <h4 className="role-title">Grade dans la faction: </h4>
          <div className="role-circle-role-title">
            {user?.factionPart === "militaire" ||
            user?.factionPart === "civil-militaire" ? (
              <div className="military-rank-logo-wrapper">
                <img
                  src={`./assets/img/departments/military-ranks/${user?.factionRank}.webp`}
                  alt={` grade de ${user?.factionRank}`}
                />
              </div>
            ) : (
              <span className={`role-circle ${user?.factionRank}`}></span>
            )}
            <h5 className="user-role">{user?.factionRank}</h5>
          </div>
        </div>
        {user?.assignment !== "none" ? (
          <div className="role-container">
            <h4 className="role-title">Département d'affectation: </h4>
            <div>
              <div className="role-circle-role-title">
                <div className="military-rank-logo-wrapper">
                  <img
                    src={`./assets/img/departments/${user?.assignment}.webp`}
                    alt={` logo de ${user?.assignment}`}
                  />
                </div>
                <h5 className="user-role">
                  <Translator assignment={user?.assignment} />
                </h5>
              </div>
              <span className="user-assignment">
                {" "}
                <span>Unité:</span>
                <span className="info-green">{user?.assignmentUnit}</span>
              </span>
              <span className="user-assignment">
                {" "}
                <span>Emploi:</span>
                <span className="info-yellow-capitalize">{user?.job}</span>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="actions-container">
          {currentUser.webSiteRole === "administrateur" ||
          (currentUser.webSiteRole === "moderateur" &&
            user.id !== "m76FQbm4ptRTm2b0JZzZv5aeNm83") ? (
            <div className="edit-role-container">
              {editWebSiteRole ? (
                <>
                  <form onSubmit={(e) => handleEditWebSiteRole(e)}>
                    <select ref={role}>
                      {currentUser.webSiteRole === "administrateur" ? (
                        <option value="administrateur">Administrateur</option>
                      ) : (
                        ""
                      )}
                      <option value="moderateur">Modérateur</option>
                      <option value="membre">Membre</option>
                      <option value="invité">Invité</option>
                    </select>
                    <input type="submit" />
                  </form>
                </>
              ) : (
                <div
                  className="edit-btn"
                  onClick={() => setEditWebSiteRole(!editWebSiteRole)}
                >
                  Modifier le role sur Site
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          {currentUser.webSiteRole === "administrateur" ||
          (currentUser.webSiteRole === "moderateur" &&
            user.id !== "m76FQbm4ptRTm2b0JZzZv5aeNm83") ? (
            <div className="edit-role-container">
              {editFactionPart ? (
                <>
                  <form onSubmit={(e) => handleEditFactionPart(e)}>
                    <select ref={role}>
                      <option value="civil-militaire">Civil-Militaire</option>
                      <option value="civil">Civil</option>
                      <option value="militaire">Militaire</option>
                      <option value="representant-exterieur">
                        Représentant Extérieur
                      </option>
                      <option value="none">Aucune</option>
                    </select>
                    <input type="submit" />
                  </form>
                </>
              ) : (
                <div
                  className="edit-btn"
                  onClick={() => setEditFactionPart(!editFactionPart)}
                >
                  Modifier partie faction
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {currentUser.webSiteRole === "administrateur" ||
          (currentUser.webSiteRole === "moderateur" &&
            user.id !== "m76FQbm4ptRTm2b0JZzZv5aeNm83") ? (
            <div className="edit-role-container">
              <EditFactionRank
                factionPart={user.factionPart}
                userId={user.id}
              />
            </div>
          ) : (
            ""
          )}
          {currentUser.webSiteRole === "administrateur" ||
          (currentUser.webSiteRole === "moderateur" &&
            user.id !== "m76FQbm4ptRTm2b0JZzZv5aeNm83") ? (
            <div className="edit-role-container">
              <EditAssignment factionPart={user.factionPart} userId={user.id} />
            </div>
          ) : (
            ""
          )}

          {currentUser.webSiteRole === "administrateur" ||
          (currentUser.webSiteRole === "moderateur" &&
            user.id !== "m76FQbm4ptRTm2b0JZzZv5aeNm83") ? (
            <div className="edit-role-container">
              <div className="edit-btn" onClick={() => passwordReseter()}>
                Reset password
              </div>
            </div>
          ) : (
            ""
          )}

          {currentUser.webSiteRole === "administrateur" ? (
            <div className="edit-role-container">
              <DeleteUser uid={user.id} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
