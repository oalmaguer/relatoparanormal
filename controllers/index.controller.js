const indexCtrl = {};
const Relato = require("../src/models/Relato");
const ObjectId = require("mongodb").ObjectId;
indexCtrl.createStory = async (req, res) => {
  //   const { author, type, story } = req.body;
  console.log(req.body);
  const newStory = new Relato(req.body);
  const savedStory = await newStory.save();
  res.send(savedStory);
};

indexCtrl.getAllStories = async (req, res) => {
  const relatos = await Relato.find();
  res.send(relatos);
};

indexCtrl.renderTemas = (req, res) => {
  res.send("temas");
};

indexCtrl.getStory = async (req, res) => {
  console.log(req.params.id);
  const id = new ObjectId(req.params.id);

  const relato = await Relato.find({ _id: id });
  res.send(relato);
};

indexCtrl.deleteStory = (req, res) => {
  res.send("delete");
};

module.exports = indexCtrl;
