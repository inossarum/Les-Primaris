import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import NavBar from "../components/Navbar/NavBar";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../utils/firebase.config";
import MilitaryInfosCard from "../components/MilitaryPart/MilitaryTrainingsAndMissionsFollower/MilitaryInfosCard";
import {getMilitaryEventsArchivesList} from "../feature/events.slice";

const MilitaryTrainingsAndMissionsFollower = () => {
  const dispatch = useDispatch();
  const militaryUsers = useSelector((state) => state.user.militaryUsers);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "militaryEventsArchives"),
      (snapshot) => {
        const events = snapshot.docs.map((eventDoc) => ({
          ...eventDoc.data(),
          id: eventDoc.id,
        }));
        dispatch(getMilitaryEventsArchivesList(events));
      }
    );
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="military-trainings-and-missions-follower-body">
      <NavBar
        factionPart={"military"}
        pageActive={"military-trainings-and-missions-follower"}
      />
      <div className="military-crew-title-container">
        <h2>Entrainements & Missions</h2>
      </div>
      <div className="military-trainings-and-missions-follower-cards-container-wrapper">
        <div className="military-trainings-and-missions-follower-cards-container">
          {militaryUsers &&
            [...militaryUsers]
              ?.sort((a, b) => b.rankOrder - a.rankOrder)
              .map((military) => (
                <MilitaryInfosCard military={military} key={military.id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MilitaryTrainingsAndMissionsFollower;
