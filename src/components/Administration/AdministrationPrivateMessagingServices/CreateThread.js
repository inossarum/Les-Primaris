import React, {useRef, useState} from "react";
import {Add} from "@mui/icons-material";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";
import {useSelector} from "react-redux";

const CreateThread = () => {
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const [isCreatingNewThread, setIsCreatingNewThread] = useState(false);
  const threadSubject = useRef();
  const threadContent = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateNewThread = async (e) => {
    e.preventDefault();

    if (
      threadSubject.current.value !== "" &&
      threadContent.current.value !== ""
    )
      try {
        const threadData = {
          threadAuthor: currentUser.currentUser,
          threadAuthorId: currentUser.userId,
          threadSubject: threadSubject.current.value,
          threadContent: threadContent.current.value,
          upVote: [],
          likes: [],
          responses: [],
          createdAt: Date.now(),
          notificationId: Date.now() + Math.random(),
        };

        await addDoc(collection(db, "moderatorThreads"), threadData);

        const threadNotification = {
          type: "nouveau sujet modérateur",
          threadAuthor: currentUser.currentUser,
          threadSubject: threadData.threadSubject,
          threadContent: threadData.threadContent,
          associatedThread: threadData.notificationId,
          createdAt: Date.now(),
        };

        await Promise.all(
          (users ?? [])
            .filter(
              (user) =>
                user.id !== threadData.threadAuthorId &&
                ["moderateur", "administrateur"].includes(user.webSiteRole)
            )
            .map((user) =>
              updateDoc(doc(db, "users", user.id), {
                notifications: [
                  ...(user.notifications ?? []),
                  threadNotification,
                ],
              })
            )
        );

        setIsCreatingNewThread(false);
      } catch (err) {
        console.error("Unable to create moderator thread:", err?.code || err?.name);
        setErrorMessage("Le sujet n’a pas pu être créé.");
      }
    else {
      setErrorMessage("vous devez remplir les champs");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="create-thread-body">
      {/* <ThreadHeader /> */}
      <div className="create-thread-main-container">
        <div className="create-thread-main-buttons-container">
          <button
            className="submit"
            onClick={() => setIsCreatingNewThread(true)}
          >
            Créer un nouveau sujet <Add />
          </button>
          {isCreatingNewThread ? (
            <button
              className="cancel"
              onClick={() => setIsCreatingNewThread(false)}
            >
              Annuler
            </button>
          ) : (
            ""
          )}
        </div>

        {isCreatingNewThread ? (
          <form onSubmit={(e) => handleCreateNewThread(e)}>
            <div className="new-thread-main-container">
              <div className="new-thread-input-container">
                <div>
                  <label htmlFor="subject">Sujet</label>
                  <input ref={threadSubject} type="text" id="subject" />
                </div>
                <textarea
                  ref={threadContent}
                  placeholder="Nouvelle discussion..."
                ></textarea>
              </div>
              <button type="submit">valider</button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>

      {errorMessage !== "" ? (
        <span className="create-thread-error-message info-red-uppercase">
          {errorMessage}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateThread;
