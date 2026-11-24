const express = require("express");
const {
  setPosts,
  getPosts,
  editPost,
  deletePost,
  addComments,
  likePost,
  dislikePost,
  deleteComments,
  // editComments,
} = require("../controllers/post.controller");

const router = express.Router();

router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
router.patch("/comments/:id", addComments);
router.patch("/delete-comments/:id", deleteComments);
// router.patch("/edit-comments/:id", editComments);
router.patch("/like-post/:id", likePost);
router.patch("/dislike-post/:id", dislikePost);

module.exports = router;
