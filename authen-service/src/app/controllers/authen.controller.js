const Account = require("../models/account");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = '68b9fd4f6a35be2b7851f41bf092b048a738dd26474fab85fb6540180f640f67';

function encodeHmacSha256(data, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    return hmac.digest('hex');
}

class AuthenControllers {
    // [POST] /v3/register
    async register(req, res) {
        const {username, password} = req.body;
        const isExisted = await Account.find({username: username},'id');
        if(isExisted.length) {
            res.status(401).json({message: 'Account already exist'});
            return;
        }
        try {
            const newAccount = new Account({username: username, password: encodeHmacSha256(password,secretKey)});
            await newAccount.save();
            res.status(200).json({message: 'Account created successfully'});
        } catch(err) {
            res.status(400).json({message: 'Error creating account'});
        }
    };

    // [POST] /v3/login
    async login(req,res) {
        const {username, password} = req.body;
        const account = await Account.find({username: username, password: encodeHmacSha256(password,secretKey)}, 'id username role');
        if(account.length) {
            let payload = {
                id: account[0].id,
                username: account[0].username,
                role: account[0].role,
            }
            let token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
            res.status(200).json({token: token});
        }
        else{
            res.status(404).json({message: 'not-found'});
        }
    }

    // [POST] /v3/validate
    async validate(req, res) {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            res.status(401).json({message:'Access Denied'});
            return;
        }
        jwt.verify(token, secretKey, (err, payload) => {
            if (err) {
                res.status(403).json({
                    message:'Invalid Token',
                    payload: payload,
                });
                return;
            }
            res.status(200).json({
                message: "Token is valid",
                payload: payload,
            });
        });
    }
}

module.exports = new AuthenControllers;