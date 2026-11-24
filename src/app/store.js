import {configureStore} from "@reduxjs/toolkit";
import moderatorThreadsReducer from "../feature/moderatorThreads.slice";
import postReducer from "../feature/post.slice";
import eventsReducer from "../feature/events.slice";
import promotionsReducer from "../feature/promotions.slice";
import commentReducer from "../feature/comment.slice";
import notificationsReducer from "../feature/notifications.slice";
import windowReducer from "../feature/window.slice";
import userReducer from "../feature/user.slice";
import rsiReducer from "../feature/rsi.slice";
import userPrivateRoomReducer from "../feature/userPrivateRoom.slice";
import sharedShipsReducer from "../feature/sharedShips.slice";
import militaryRanksReducer from "../feature/militaryRanks.slice";
import primarisIngameShopReducer from "../feature/primarisIngameShop.slice";
import departmentPagesReducer from "../feature/departmentPages.slice";

export default configureStore({
  reducer: {
    posts: postReducer,
    moderatorThreads: moderatorThreadsReducer,
    events: eventsReducer,
    promotions: promotionsReducer,
    comments: commentReducer,
    notifications: notificationsReducer,
    windowActive: windowReducer,
    user: userReducer,
    rsi: rsiReducer,
    userPrivateRoom: userPrivateRoomReducer,
    sharedShips: sharedShipsReducer,
    militaryRanks: militaryRanksReducer,
    primarisIngameShop: primarisIngameShopReducer,
    departmentPages: departmentPagesReducer,
  },
});
