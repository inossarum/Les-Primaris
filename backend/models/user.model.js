const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // Civilian or military
    factionPart: {
      type: String,
    },
    // Rank inside the Primaris faction
    factionRank: {
      type: String,
    },
    // Firebase Id from firebase DB
    firebaseId: {
      type: String,
    },
    // Role inside the Primaris website
    webSiteRole: {
      type: String,
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
