import {doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth, db} from "../../../utils/firebase.config";
import {getUserAssignment} from "../../../feature/user.slice";

const EditAssignment = ({factionPart, userId}) => {
  const dispatch = useDispatch();
  const [editAssignment, setEditAssignment] = useState(false);
  const assignment = useRef();
  const userWebSiteRole = useSelector((state) => state.user.webSiteRole);

  const handleEditAssignment = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", userId), {
      assignment: assignment.current.value,
    });
    if (userId === auth?.currentUser.uid) {
      dispatch(getUserAssignment(assignment.current.value));
    }
    setEditAssignment(false);
  };

  if (factionPart === "militaire") {
    return (
      <div className="edit-role-container">
        {editAssignment ? (
          <>
            <form onSubmit={(e) => handleEditAssignment(e)}>
              <select ref={assignment}>
                <option value="etat-major">Etat-Major</option>
                <option value="infantryDepartment">infanterie</option>
                <option value="aerospatialDepartment">Aerospatial</option>
                <option value="logisticsDepartment">Logistique</option>
                <option value="militaryMedicineDepartment">
                  Médecine Militaire
                </option>
                <option value="militaryResearchDepartment">
                  Recherche Militaire
                </option>
                {userWebSiteRole && userWebSiteRole === "administrateur" ? (
                  <option value="blackOpsDivision">Forces Spéciales</option>
                ) : (
                  ""
                )}
              </select>
              <input type="submit" />
            </form>
          </>
        ) : (
          <div
            className="edit-btn"
            onClick={() => setEditAssignment(!editAssignment)}
          >
            Modifier département d'affectation
          </div>
        )}
      </div>
    );
  }

  if (factionPart === "civil") {
    return (
      <div className="edit-role-container">
        {editAssignment ? (
          <>
            <form onSubmit={(e) => handleEditAssignment(e)}>
              <select ref={assignment}>
                {/* Administration Centrale */}
                <option value="centralAdministration">
                  Administration Centrale
                </option>
                <option value="culture">Culture & Sports</option>
                <option value="exploration">Exploration</option>
                <option value="touring">Tourisme</option>
                <option value="trade">Commerce & Transport</option>
                <option value="industry">Industrie</option>
                <option value="medicine">Médecine</option>
                <option value="sciences">Sciences</option>
              </select>
              <input type="submit" />
            </form>
          </>
        ) : (
          <div
            className="edit-btn"
            onClick={() => setEditAssignment(!editAssignment)}
          >
            Modifier département d'affectation
          </div>
        )}
      </div>
    );
  }

  if (factionPart === "civil-militaire") {
    return (
      <div>
        <div className="edit-role-container">
          {editAssignment ? (
            <>
              <form onSubmit={(e) => handleEditAssignment(e)}>
                <select ref={assignment}>
                  <option value="staff">Etat-Major</option>
                  <option value="infantryDepartment">infanterie</option>
                  <option value="aerospatialDepartment">Aerospatial</option>
                  <option value="logisticsDepartment">Logistique</option>
                  <option value="militaryMedicineDepartment">
                    Médecine Militaire
                  </option>
                  <option value="militaryResearchDepartment">
                    Recherche Militaire
                  </option>
                  {userWebSiteRole && userWebSiteRole === "administrateur" ? (
                    <option value="specOpsDepartment">Forces Spéciales</option>
                  ) : (
                    ""
                  )}
                  <option value="centralAdministration">
                    Administration Centrale
                  </option>
                  <option value="culture">Culture & Sports</option>
                  <option value="exploration">Exploration</option>
                  <option value="touring">Tourisme</option>
                  <option value="trade">Commerce & Transport</option>
                  <option value="industry">Industrie</option>
                  <option value="medicine">Médecine</option>
                  <option value="sciences">Sciences</option>
                </select>
                <input type="submit" />
              </form>
            </>
          ) : (
            <div
              className="edit-btn"
              onClick={() => setEditAssignment(!editAssignment)}
            >
              Modifier département d'affectation
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
          {editAssignment ? (
            <>
              <form onSubmit={(e) => handleEditAssignment(e)}>
                <select ref={assignment}>
                  <option value="none">Aucun</option>
                </select>
                <input type="submit" />
              </form>
            </>
          ) : (
            <div
              className="edit-btn"
              onClick={() => setEditAssignment(!editAssignment)}
            >
              Modifier département d'affectation
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default EditAssignment;
