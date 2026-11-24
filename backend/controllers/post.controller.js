const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({message: "Merci d'entrer un message"});
  }
  if (!req.body.author) {
    return res.status(400).json({message: "Merci d'entrer un pseudo"});
  }
  const post = await PostModel.create({
    author: req.body.author,
    authorFactionPart: req.body.authorFactionPart,
    authorFactionRank: req.body.authorFactionRank,
    authorWebSiteRole: req.body.authorWebSiteRole,
    message: req.body.message,
  });
  return res.status(201).json(post);
};

module.exports.editPost = async (req, res) => {
  const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
};

module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json({message: "Post supprimé"});
};

module.exports.addComments = async (req, res) => {
  if (!req.body.comment) {
    return res.status(400).json({message: "Un commentaire est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(req.params.id, {
    $addToSet: {comments: req.body.comment},
  }, {new: true, runValidators: true});
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
};

module.exports.deleteComments = async (req, res) => {
  if (!req.body.commentId) {
    return res.status(400).json({message: "L'identifiant du commentaire est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(req.params.id, {
    $pull: {comments: {_id: req.body.commentId}},
  }, {new: true});
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
};

module.exports.likePost = async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({message: "L'identifiant utilisateur est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(req.params.id, {
    $addToSet: {likers: req.body.userId},
  }, {new: true});
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
};

module.exports.dislikePost = async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({message: "L'identifiant utilisateur est requis"});
  }
  const post = await PostModel.findByIdAndUpdate(req.params.id, {
    $pull: {likers: req.body.userId},
  }, {new: true});
  if (!post) {
    return res.status(404).json({message: "Ce post n'existe pas"});
  }
  return res.status(200).json(post);
};
