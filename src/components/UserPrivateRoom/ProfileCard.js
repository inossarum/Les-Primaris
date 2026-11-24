import {deleteObject, ref} from "firebase/storage";
import React from "react";
import {db, storage} from "../../utils/firebase.config";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {getUserPhoto} from "../../feature/user.slice";

const ProfileCard = ({profileImage}) => {
  const actualUser = useSelector((state) => state.user);
  const imageRef = ref(storage, profileImage);

  const actualUserUploadedImagesList = useSelector(
    (state) => state.user.uploadedImagesList
  );
  const dispatch = useDispatch();

  const deleteProfileImage = (e) => {
    e.preventDefault();

    if (
      profileImage !== undefined ||
      profileImage !== "" ||
      profileImage !== null
    ) {
      deleteObject(imageRef)
        .then((res) => console.log("image correctement supprimée de la DB"))
        .catch((err) => console.log(err));

      const imagesListUpdated =
        actualUserUploadedImagesList &&
        [...actualUserUploadedImagesList].filter(
          (image) => JSON.stringify(image) !== JSON.stringify(profileImage)
        );

      updateDoc(doc(db, "users", actualUser.userId), {
        uploadedImagesList: imagesListUpdated,
      });
    }
  };

  const handleUpdateUserProfileImage = async (e) => {
    e.preventDefault();

    const imageDatas = {
      photo: profileImage,
    };

    updateDoc(doc(db, "users", actualUser.userId), imageDatas);
    dispatch(getUserPhoto(profileImage));
  };

  return (
    <div className="profile-card-general-container">
      <div className="profile-image-wrapper">
        {profileImage !== (undefined || null || "") ? (
          <>
            <img
              className="profile-photo"
              src={profileImage}
              alt={profileImage}
              onClick={(e) => handleUpdateUserProfileImage(e)}
            />
            <span>
              <Delete
                className="delete-icon"
                onClick={(e) => deleteProfileImage(e)}
              />
            </span>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
