import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {db} from "../../../utils/firebase.config";
import ThreadResponse from "./ThreadResponse";

const Thread = ({thread}) => {
  const [isOpened, setIsOpened] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const [isResponding, setIsResponding] = useState(false);
  const responseContent = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const threadAuthor = useSelector((state) =>
    state.user.users.find((user) => user.id === thread.threadAuthorId)
  );
  const users = useSelector((state) => state.user.users);

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

    const userNotificationsAfterRemoval = currentUser.notifications.filter(
      (notification) => notification.associatedThread !== thread.notificationId
    );

    await updateDoc(doc(db, "users", currentUser.userId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  const handleDeleteThread = async (e) => {
    e.preventDefault();

    users &&
      [...users]
        .filter(
          (users) =>
            users.webSiteRole === "moderateur" &&
            users.webSiteRole === "administrateur"
        )
        .map((user) => {
          const notificationsAfterRemoval = [...user.notifications].filter(
            (notification) =>
              notification.associatedThread !== thread.notificationId
          );
          updateDoc(doc(db, "users", user.id), {
            notifications: notificationsAfterRemoval,
          });
        });
    await deleteDoc(doc(db, "moderatorThreads", thread.id));
  };

  const handleAddLike = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "moderatorThreads", thread.id), {
      likes: [...thread.likes, currentUser.userId],
    });
  };
  const handleRemoveLike = async (e) => {
    e.preventDefault();

    const likesAfterFilter = [...thread.likes].filter(
      (liker) => liker !== currentUser.userId
    );

    await updateDoc(doc(db, "moderatorThreads", thread.id), {
      likes: likesAfterFilter,
    });
  };
  const handleAddVote = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "moderatorThreads", thread.id), {
      upVote: [...thread.upVote, currentUser.userId],
    });
  };
  const handleRemoveVote = async (e) => {
    e.preventDefault();

    const upVoterAfterFilter = [...thread.upVote].filter(
      (upVote) => upVote !== currentUser.userId
    );

    await updateDoc(doc(db, "moderatorThreads", thread.id), {
      upVote: upVoterAfterFilter,
    });
  };

  const handleSetResponse = async (e) => {
    e.preventDefault();

    if (responseContent.current.value !== "")
      try {
        const responseData = {
          responseAuthor: currentUser.currentUser,
          responseAuthorId: currentUser.userId,
          responseContent: responseContent.current.value,
          threadId: thread.id,
          likes: [],
          createdAt: Date.now(),
          notificationId: Date.now() + Math.random(),
        };

        await updateDoc(doc(db, "moderatorThreads", thread.id), {
          responses: [...thread.responses, responseData],
        });

        const responseNotification = {
          type: "nouvelle réponse à un sujet modérateur",
          threadAuthor: thread.threadAuthor,
          threadSubject: thread.threadSubject,
          responseContent: responseData.responseContent,
          responseAuthor: responseData.responseAuthor,
          responseAuthorId: responseData.responseAuthorId,
          associatedResponse: responseData.notificationId,
          createdAt: Date.now(),
        };

        if (currentUser.userId !== thread.threadAuthorId) {
          await updateDoc(doc(db, "users", thread.threadAuthorId), {
            notifications: [
              ...threadAuthor?.notifications,
              responseNotification,
            ],
          });
        }

        setIsResponding(false);
      } catch (err) {
        console.log(err);
      }
    else {
      setErrorMessage("vous devez remplir les champs");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div
      className={isOpened === true ? "thread-body open" : "thread-body close"}
    >
      {isOpened === false ? (
        <>
          <div className="thread-header">
            <div className="thread-header-infos-container">
              <div className="thread-author">
                <span className="label">Auteur:</span>
                <span className="info-blue value">{thread.threadAuthor}</span>
              </div>
              <div className="thread-subject">
                <span className="label">Sujet: </span>
                <span className="info-red value">{thread.threadSubject}</span>
              </div>
              <div className="thread-date">
                <span className="label">Créé le: </span>
                <span className="info-yellow value">
                  {dateFormater(thread.createdAt)}
                </span>
              </div>
              <div className="thread-header-sub-container">
                <div className="thread-likes">
                  <span className="label">Likes: </span>
                  <span className="info-green ">{thread?.likes.length}</span>
                </div>
                <div className="thread-upVotes">
                  <span className="label">Votes: </span>
                  <span className="info-green ">{thread?.upVote.length}</span>
                </div>
              </div>
            </div>
            <div className="thread-interactions-container">
              {[...currentUser?.notifications].find(
                (notification) =>
                  notification?.associatedThread === thread?.notificationId
              ) ? (
                <div className="new-thread">Nouveau</div>
              ) : (
                ""
              )}
              {thread?.likes &&
              [...thread.likes].find(
                (liker) => liker === currentUser.userId
              ) ? (
                <button
                  className="like-btn"
                  onClick={(e) => handleRemoveLike(e)}
                >
                  like -1
                </button>
              ) : (
                <button className="like-btn" onClick={(e) => handleAddLike(e)}>
                  like +1
                </button>
              )}
              {thread?.upVote &&
              [...thread?.upVote].find(
                (upVote) => upVote === currentUser.userId
              ) ? (
                <button
                  className="vote-btn"
                  onClick={(e) => handleRemoveVote(e)}
                >
                  Vote -1
                </button>
              ) : (
                <button className="vote-btn" onClick={(e) => handleAddVote(e)}>
                  Vote +1
                </button>
              )}
              {thread.threadAuthorId === currentUser.userId ||
              currentUser.webSiteRole === "administrateur" ? (
                <>
                  {isOpened === false ? (
                    <>
                      <button
                        className="open-btn"
                        onClick={(e) => handleDeleteThread(e)}
                      >
                        Supprimer
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              {isOpened === false ? (
                <button
                  className="open-btn"
                  onClick={(e) =>
                    (setIsOpened(true), handleRemoveAssociatedNotification(e))
                  }
                >
                  Ouvrir
                </button>
              ) : (
                <button
                  className="close-btn"
                  onClick={() => setIsOpened(false)}
                >
                  Fermer
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="thread-header">
            <div className="thread-header-infos-container">
              <div className="thread-author">
                <span className="label">Auteur:</span>
                <span className="info-blue value">{thread.threadAuthor}</span>
              </div>
              <div className="thread-subject">
                <span className="label">Sujet: </span>
                <span className="info-red value">{thread.threadSubject}</span>
              </div>
              <div className="thread-date">
                <span className="label">Créé le: </span>
                <span className="info-yellow value">
                  {dateFormater(thread.createdAt)}
                </span>
              </div>
              <div className="thread-header-sub-container">
                <div className="thread-likes">
                  <span className="label">Likes: </span>
                  <span className="info-green ">{thread?.likes.length}</span>
                </div>
                <div className="thread-upVotes">
                  <span className="label">Votes: </span>
                  <span className="info-green ">{thread?.upVote.length}</span>
                </div>
              </div>
            </div>
            <div className="thread-interactions-container">
              {thread?.upVote &&
              [...thread?.upVote].find(
                (upVote) => upVote === currentUser.userId
              ) ? (
                <button
                  className="vote-btn"
                  onClick={(e) => handleRemoveVote(e)}
                >
                  Vote -1
                </button>
              ) : (
                <button className="vote-btn" onClick={(e) => handleAddVote(e)}>
                  Vote +1
                </button>
              )}
              {thread?.likes &&
              [...thread.likes].find(
                (liker) => liker === currentUser.userId
              ) ? (
                <button
                  className="like-btn"
                  onClick={(e) => handleRemoveLike(e)}
                >
                  like -1
                </button>
              ) : (
                <button className="like-btn" onClick={(e) => handleAddLike(e)}>
                  like +1
                </button>
              )}
              {isOpened === false ? (
                <button
                  className="open-btn"
                  onClick={(e) =>
                    (setIsOpened(true), handleRemoveAssociatedNotification(e))
                  }
                >
                  Ouvrir
                </button>
              ) : (
                <button
                  className="close-btn"
                  onClick={() => (setIsOpened(false), setIsResponding(false))}
                >
                  Fermer
                </button>
              )}
            </div>
          </div>
          <div className="thread-content-main-container">
            <div className="thread-content-message-container">
              <span>Message initial: </span>{" "}
              <p className="info-green">{thread.threadContent}</p>
            </div>
            {isResponding === true ? (
              ""
            ) : (
              <button onClick={(e) => setIsResponding(true)}>Repondre</button>
            )}
          </div>
          {(thread?.responses && thread?.responses[0]) ||
          isResponding === true ? (
            <div className="thread-content-responses-container">
              {isResponding === true ? (
                <>
                  {" "}
                  <textarea
                    ref={responseContent}
                    placeholder="inscrivez votre réponse..."
                    autoFocus={true}
                  ></textarea>
                  {errorMessage !== "" ? (
                    <span className="info-red-uppercase">{errorMessage}</span>
                  ) : (
                    ""
                  )}
                  <div className="thread-content-responses-buttons-container">
                    <button onClick={(e) => setIsResponding(false)}>
                      Annuler
                    </button>
                    <button onClick={(e) => handleSetResponse(e)}>
                      Valider la réponse
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
              {thread?.responses[0] &&
                [...thread?.responses]
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((response) => (
                    <ThreadResponse
                      thread={thread}
                      response={response}
                      key={response.createdAt}
                    />
                  ))}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default Thread;
