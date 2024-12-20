const { handleSendActiceCodeMail } = require("../services/mail.service");
const ValidationCode = require("../models/validation-code");

class MailController {
  // [GET] /mail/send-active-code"
  /**
   * param: {
   *    email: string,
   * }
   * @param {*} req
   * @param {*} res
   */
  async sendActiveCode(req, res) {
    const { email } = req.query;
    try {
      const code = await handleSendActiceCodeMail(email);
      console.log(code);
      await ValidationCode.deleteMany({ email: email });
      const validationCode = new ValidationCode({
        email: email,
        code: code,
      });
      await validationCode.save();
      res.status(200).json({ message: "Send active code successfully" });
    } catch (error) {
      res.status(500).json({ message: "Send active code failed" });
    }
  }
}

module.exports = new MailController();
