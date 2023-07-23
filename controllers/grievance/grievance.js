const Grievance = require("../../models/Grievance");
const Staff = require("../../models/Staff");
const AnonymousGrievance = require("../../models/AnonymousGrievance");
const { sentimentAnalysis } = require("../../utils/mlTasks");
const nodemailer = require("nodemailer");

// create a new grievance
const addGrievance = async (req, res) => {
  try {
    const { title, description, grievanceType, staffAssigned } = req.body;
    const grievance = await Grievance.create({
      title,
      description,
      grievanceType,
      student: req.user.userInfo._id,
      staffAssigned,
    });
    const staffEmail = (
      await Staff.findOne({
        _id: staffAssigned,
      }).select("email")
    )["email"];
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PWD,
      },
    });
    var mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: staffEmail,
      subject: "New Grievance assigned to you",
      html: `<h1>Student Grievance Cell, Madras Institute of Technology</h1><p>A new grievance has been assigned to you.</p><p><b>Title:</b> ${grievance.title}</p><p><b>Description:</b> ${grievance.description}</p><p>
      <a href="${process.env.WEB_URL}/staff/grievances/view/assigned/${grievance._id}">More info</a>`,
    };
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Something went wrong");
        console.log(error);
      } else {
        console.log("Node mailer ready to  is ready to send mails");
      }
    });
    await transporter.sendMail(mailOptions);
    console.log(
      "Mail sent from" + process.env.MAIL_USERNAME + "to" + staffEmail
    );
    res.status(201).json({
      success: true,
      message: "Grievance created successfully",
      grievance,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get all grievances raised by a student
const getStudentGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      student: req.user.userInfo._id,
    })
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"])
      .populate("student", ["name", "registerNo"])
      .sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get all grievances assigned to a staff
const getStaffGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      staffAssigned: req.user.userInfo._id,
    })
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"])
      .populate("student", ["name", "registerNo"])
      .sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get all anonymous grievances assigned to a staff
const getAssignedAnonymousGrievances = async (req, res) => {
  try {
    const grievances = await AnonymousGrievance.find({
      staffAssigned: req.user.userInfo._id,
    })
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"])
      .sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get details of a grievance
const getGrievance = async (req, res) => {
  try {
    const grievanceId = req.params.grievanceId;
    const grievance = await Grievance.findOne({
      _id: grievanceId,
    })
      .populate("grievanceType", "name")
      .populate("grievanceStatus", "title")
      .populate({
        path: "student",
        populate: ["name", "department", "registerNo"],
      })
      .populate("staffAssigned", ["name", "designation"]);
    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found",
      });
    }
    // check if the user is authorized to view the grievance
    if (
      req.user.userType !== "admin" && // admin can view all grievances
      grievance.student._id.toString() !== req.user.userInfo._id.toString() &&
      grievance.staffAssigned._id.toString() !==
        req.user.userInfo._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const sentiment = (await sentimentAnalysis(grievance.description))[0];
    const sentimentScore = {
      positive:
        sentiment[0].label === "POSITIVE"
          ? sentiment[0].score
          : sentiment[1].score,
      negative:
        sentiment[0].label === "NEGATIVE"
          ? sentiment[0].score
          : sentiment[1].score,
    };
    // get percentage and round off to 2 decimal places
    sentimentScore.positive = Math.round(sentimentScore.positive * 1e4) / 100;
    sentimentScore.negative = Math.round(sentimentScore.negative * 1e4) / 100;

    res.status(200).json({
      success: true,
      message: "Grievance fetched successfully",
      grievance,
      sentiment:
        req.user.userType === "staff" || req.user.userType === "admin"
          ? sentimentScore
          : null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addGrievance,
  getStudentGrievances,
  getStaffGrievances,
  getAssignedAnonymousGrievances,
  getGrievance,
};
