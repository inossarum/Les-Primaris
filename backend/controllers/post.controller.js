const PostModel = require("../models/post.model");

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

module.exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await PostModel.find();
  return res.status(200).json(posts);
});

module.exports.setPosts = asyncHandler(async (req, res) => {
  const {message, author} = req.body;
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({message: "Merci d'entrer un message"});
  }
  if (typeof author !== "string" || !author.trim()) {
    return res.status(400).json({message: "Merci d'entrer un pseudo"});
  }

  const post = await PostModel.create({
    author: author.trim(),
    authorFactionPart: req.body.authorFactionPart,
    authorFactionRank: req.body.authorFactionRank,
    authorWebSiteRole: req.body.authorWebSiteRole,
    message: message.trim(),
  });
  return res.status(201).json(post);
});

module.exports.editPost = asyncHandler(async (req, res) => {
  const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
});

module.exports.deletePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json({message: "Post supprimé"});
});

module.exports.addComments = asyncHandler(async (req, res) => {
  if (!req.body.comment) {
    return res.status(400).json({message: "Un commentaire est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(
    req.params.id,
    {$addToSet: {comments: req.body.comment}},
    {new: true, runValidators: true}
  );
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
});

module.exports.deleteComments = asyncHandler(async (req, res) => {
  if (!req.body.commentId) {
    return res.status(400).json({message: "L'identifiant du commentaire est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(
    req.params.id,
    {$pull: {comments: {_id: req.body.commentId}}},
    {new: true}
  );
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
});

module.exports.likePost = asyncHandler(async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({message: "L'identifiant utilisateur est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(
    req.params.id,
    {$addToSet: {likers: req.body.userId}},
    {new: true}
  );
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
});

module.exports.dislikePost = asyncHandler(async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({message: "L'identifiant utilisateur est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(
    req.params.id,
    {$pull: {likers: req.body.userId}},
    {new: true}
  );
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
});
