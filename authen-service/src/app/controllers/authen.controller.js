const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey =
  "68b9fd4f6a35be2b7851f41bf092b048a738dd26474fab85fb6540180f640f67";
const UserRole = {
  ADMIN: 1,
  LIBRARIAN: 2,
  READER: 3,
};
const { fileToFileName } = require("../services/image-uploader.service");
const Validation = require("../models/validation-code");

function encodeHmacSha256(data, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(data);
  return hmac.digest("hex");
}

// Bearer token
async function tokenValidation(req, res, callback) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }
  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) {
      res.status(403).json({
        message: "Invalid Token",
        payload: payload,
      });
      return;
    }
    await callback(req, res, payload);
  });
}

// const filterNonNullProperties = (obj) => {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([key, value]) => value !== null)
//   );
// };

class AuthenControllers {
  // [POST] /v3/register
  /**
   * Body: {
   *   userInfoList = [
   *        {username: string, email: string , fullname: string, roleId: number, phoneNumber: string }
   *    ]
   * }
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async register(req, res) {
    await tokenValidation(req, res, async (req, res, payload) => {
      if (payload.roleId !== UserRole.ADMIN) {
        res.status(403).json({ message: "FOBIDENT" });
        return;
      }
      var { userInfoList } = req.body; // is type [{username: string, email: string , fullname: string, roleId: number, phoneNumber: string }]
      var newUserList = [];
      var registerIds = userInfoList.map((item) => item.username);
      // Find collap username
      const users = (await User.find({ username: { $in: registerIds } })).map(
        (item) => item.username
      );
      if (users.length > 0) {
        // Remove collap input
        userInfoList = userInfoList.filter(
          (item) => !users.includes(item.username)
        );
      }
      userInfoList.forEach((item) => {
        const newUser = new User({
          username: item.username,
          password: encodeHmacSha256("12345678", secretKey),
          fullname: item.fullname,
          roleId: item.roleId,
          updatedAt: new Date(),
          phoneNumber: item.phoneNumber,
          initDate: new Date(),
          email: item.email,
          isActivated: false,
          delFlg: false,
        });
        newUserList.push(newUser);
      });
      await User.insertMany(newUserList);
      res.status(200).json({ data: newUserList });
    });
  }

  // [POST] /v3/login
  /**
   * body: {username: string, password: string}
   * @param {*} req
   * @param {*} res
   */
  async login(req, res) {
    const { username, password } = req.body;
    const account = await User.find(
      {
        username: username,
        password: encodeHmacSha256(password, secretKey),
        delFlg: false,
      },
      "id username fullname roleId isActivated email imageUrl"
    );
    if (account.length) {
      let payload = {
        id: account[0]._id,
        username: account[0].username,
        fullname: account[0].fullname,
        roleId: account[0].roleId,
        isActivated: account[0].isActivated,
        email: account[0].email,
        imageUrl: account[0].imageUrl,
      };
      let token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      res.status(200).json({ token: token });
    } else {
      res.status(404).json({ message: "not-found or exprired" });
    }
  }

  // [POST] /v3/validate
  async validate(req, res) {
    tokenValidation(req, res, (req, res, payload) => {
      res.status(200).json({
        message: "Token is valid",
        payload: payload,
      });
    });
  }

  // [PUT] /v3/update
  /**
   * Body: {
   *    username: string,
   *    email: string ,
   *    fullname: string,
   *    roleId: number,
   *    phoneNumber: string,
   *    imageFile: File
   * }
   *
   * trong trường hợp ảnh không đổi thì không cần truyền theo param imageFile
   * ngoài ra các param khác phải truyền đầy đủ
   *
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      const { username, email, fullname, roleId, phoneNumber } = req.body;
      if (payload.roleId === UserRole.ADMIN || payload.username === username) {
        let bodyData = {
          email: email,
          fullname: fullname,
          roleId: roleId,
          phoneNumber: phoneNumber,
        };
        if (req.files) {
          let imageUrl = fileToFileName(req.files)[0];
          bodyData = {
            ...bodyData,
            imageUrl: imageUrl,
          };
        }
        let result = await User.findOneAndUpdate(
          { username: username },
          bodyData
        );
        result = {
          roleId: result.roleId,
          imageUrl: result.imageUrl,
          fullname: result.fullname,
          phoneNumber: result.phoneNumber,
          updatedAt: result.updatedAt,
          isActivated: result.isActivated,
          initDate: result.initDate,
          delFlg: result.delFlg,
          username: result.username,
          password: result.password,
          email: result.email,
          ...bodyData,
        };
        res.status(200).json({ data: result });
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    });
  }

  //   [PUT] /v3/change-password
  async changePassword(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      const { oldPassword, newPassword } = req.body;
      const username = payload.username;
      const account = await User.findOneAndUpdate(
        {
          username: username,
          password: encodeHmacSha256(oldPassword, secretKey),
        },
        { password: encodeHmacSha256(newPassword, secretKey) }
      );
      if (account) {
        res.status(200).json({ message: "Change password successfuly" });
        return;
      }
      res.status(404).json({ message: "Change password not found" });
    });
  }

  //   [PUT] /v3/reset-password
  /**
   * body: {
   *  email: string,
   *  code: string,
   *  newPassword: string
   * }
   * @param {*} req 
   * @param {*} res 
   */
  async resetPassword(req, res) {
    const { email, code, newPassword } = req.body;
    try {
      const validationCode = await Validation.findOne({email: email, code: code});
      if(
        validationCode
        && (new Date() - validationCode.initDate < (5 * 60 * 1000))
      ) {
        // update password for user with email and new password
        await User.findOneAndUpdate( {email: email}, {password: encodeHmacSha256(newPassword, secretKey)});
        // delete validation code
        await Validation.deleteOne({ email: email, code: code });
        res.status(200).json({ message: "Reset password successfuly" });
      } else {
        res.status(404).json({ message: "Validation code not found or expired." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }

  //   [GET] /v3/get-info
  /**
   * Get current user info
   * @param {*} req
   * @param {*} res
   */
  async getAccountInfo(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      const accountData = await User.findById(
        payload.id,
        "_id username email fullname phoneNumber roleId isActivated imageUrl"
      );
      if (accountData) {
        res.status(200).json(accountData);
        return;
      }
      res.status(404).json({ message: "Account not found." });
    });
  }

  //  [POST] /v3/get-infos
  /**
   * Body: { page: number, recordsPerPage: number }
   * @param {*} req
   * @param {*} res
   */
  async getUserInfos(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      if (payload.roleId == UserRole.ADMIN) {
        let { page, recordsPerPage } = req.body;
        if (!page) page = 1;
        if (!recordsPerPage) recordsPerPage = 1;
        page = Math.max(1, page);
        recordsPerPage = Math.max(1, recordsPerPage);
        const skip = (page - 1) * recordsPerPage;
        const users = await User.find({ delFlg: false })
          .skip(skip)
          .limit(recordsPerPage)
          .sort({ updatedAt: -1 });
        res.status(200).json({ data: users });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  // [POST] "/v3/get-infos"
  /**
   * Body: { page: number, recordsPerPage: number }
   * @param {*} req
   * @param {*} res
   */
  async getAdminInfos(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      if (payload.roleId == UserRole.ADMIN) {
        let { page, recordsPerPage } = req.body;
        if (!page) page = 1;
        if (!recordsPerPage) recordsPerPage = 1;
        page = Math.max(1, page);
        recordsPerPage = Math.max(1, recordsPerPage);
        const skip = (page - 1) * recordsPerPage;
        const users = await User.find({ roleId: UserRole.ADMIN, delFlg: false })
          .skip(skip)
          .limit(recordsPerPage)
          .sort({ updatedAt: -1 });
        res.status(200).json({ data: users });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  // [POST] "/v3/get-infos"
  /**
   * Body: { page: number, recordsPerPage: number }
   * @param {*} req
   * @param {*} res
   */
  async getLibrarianInfos(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      if (payload.roleId == UserRole.ADMIN) {
        let { page, recordsPerPage } = req.body;
        if (!page) page = 1;
        if (!recordsPerPage) recordsPerPage = 1;
        page = Math.max(1, page);
        recordsPerPage = Math.max(1, recordsPerPage);
        const skip = (page - 1) * recordsPerPage;
        const users = await User.find({
          roleId: UserRole.LIBRARIAN,
          delFlg: false,
        })
          .skip(skip)
          .limit(recordsPerPage)
          .sort({ updatedAt: -1 });
        res.status(200).json({ data: users });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  // [POST] "/v3/get-infos"
  /**
   * Body: { page: number, recordsPerPage: number }
   * @param {*} req
   * @param {*} res
   */
  async getReaderInfos(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      if (payload.roleId == UserRole.ADMIN) {
        let { page, recordsPerPage } = req.body;
        if (!page) page = 1;
        if (!recordsPerPage) recordsPerPage = 1;
        page = Math.max(1, page);
        recordsPerPage = Math.max(1, recordsPerPage);
        const skip = (page - 1) * recordsPerPage;
        const users = await User.find({
          roleId: UserRole.READER,
          delFlg: false,
        })
          .skip(skip)
          .limit(recordsPerPage)
          .sort({ updatedAt: -1 });
        res.status(200).json({ data: users });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  // [POST] "/v3/get-infos"
  /**
   * Body: {
   *  fullName: string,
   *  page: number,
   *  recordsPerPage: number
   * }
   * @param {*} req
   * @param {*} res
   */
  async findUserInfosByFullName(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      if (payload.roleId == UserRole.ADMIN) {
        let { fullName, page, recordsPerPage } = req.body;
        if (!page) page = 1;
        if (!recordsPerPage) recordsPerPage = 1;
        if (!fullName || fullName === "") {
          res.status(400).json({ message: "Bad request" });
          return;
        }
        page = Math.max(1, page);
        recordsPerPage = Math.max(1, recordsPerPage);
        const skip = (page - 1) * recordsPerPage;
        const users = await User.find({
          fullname: { $regex: fullName, $options: "i" },
          delFlg: false,
        })
          .skip(skip)
          .limit(recordsPerPage)
          .sort({ updatedAt: -1 });
        res.status(200).json({ data: users });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  // [POST] /v3/get-user-infos-by-usernames"
  /**
   * body {
   *  usernames = string[],
   * }
   * @param {*} req
   * @param {*} res
   */
  async getUserInfosByUsernames(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      if (
        payload.roleId == UserRole.ADMIN ||
        payload.roleId == UserRole.LIBRARIAN
      ) {
        const { usernames } = req.body;
        if (!usernames || usernames.length === 0) {
          res.status(404).json({ message: "Not found" });
          return;
        }
        try {
          const records = await User.find({
            username: { $in: usernames },
          }).sort({ fullname: -1 });
          if (!records || records.length === 0) {
            res.status(404).json({ message: "Not found" });
            return;
          }
          res.status(404).json({ data: records });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  //  [GET] /v3/get-total
  async getTotalCount(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      if (payload.roleId === UserRole.ADMIN) {
        const adminTotal = await User.countDocuments({
          roleId: UserRole.ADMIN,
          delFlg: false,
        });
        const librarianTotal = await User.countDocuments({
          roleId: UserRole.LIBRARIAN,
          delFlg: false,
        });
        const readerTotal = await User.countDocuments({
          roleId: UserRole.READER,
          delFlg: false,
        });
        const total = adminTotal + librarianTotal + readerTotal;
        const adminPercent = (adminTotal * 100.0) / total;
        const librarianPercent = (librarianTotal * 100.0) / total;
        const readerPercent = (readerTotal * 100.0) / total;
        res.status(200).json({
          data: {
            total: {
              adminTotal: adminTotal,
              librarianTotal: librarianTotal,
              readerTotal: readerTotal,
            },
            percent: {
              adminPercent: adminPercent,
              librarianPercent: librarianPercent,
              readerPercent: readerPercent,
            },
          },
        });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  // [DELETE] "/v3/delete-accounts"
  /**
   * body {
   *    usernames: string[]
   * }
   *
   * @param {*} req
   * @param {*} res
   */
  async deleteAccounts(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      const { usernames } = req.body;
      if (payload.roleId === UserRole.ADMIN) {
        if (!usernames || usernames.length === 0) {
          res.status(404).json({ message: "Not found" });
          return;
        }
        const records = await User.updateMany(
          { username: { $in: usernames } },
          { delFlg: true }
        );
        res.status(200).json({ data: `Delete succesfull id: ${usernames}` });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }

  // [POST] "/v3/activate-account"
  /**
   * body: {
   *   code: string
   * }
   * @param {*} req
   * @param {*} res
   */
  async activateAccount(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      const { code } = req.body;
      const { id, email } = payload;
      const validationCode = await Validation.findOne({
        email: email,
        code: code,
      });
      console.log(code);
      console.log(email);
      console.log(validationCode);
      // check if validationCode is not null and not expired after 5 minutes
      if (
        validationCode &&
        (new Date() - validationCode.initDate < 5 * 60 * 1000)
      ) {
        await User.findOneAndUpdate({ _id: id }, { isActivated: true });
        const newPayload = {
          id: id,
          username: payload.username,
          fullname: payload.fullname,
          roleId: payload.roleId,
          isActivated: true,
          email: payload.email,
          imageUrl: payload.imageUrl,
        }
        let token = jwt.sign(newPayload, secretKey, { expiresIn: "1h" });
        // delete validation code
        await Validation.deleteOne({ email: email, code: code });
        res.status(200).json({ token: token });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    });
  }
}

module.exports = new AuthenControllers();
