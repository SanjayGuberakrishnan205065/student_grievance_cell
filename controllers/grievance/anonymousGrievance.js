const { nanoid } = require("nanoid");
const AnonymousGrievance = require("../../models/AnonymousGrievance");
const GrievanceStatus = require("../../models/GrievanceStatus");
const { sentimentAnalysis } = require("../../utils/mlTasks");
const nodemailer = require("nodemailer");
const Staff = require("../../models/Staff");

const createAnonymousGrievance = async (req, res) => {
  try {
    const { title, description, grievanceType, staffAssigned } = req.body;
    const trackingId = nanoid(8);
    const grievance = await AnonymousGrievance.create({
      title,
      description,
      grievanceType,
      staffAssigned,
      trackingId,
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

const getAnonymousGrievance = async (req, res) => {
  try {
    let grievance;
    if (req.params.grievanceId) {
      grievance = await AnonymousGrievance.findById(req.params.grievanceId)
        .populate("grievanceStatus", ["title", "description"])
        .populate("grievanceType", "name")
        .populate("staffAssigned", ["name", "designation"]);
    } else {
      const { trackingId } = req.params;
      grievance = await AnonymousGrievance.findOne({ trackingId })
        .populate("grievanceStatus", ["title", "description"])
        .populate("grievanceType", "name")
        .populate("staffAssigned", ["name", "designation"]);
    }
    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found",
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
      sentiment: sentimentScore,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const modifyAnonymousGrievanceStatus = async (req, res) => {
  try {
    const { grievanceId } = req.params;
    const { grievanceStatus } = req.body;
    const grievanceStatusId = await GrievanceStatus.findOne({
      title: grievanceStatus,
    });
    if (!grievanceStatusId) {
      return res.status(400).json({
        success: false,
        message: "Invalid grievance status",
      });
    }
    const updatedGrievance = await AnonymousGrievance.findOneAndUpdate(
      { _id: grievanceId },
      { grievanceStatus: grievanceStatusId },
      { new: true }
    )
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"]);
    res.status(200).json({
      success: false,
      message: "Grievance status updated successfully",
      grievance: updatedGrievance,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = {
  createAnonymousGrievance,
  getAnonymousGrievance,
  modifyAnonymousGrievanceStatus,
};
