const petCamp = require('../../services/clientServices/petCamp');

module.exports = {
  async getCamps(req, res) {
    try {
      const petCamps = await petCamp.getPetCamps();
      return res.status(200).json({ petCamps });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getFreeRoomsController(req, res) {
    try {
      const { start, end, id } = req.params;
      const allRooms = await petCamp.getAllRooms(id);
      const occupiedRooms = await petCamp.getOccupiedRooms(id, start, end);
      const freeRooms = allRooms.filter(
        (e) => !occupiedRooms.find((i) => i.id === e.id)
      );
      return res.status(200).json({ freeRooms });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },
  async getOccupied(req, res) {
    try {
      const { start, end, id } = req.params;
      const occupied = await petCamp.getOccupied(id, start, end);
      return res.status(200).json({ occupied });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  },
};
