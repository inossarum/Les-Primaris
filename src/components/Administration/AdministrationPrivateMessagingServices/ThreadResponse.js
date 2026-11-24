import {doc, updateDoc} from "firebase/firestore";
import React from "react";
import {useSelector} from "react-redux";
import {db} from "../../../utils/firebase.config";
import {Delete} from "@mui/icons-material";

const ThreadResponse = ({response, thread}) => {
  const currentUser = useSelector((state) => state.user);

  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  const handleRemoveAssociatedNotification = async (e) => {
    e.preventDefault();

    const userNotificationsAfterRemoval = (currentUser.notifications ?? []).filter(
      (notification) =>
        notification.associatedResponse !== response.notificationId
    );

    await updateDoc(doc(db, "users", currentUser.userId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  const threadAuthorDatas = useSelector((state) =>
    [...state.user.users]?.find((user) => user.id === thread.threadAuthorId)
  );

  const handleDeleteResponse = async (e) => {
    e.preventDefault();

    const threadResponsesAfterRemoval = [...thread?.responses].filter(
      (threadResponse) => response.createdAt !== threadResponse.createdAt
    );

    await updateDoc(doc(db, "moderatorThreads", thread.id), {
      responses: threadResponsesAfterRemoval,
    });

    const userNotificationsAfterRemoval = [
      ...(threadAuthorDatas?.notifications ?? []),
    ]?.filter(
      (notification) =>
        notification.associatedResponse !== response.notificationId
    );

    await updateDoc(doc(db, "users", thread.threadAuthorId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  return (
    <div
      className="thread-response-body"
      onMouseEnter={(e) => handleRemoveAssociatedNotification(e)}
    >
      <div className="thread-response-header">
        Réponse de:{" "}
        <span className="info-blue response-author">
          {response.responseAuthor}
        </span>
        à{" "}
        <span className="info-yellow">
          {dateFormater(response?.createdAt)}:
        </span>{" "}
      </div>
      <p className="info-green">{response?.responseContent}</p>
      <div className="thread-response-sub-container">
        {[...currentUser?.notifications].find(
          (notification) =>
            notification?.associatedResponse === response?.notificationId
        ) ? (
          <div className="new-response">Nouveau</div>
        ) : (
          ""
        )}
        {response.responseAuthorId === currentUser.userId ||
        currentUser.webSiteRole === "administrateur" ? (
          <Delete onClick={(e) => handleDeleteResponse(e)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ThreadResponse;
