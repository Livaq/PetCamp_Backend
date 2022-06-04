const pets = require('../../services/clientServices/pets');

module.exports = {
  async getPets(req, res) {
    try {
      const { id, type } = req.params;

      const petsList = await pets.getPetsList(id, type);
      return res.status(200).json({ petsList });
    } catch (error) {
      return res.status(500).json({ message: 'Error on server' });
    }
  },
  async postPet(req, res) {
    try {
      const { id } = req.params;
      const pet = req.body;
      const newPet = await pets.postPet(pet, id);
      return res
        .status(200)
        .json({ message: 'Pet was successfully added', newPet });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },

  async deletePet(req, res) {
    try {
      const { id } = req.params;
      const petDeleteCondition = await pets.deletePet(id);
      if (petDeleteCondition) {
        return res
          .status(200)
          .json({ message: 'Pet was successfully deleted' });
      }
      return res.status(400).json({ message: 'This pet has booking' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },
};
