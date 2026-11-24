import React from "react";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {celestialCardContentDeployed} from "../../feature/window.slice";
import {
  getRSIShipDetail,
  getRSIShipImages,
  getRSIShipVariants,
  getRSIShipVideos,
} from "../../feature/rsi.slice";
import axios from "axios";

const EncyclopediaShipCard = ({data}) => {
  const dispatch = useDispatch();

  const shipVariantsQuery = async () => {
    if (!data?.slug || !data?.name) return;
    window.scrollTo(0, 0);

    const results = await Promise.allSettled([
      axios.get(`https://api.fleetyards.net/v1/models/${encodeURIComponent(data.slug)}/variants`),
      axios.get(`https://api.star-citizen.wiki/api/vehicles/${encodeURIComponent(data.name)}?locale=en_EN&include=components`),
      axios.get(`https://api.fleetyards.net/v1/models/${encodeURIComponent(data.slug)}/images`),
      axios.get(`https://api.fleetyards.net/v1/models/${encodeURIComponent(data.slug)}/videos`),
    ]);

    const actions = [
      getRSIShipVariants,
      getRSIShipDetail,
      getRSIShipImages,
      getRSIShipVideos,
    ];
    results.forEach((result, index) => {
      dispatch(actions[index](
        result.status === "fulfilled" ? result.value.data : null
      ));
      if (result.status === "rejected") {
        console.error("Échec du chargement des données du vaisseau :", result.reason);
      }
    });
  };

  return (
    <div className="encyclopedia-ship-card-body">
      <div className="encyclopedia-image-wrapper">
        <NavLink
          className="encyclopedia-card-image"
          style={{
            background: `url(${data.storeImageLarge}) center/cover no-repeat `,
          }}
          to="/starCitizenEncyclopediaDetailPage"
          onClick={() => {
            dispatch(celestialCardContentDeployed(data));
            void shipVariantsQuery();
          }}
        >
          <div className="ship-name-container">
            <div className="ship-name">
              <h2>{data.name}</h2>
            </div>
            <div className="ship-manufacturer">
              <h3>{data?.manufacturer.name}</h3>
            </div>
          </div>
          <div className="ship-production-status-container">
            {data.productionStatus === "flight-ready" ? (
              <h4 className="ship-production-status flight-ready">
                {data.productionStatus}
              </h4>
            ) : (
              ""
            )}
            {data.productionStatus === "in-concept" ? (
              <h4 className="ship-production-status in-concept">
                {data.productionStatus}
              </h4>
            ) : (
              ""
            )}
            {data.productionStatus === "in-production" ? (
              <h4 className="ship-production-status in-production">
                {data.productionStatus}
              </h4>
            ) : (
              ""
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default EncyclopediaShipCard;
