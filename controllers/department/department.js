const Department = require("../../models/Department");

// development only
const addDepartment = async (req, res) => {
  const { name } = req.body;
  const newDepartment = await Department.create({
    name,
  });
  res.status(201).json({
    status: "success",
    newDepartment,
  });
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      message: "Departments fetched successfully",
      departments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succes: false,
      message: "Server Error",
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Department fetched successfully",
      department,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succes: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addDepartment,
  getDepartments,
  getDepartmentById,
};
