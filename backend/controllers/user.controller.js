const userModel = require("../models/user.model");

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

module.exports.getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  return res.status(200).json(users);
});

module.exports.getonlineUser = asyncHandler(async (req, res) => {
  const onlineUser = await userModel.findOne({pseudo: req.params.pseudo});
  if (!onlineUser) {
    return res.status(404).json({message: "Cet utilisateur n'existe pas"});
  }
  return res.status(200).json(onlineUser);
});

module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({message: "Cet utilisateur n'existe pas"});
  }
  return res.status(200).json({message: "Utilisateur supprimé"});
});

module.exports.setUsers = asyncHandler(async (req, res) => {
  const {pseudo, email} = req.body;
  if (typeof pseudo !== "string" || !pseudo.trim() ||
      typeof email !== "string" || !email.trim()) {
    return res.status(400).json({message: "Un pseudo et un email sont requis"});
  }

  const user = await userModel.create({
    pseudo: pseudo.trim(),
    email: email.trim(),
    factionPart: req.body.factionPart,
    factionRank: req.body.factionRank,
    firebaseId: req.body.firebaseId,
    webSiteRole: req.body.webSiteRole,
    department: req.body.department,
  });
  return res.status(201).json(user);
});
