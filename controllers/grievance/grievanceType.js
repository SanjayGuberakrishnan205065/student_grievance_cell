const GrievanceType = require("../../models/GrievanceType");

// development only
const addGrievanceType = async (req, res) => {
  const { name, description } = req.body;
  const newGrievanceType = await GrievanceType.create({
    name,
    description,
  });
  res.status(201).json({
    status: "success",
    newGrievanceType,
  });
};

const getGrievanceTypes = async (req, res) => {
  const grievanceTypes = await GrievanceType.find();
  res.status(200).json({
    status: "success",
    grievanceTypes,
  });
};

module.exports = {
  addGrievanceType,
  getGrievanceTypes,
};
