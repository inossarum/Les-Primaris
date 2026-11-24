const userModel = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message: "Impossible de récupérer les utilisateurs"});
  }
};

module.exports.getonlineUser = async (req, res) => {
  try {
    const onlineUser = await userModel.findOne({pseudo: req.params.pseudo});
    if (!onlineUser) {
      return res.status(404).json({message: "Cet utilisateur n'existe pas"});
    }
    return res.status(200).json(onlineUser);
  } catch (err) {
    return res.status(500).json({message: "Impossible de récupérer cet utilisateur"});
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: "Cet utilisateur n'existe pas"});
    }
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: "Utilisateur supprimé"});
  } catch (err) {
    return res.status(500).json({message: "Impossible de supprimer cet utilisateur"});
  }
};

module.exports.setUsers = async (req, res) => {
  if (!req.body.pseudo || !req.body.email) {
    return res.status(400).json({message: "Un pseudo et un email sont requis"});
  }
  try {
    const user = await userModel.create({
      pseudo: req.body.pseudo, email: req.body.email,
      factionPart: req.body.factionPart, factionRank: req.body.factionRank,
      firebaseId: req.body.firebaseId, webSiteRole: req.body.webSiteRole,
      department: req.body.department,
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({message: "Impossible de créer cet utilisateur"});
  }
};
