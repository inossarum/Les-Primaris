import React from "react";
import {useSelector} from "react-redux";
import EditProfilPhoto from "./EditProfilPhoto";
import EditBannerPhoto from "./EditBannerPhoto";

const Banner = () => {
  const userBanner = useSelector((state) => state.user.banner);
  const userPhoto = useSelector((state) => state.user.photo);

  return (
    <div className="banner-and-profil-photo-container">
      <div className="banner-wrapper">
        <span className="line2"></span>
        <span className="bloc1"></span>
        <span className="line3"></span>
        <img className="banner-picture" src={userBanner} alt={userBanner} />
        <EditBannerPhoto />
        <div className="profil-photo-wrapper">
          <img className="profil-photo" src={userPhoto} alt={userPhoto} />
          <EditProfilPhoto />
        </div>
      </div>
    </div>
  );
};

export default Banner;
