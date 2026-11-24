const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    authorFactionPart: {
      type: String,
    },
    authorFactionRank: {
      type: String,
    },
    authorWebSiteRole: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    likers: {
      type: [String],
    },
    comments: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
