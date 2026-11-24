import {getDownloadURL, listAll, ref} from "firebase/storage";
import React, {useEffect, useState} from "react";
import {storage} from "../../utils/firebase.config";
import {useDispatch, useSelector} from "react-redux";
import BannerCard from "./BannerCard";
import ProfileCard from "./ProfileCard";

const ImgLibrary = () => {
    const actualUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const actualUserBannerList = useSelector(
        (state) => state.user?.uploadedBannersList
    );
    const actualUserUploadedImagesList = useSelector(
        (state) => state.user?.uploadedImagesList
    );

    return (
        <div className="img-library-container">
            <h3 className="gallery-title">Bannières uploadées</h3>
            <div className="banner-list-container">
                {actualUserBannerList !== undefined
                    ? [...actualUserBannerList]?.map((bannerImage) => {
                          return (
                              <BannerCard
                                  bannerImage={bannerImage}
                                  key={bannerImage}
                              />
                          );
                      })
                    : ""}
            </div>

            <h3 className="gallery-title">Photos de profil uploadées</h3>
            <div className="profile-list-container">
                {actualUserUploadedImagesList !== undefined
                    ? [...actualUserUploadedImagesList]?.map((profileImage) => {
                          return (
                              <ProfileCard
                                  profileImage={profileImage}
                                  key={profileImage}
                              />
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};

export default ImgLibrary;
