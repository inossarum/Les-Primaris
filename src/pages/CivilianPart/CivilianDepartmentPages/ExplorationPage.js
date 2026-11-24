import React, {useEffect} from "react";
import NavBar from "../../../components/Navbar/NavBar";

import ExplorationDepartmentNewsCenterBlock from "../../../components/CivilianPart/CivilianDepartmentPages/ExplorationPage/ExplorationDepartmentNewsCenterBlock";
import ExplorationDepartmentMembersRightBlock from "../../../components/CivilianPart/CivilianDepartmentPages/ExplorationPage/ExplorationDepartmentMembersRightBlock";
import ExplorationDepartmentNavBar from "../../../components/CivilianPart/CivilianDepartmentPages/ExplorationPage/ExplorationDepartmentNavBar";
import {useDispatch, useSelector} from "react-redux";
import ExplorationDepartmentLocationsLeftBlock from "../../../components/CivilianPart/CivilianDepartmentPages/ExplorationPage/ExplorationDepartmentLocationLeftBlock/ExplorationDepartmentLocationLeftBlock";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import {getExplorationDepartmentLocations} from "../../../feature/departmentPages.slice";

const ExplorationPage = () => {
  const dispatch = useDispatch();
  const displayedBlock = useSelector(
    (state) => state.departmentPages.departmentDisplayedBlock
  );

  useEffect(() => {
    onSnapshot(collection(db, "explorationLocations"), (snapshot) => {
      let ExplorationDepartmentLocationsData = [];
      snapshot.docs.forEach((doc) => {
        ExplorationDepartmentLocationsData.push({...doc.data(), id: doc.id});
      });
      dispatch(
        getExplorationDepartmentLocations(ExplorationDepartmentLocationsData)
      );
    });
  }, []);

  return (
    <div className="exploration-page-body ">
      <NavBar factionPart={"civilian"} pageActive={"departmentPage"} />
      <ExplorationDepartmentNavBar />
      <div className={`exploration-page-main-container  ${displayedBlock}`}>
        <ExplorationDepartmentLocationsLeftBlock />
        <ExplorationDepartmentNewsCenterBlock />
        <ExplorationDepartmentMembersRightBlock />
        <div></div>
      </div>
    </div>
  );
};

export default ExplorationPage;
