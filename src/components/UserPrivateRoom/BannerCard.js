import {Delete} from "@mui/icons-material";
import {deleteObject, ref} from "firebase/storage";
import React from "react";
import {db, storage} from "../../utils/firebase.config";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {getUserBanner} from "../../feature/user.slice";

const BannerCard = ({bannerImage}) => {
  const imageRef =
    typeof bannerImage === "string" && bannerImage.trim()
      ? ref(storage, bannerImage)
      : null;
  const actualUser = useSelector((state) => state.user);
  const actualUserUploadedBannersList = useSelector(
    (state) => state.user.uploadedBannersList
  );
  const dispatch = useDispatch();

  const deleteProfileImage = async (e) => {
    e.preventDefault();
    if (!imageRef || !actualUser.userId) return;

    const updateData = {
      uploadedBannersList: (actualUserUploadedBannersList ?? []).filter(
        (banner) => banner !== bannerImage
      ),
    };
    if (actualUser.banner === bannerImage) updateData.banner = "";

    try {
      await updateDoc(doc(db, "users", actualUser.userId), updateData);
      if (actualUser.banner === bannerImage) dispatch(getUserBanner(""));
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Unable to remove profile banner:", error);
    }
  };

  const handleUpdateUserBannerImage = async (e) => {
    e.preventDefault();

    const imageDatas = {
      banner: bannerImage,
    };

    await updateDoc(doc(db, "users", actualUser.userId), imageDatas);
    dispatch(getUserBanner(bannerImage));
  };

  return (
    <div className="card-general-container">
      <div className="image-wrapper">
        {imageRef && <img
          className="banner"
          src={bannerImage}
          alt="Bannière de profil"
          onClick={(e) => handleUpdateUserBannerImage(e)}
        />}
        {imageRef && <span>
          <Delete
            className="delete-icon"
            onClick={(e) => deleteProfileImage(e)}
          />
        </span>}
      </div>
    </div>
  );
};

export default BannerCard;
