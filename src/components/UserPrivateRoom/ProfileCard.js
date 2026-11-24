import {deleteObject, ref} from "firebase/storage";
import React from "react";
import {db, storage} from "../../utils/firebase.config";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {getUserPhoto} from "../../feature/user.slice";

const ProfileCard = ({profileImage}) => {
  const actualUser = useSelector((state) => state.user);
  const imageRef =
    typeof profileImage === "string" && profileImage.trim()
      ? ref(storage, profileImage)
      : null;

  const actualUserUploadedImagesList = useSelector(
    (state) => state.user.uploadedImagesList
  );
  const dispatch = useDispatch();

  const deleteProfileImage = async (e) => {
    e.preventDefault();
    if (!imageRef || !actualUser.userId) return;

    const updateData = {
      uploadedImagesList: (actualUserUploadedImagesList ?? []).filter(
        (image) => image !== profileImage
      ),
    };
    if (actualUser.photo === profileImage) updateData.photo = "";

    try {
      await updateDoc(doc(db, "users", actualUser.userId), updateData);
      if (actualUser.photo === profileImage) dispatch(getUserPhoto(""));
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Unable to remove profile image:", error);
    }
  };

  const handleUpdateUserProfileImage = async (e) => {
    e.preventDefault();

    const imageDatas = {
      photo: profileImage,
    };

    await updateDoc(doc(db, "users", actualUser.userId), imageDatas);
    dispatch(getUserPhoto(profileImage));
  };

  return (
    <div className="profile-card-general-container">
      <div className="profile-image-wrapper">
        {typeof profileImage === "string" && profileImage.trim() ? (
          <>
            <img
              className="profile-photo"
              src={profileImage}
              alt="Portrait de profil"
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
