import {Delete} from "@mui/icons-material";
import {deleteObject, ref} from "firebase/storage";
import React from "react";
import {db, storage} from "../../utils/firebase.config";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {getUserBanner} from "../../feature/user.slice";

const BannerCard = ({bannerImage}) => {
  const imageRef = ref(storage, bannerImage);
  const actualUser = useSelector((state) => state.user);
  const actualUserUploadedBannersList = useSelector(
    (state) => state.user.uploadedBannersList
  );
  const dispatch = useDispatch();

  const deleteProfileImage = (e) => {
    e.preventDefault();

    if (
      bannerImage !== undefined ||
      bannerImage !== "" ||
      bannerImage !== null
    ) {
      deleteObject(imageRef)
        .then((res) => console.log("image correctement supprimée de la DB"))
        .catch((err) => console.log(err));

      const bannersListUpdated =
        actualUserUploadedBannersList &&
        [...actualUserUploadedBannersList].filter(
          (banner) => JSON.stringify(banner) !== JSON.stringify(bannerImage)
        );

      updateDoc(doc(db, "users", actualUser.userId), {
        uploadedBannersList: bannersListUpdated,
      });
    }
  };

  const handleUpdateUserBannerImage = async (e) => {
    e.preventDefault();

    const imageDatas = {
      banner: bannerImage,
    };

    updateDoc(doc(db, "users", actualUser.userId), imageDatas);
    dispatch(getUserBanner(bannerImage));
  };

  return (
    <div className="card-general-container">
      <div className="image-wrapper">
        <img
          className="banner"
          src={bannerImage}
          alt={bannerImage}
          onClick={(e) => handleUpdateUserBannerImage(e)}
        />
        <span>
          <Delete
            className="delete-icon"
            onClick={(e) => deleteProfileImage(e)}
          />
        </span>
      </div>
    </div>
  );
};

export default BannerCard;
