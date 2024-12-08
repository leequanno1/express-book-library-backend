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

function encodeHmacSha256(data, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(data);
  return hmac.digest("hex");
}

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

const filterNonNullProperties = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== null)
  );
};

class AuthenControllers {
  // [POST] /v3/register
  /**
   * Body: {userInfoList = [{username: string, email: string , fullname: string, roleId: number, phoneNumber: string }]}
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async register(req, res) {
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
        password: encodeHmacSha256("1234567", secretKey),
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
      { username: username, password: encodeHmacSha256(password, secretKey) },
      "id username fullname roleId isActivated"
    );
    if (account.length) {
      let payload = {
        id: account[0].id,
        username: account[0].username,
        fullname: account[0].fullname,
        roleId: account[0].roleId,
        isActivated: account[0].isActivated,
      };
      let token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      res.status(200).json({ token: token });
    } else {
      res.status(404).json({ message: "not-found" });
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
   * Body: { username: string, email: string , fullname: string, roleId: number, phoneNumber: string }
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    tokenValidation(req, res, async (req, res, payload) => {
      const bodyData = filterNonNullProperties(req.body);
      if (
        payload.roleId === UserRole.ADMIN ||
        payload.username === bodyData.username
      ) {
        // role admin
        let updatedUser = await User.findOne({ username: bodyData.username });
        if (!updatedUser) {
          res.status(404).json({ message: "Not found" });
          return;
        }
        Object.assign(updatedUser, bodyData);
        const user = new User({
          fullname: updatedUser.fullname,
          phoneNumber: updatedUser.phoneNumber,
          roleId: updatedUser.roleId,
          updatedAt: updatedUser.updatedAt,
          isActivated: updatedUser.isActivated,
          initDate: updatedUser.initDate,
          delFlg: updatedUser.delFlg,
          username: updatedUser.username,
          password: updatedUser.password,
          email: updatedUser.email,
        });
        updatedUser.save();
        res.status(200).json(user);
      } else {
        res.status(403).json({ message: "Fobident" });
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
        "_id username email fullname phoneNumber roleId isActivated"
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
        page = Math.max(1, page);
        recordsPerPage = Math.max(1, recordsPerPage);
        const skip = (page - 1) * recordsPerPage;
        const users = await User.find()
          .skip(skip)
          .limit(recordsPerPage)
          .sort({ updatedAt: -1 });
        res.status(200).json({ data: users });
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
        res.status(200).json({
          data: {
            adminTotal: adminTotal,
            librarianTotal: librarianTotal,
            readerTotal: readerTotal,
          },
        });
      } else {
        res.status(403).json({ message: "Fobident" });
      }
    });
  }
}

module.exports = new AuthenControllers();
