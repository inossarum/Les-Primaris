import React from "react";
import {useSelector} from "react-redux";
import Notification from "./Notification";

const NotificationsDisplayer = () => {
  const user = useSelector((state) => state.user);
  const userPersonnalNotifications = useSelector(
    (state) => state.user.notifications
  );

  return (
    <div className="notifications-displayer-body">
      <div className="notifications-displayer-mains-container">
        <h3>Notifications</h3>
        {userPersonnalNotifications[0] ? (
          <div className="notifications-displayer-content-container">
            {userPersonnalNotifications &&
              [...userPersonnalNotifications]
                ?.sort((a, b) => b.createdAt - a.createdAt)
                ?.map((notification) => (
                  <Notification
                    notification={notification}
                    key={Math.random()}
                  />
                ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NotificationsDisplayer;
