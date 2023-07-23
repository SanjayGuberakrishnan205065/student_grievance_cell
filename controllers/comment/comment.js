const Comment = require("../../models/Comment");

// get all comments for a grievance
const getComments = async (req, res) => {
  try {
    const grievanceId = req.params.grievanceId;
    const comments = await Comment.find({ grievance: grievanceId });
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch comments",
    });
  }
};

// add a comment to a grievance
const addComment = async (req, res) => {
  try {
    const grievanceId = req.params.grievanceId;
    const comment = await Comment.create({
      grievance: grievanceId,
      comment: req.body.comment,
      authorType: req.user.userType,
    });
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to add comment",
    });
  }
};

// add an anonymous comment to a grievance
const addAnonymousComment = async (req, res) => {
  try {
    const grievanceId = req.params.grievanceId;
    const comment = await Comment.create({
      grievance: grievanceId,
      comment: req.body.comment,
      authorType: "anonymous",
    });
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to add comment",
    });
  }
};

module.exports = {
  getComments,
  addComment,
  addAnonymousComment,
};
