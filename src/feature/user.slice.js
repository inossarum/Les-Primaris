import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    userEmail: null,
    RPName: null,
    photo: null,
    photoRef: null,
    banner: null,
    bannerRef: null,
    uploadedBannersList: [],
    uploadedImagesList: [],
    webSiteRole: null,
    factionPart: null,
    factionRank: null,
    assignment: null,
    assignmentUnit: null,
    employment: null,
    postulant: null,
    department: null,
    userId: null,
    notifications: [],
    users: [],
    civilianUsers: [],
    militaryUsers: [],
    promotedAt: null,
    officerRecommandation: [],
    civilianDiplomasEarned: [],
    militaryDiplomasEarned: [],
  },
  reducers: {
    clearCurrentUser: (state) => {\n      state.currentUser = null;\n      state.userEmail = null;\n      state.RPName = null;\n      state.photo = null;\n      state.photoRef = null;\n      state.banner = null;\n      state.bannerRef = null;\n      state.uploadedBannersList = [];\n      state.uploadedImagesList = [];\n      state.webSiteRole = null;\n      state.factionPart = null;\n      state.factionRank = null;\n      state.assignment = null;\n      state.assignmentUnit = null;\n      state.employment = null;\n      state.postulant = null;\n      state.department = null;\n      state.userId = null;\n      state.notifications = [];\n      state.promotedAt = null;\n      state.officerRecommandation = [];\n      state.civilianDiplomasEarned = [];\n      state.militaryDiplomasEarned = [];\n    },\n    getUser: (state, {payload}) => {
      state.currentUser = payload;
    },
    getUserRPName: (state, {payload}) => {
      state.RPName = payload;
    },
    getUserEmploymentStatus: (state, {payload}) => {
      state.employment = payload;
    },
    getUserPostulantStatus: (state, {payload}) => {
      state.postulant = payload;
    },
    getUsers: (state, {payload}) => {
      state.users = payload;
      state.civilianUsers = state.users
        .filter(
          (user) =>
            user.factionPart === "civil" ||
            user.factionPart === "civil-militaire"
        )
        .sort((a, b) => String(a.pseudo || "").localeCompare(String(b.pseudo || "")));
      state.militaryUsers = state.users
        .filter(
          (user) =>
            user.factionPart === "militaire" ||
            user.factionPart === "civil-militaire"
        )
        .sort((a, b) => a.pseudo.localeCompare(b.pseudo));
    },
    getUserWebSiteRole: (state, {payload}) => {
      state.webSiteRole = payload;
    },
    getUserFactionPart: (state, {payload}) => {
      state.factionPart = payload;
    },
    getUserFactionRank: (state, {payload}) => {
      state.factionRank = payload;
    },
    getUserAssignment: (state, {payload}) => {
      state.assignment = payload;
    },
    getUserAssignmentUnit: (state, {payload}) => {
      state.assignmentUnit = payload;
    },
    getUserDepartment: (state, {payload}) => {
      state.department = payload;
    },
    getUserNotifications: (state, {payload}) => {
      state.notifications = payload;
    },
    getUserPhoto: (state, {payload}) => {
      state.photo = payload;
    },
    getUserPhotoRef: (state, {payload}) => {
      state.photoRef = payload;
    },
    getUserBanner: (state, {payload}) => {
      state.banner = payload;
    },
    getUserBannerRef: (state, {payload}) => {
      state.bannerRef = payload;
    },
    getUserUploadedBannersList: (state, {payload}) => {
      state.uploadedBannersList = payload;
    },
    getUserUploadedImagesList: (state, {payload}) => {
      state.uploadedImagesList = payload;
    },

    getUserId: (state, {payload}) => {
      state.userId = payload;
    },
    getUserPromotedAt: (state, {payload}) => {
      state.promotedAt = payload;
    },
    getUserOfficerRecommandation: (state, {payload}) => {
      state.officerRecommandation = payload;
    },
    getUserCivilianDiplomasEarned: (state, {payload}) => {
      state.civilianDiplomasEarned = payload;
    },
    getUserMilitaryDiplomasEarned: (state, {payload}) => {
      state.militaryDiplomasEarned = payload;
    },
    getUserEmail: (state, {payload}) => {
      state.userEmail = payload;
    },
    deleteUser: (state, {payload}) => {
      state.users = state.users.filter((user) => user._id !== payload);
    },
  },
});

export const {
  getUser,
  getUserRPName,
  getUserEmploymentStatus,
  getUserPostulantStatus,
  getUserPhoto,
  getUserPhotoRef,
  getUserBanner,
  getUserUploadedBannersList,
  getUserUploadedImagesList,
  getUserPromotedAt,
  getUserOfficerRecommandation,
  getUserCivilianDiplomasEarned,
  getUserMilitaryDiplomasEarned,
  getUserBannerRef,
  getUsers,
  getUserWebSiteRole,
  getUserFactionPart,
  getUserFactionRank,
  getUserAssignment,
  getUserAssignmentUnit,
  getUserDepartment,
  getUserNotifications,
  getUserId,
  getUserEmail,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
