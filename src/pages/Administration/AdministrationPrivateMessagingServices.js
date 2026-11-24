import React, {useEffect} from "react";
import NavBar from "../../components/Navbar/NavBar";
import {useDispatch, useSelector} from "react-redux";
import CreateThread from "../../components/Administration/AdministrationPrivateMessagingServices/CreateThread";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../utils/firebase.config";
import {getThreads} from "../../feature/moderatorThreads.slice";
import Thread from "../../components/Administration/AdministrationPrivateMessagingServices/Thread";

const AdministrationPrivateMessagingServices = () => {
  const dispatch = useDispatch();
  const moderatorThreads = useSelector(
    (state) => state.moderatorThreads.threadsData
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "moderatorThreads"), (snapshot) => {
      const moderatorThreads = snapshot.docs.map((threadDoc) => ({
        ...threadDoc.data(),
        id: threadDoc.id,
      }));
      dispatch(getThreads(moderatorThreads));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div
      className="administration-private-messaging-services-body"
      style={{
        background: `url(./assets/img/departments/administration-messaging-services-background.webp) center/cover no-repeat fixed`,
      }}
    >
      <NavBar
        factionPart="administration"
        pageActive={"administrationPrivateMessagingServices"}
      />{" "}
      <div className="administration-private-messaging-services-title-container">
        <h2 className="administration-private-messaging-services-title">
          Forum des modérateurs
        </h2>
      </div>
      <div className="administration-private-messaging-services-main-container">
        <CreateThread />
        <div className="administration-private-messaging-services-threads-list-container">
          {moderatorThreads &&
            [...moderatorThreads]
              .sort((a, b) => b?.upVote.length - a?.upVote.length)
              .map((thread) => <Thread thread={thread} key={thread.id} />)}
        </div>
      </div>
    </div>
  );
};

export default AdministrationPrivateMessagingServices;
