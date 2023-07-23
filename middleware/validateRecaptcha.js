const fetch = require("node-fetch");
const requestIp = require("request-ip");

const vaildateRecaptcha = async (req, res, next) => {
  try {
    if (!req.body.recaptchaToken && !req.headers.recaptchatoken) {
      return res.status(400).json({
        success: false,
        message: "Recaptcha token not found",
      });
    }
    const formData = new URLSearchParams();
    formData.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    formData.append(
      "response",
      req.body.recaptchaToken || req.headers.recaptchatoken
    );
    formData.append("remoteip", requestIp.getClientIp(req));
    console.log("captcha ip", requestIp.getClientIp(req));
    const recaptchRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );
    const recaptchaJson = await recaptchRes.json();
    console.log("recaptchaResponse", recaptchaJson);
    if (!recaptchaJson.success) {
      return res.status(400).json({
        success: false,
        message: "Recaptcha verification failed",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "There was an error while verifying recaptcha, please try again",
    });
  }
};

module.exports = vaildateRecaptcha;
