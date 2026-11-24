import {GroupAdd} from "@mui/icons-material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

import JobSelectionPanel from "./JobSelectionPanel";
import {setJobSelectionActive} from "../../feature/window.slice";

const JoinCrewCard = ({ownedShipDatas}) => {
  const dispatch = useDispatch();
  const jobSelectionActive = useSelector(
    (state) => state.windowActive.jobSelectionActive
  );

  return (
    <div className="owned-ship-card-crew-member-cards-container">
      <div className="crew-member-card-body">
        <div
          className="crew-member-card-search-container"
          onClick={(e) => dispatch(setJobSelectionActive(true))}
        >
          Postuler sur ce batiment
          <GroupAdd className="crew-member-card-plus" />
        </div>
        {jobSelectionActive === true ? (
          <JobSelectionPanel ownedShipDatas={ownedShipDatas} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default JoinCrewCard;
