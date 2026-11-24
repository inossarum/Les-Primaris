import {doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {auth, db} from "../../../utils/firebase.config";
import {getUserFactionRank} from "../../../feature/user.slice";

const EditFactionRank = ({factionPart, userId}) => {
  const dispatch = useDispatch();
  const [editFactionRank, setEditFactionRank] = useState(false);
  const role = useRef();

  const handleEditFactionRank = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", userId), {
      factionRank: role.current.value,
    });
    if (userId === auth?.currentUser.uid) {
      dispatch(getUserFactionRank(role.current.value));
    }
    setEditFactionRank(false);
  };

  if (factionPart === "militaire") {
    return (
      <div className="edit-role-container">
        {editFactionRank ? (
          <>
            <form onSubmit={(e) => handleEditFactionRank(e)}>
              <select ref={role}>
                <option value="executeur militaire">Executeur Militaire</option>
                <option value="polemarque militaire">
                  Polémarque Militaire
                </option>
                {/* Officiers généraux */}
                <option value="amiral">Amiral</option>
                <option value="vice-amiral">Vice-amiral</option>
                <option value="contre-amiral">Contre-amiral</option>
                <option value="general d'armee">Général d'armée</option>
                <option value="general de brigade">Général de brigade</option>
                {/* Officiers supérieurs */}
                <option value="colonel">Colonel</option>
                <option value="lieutenant-colonel">Lieutenant colonel</option>
                <option value="commandant">Commandant</option>
                {/* Officiers subalternes */}
                <option value="capitaine">Capitaine</option>
                <option value="lieutenant">Lieutenant</option>
                <option value="sous-lieutenant">Sous-Lieutenant</option>
                <option value="eleve-officier">Eleve Officier</option>
                {/* Sous-Officiers */}
                <option value="major">Major</option>
                <option value="adjudant-chef">Adjudant-chef</option>
                <option value="adjudant">Adjudant</option>
                <option value="sergent-chef">Sergent-chef</option>
                <option value="sergent">Sergent</option>
                {/* Miitaires du rang */}
                <option value="caporal-chef">Caporal-chef</option>
                <option value="caporal">Caporal</option>
                <option value="premiere classe">1ere Classe</option>
                <option value="seconde classe">2dn Classe</option>
                <option value="militaire eleve">Militaire Elève</option>
                <option value="reserviste">Réserviste</option>
              </select>
              <input type="submit" />
            </form>
          </>
        ) : (
          <div
            className="edit-btn"
            onClick={() => setEditFactionRank(!editFactionRank)}
          >
            Modifier rang corpo
          </div>
        )}
      </div>
    );
  }

  if (factionPart === "civil") {
    return (
      <div className="edit-role-container">
        {editFactionRank ? (
          <>
            <form onSubmit={(e) => handleEditFactionRank(e)}>
              <select ref={role}>
                {/* Administration Centrale */}
                <option value="executeur-civil">Executeur Civil</option>
                <option value="polemarque-civil">Polémarque Civil</option>
                <option value="formateur">Formateur</option>
                <option value="membre">Membre</option>
                <option value="none">Aucun</option>
              </select>
              <input type="submit" />
            </form>
          </>
        ) : (
          <div
            className="edit-btn"
            onClick={() => setEditFactionRank(!editFactionRank)}
          >
            Modifier rang corpo
          </div>
        )}
      </div>
    );
  }

  if (factionPart === "civil-militaire") {
    return (
      <div>
        <div className="edit-role-container">
          {editFactionRank ? (
            <>
              <form onSubmit={(e) => handleEditFactionRank(e)}>
                <select ref={role}>
                  <option value="primarque">Primarque</option>
                  <option value="reserviste">Réserviste</option>
                  <option value="treasurer">Trésorier</option>
                </select>
                <input type="submit" />
              </form>
            </>
          ) : (
            <div
              className="edit-btn"
              onClick={() => setEditFactionRank(!editFactionRank)}
            >
              Modifier rang corpo
            </div>
          )}
        </div>
      </div>
    );
  }

  if (factionPart === "representant-exterieur") {
    return (
      <div>
        <div className="edit-role-container">
          {editFactionRank ? (
            <>
              <form onSubmit={(e) => handleEditFactionRank(e)}>
                <select ref={role}>
                  <option value="invité">Invité</option>
                </select>
                <input type="submit" />
              </form>
            </>
          ) : (
            <div
              className="edit-btn"
              onClick={() => setEditFactionRank(!editFactionRank)}
            >
              Modifier rang corpo
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default EditFactionRank;
