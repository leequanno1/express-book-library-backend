const dotenv = require("dotenv");
dotenv.config();
const VALIDATE_URL = process.env.VALIDATOR_API_URL || null;
const { UserRoles } = require("../models/enums/user-role")

function responseHandler(res, body) {
    let isNullBody = true;
    if (Array.isArray(body)) {
        isNullBody = false
    } else if (body !== null && typeof body === "object") {
        isNullBody = false
    }
    if(!isNullBody) {
        res.status(200).json({data: body})
        return;
    }
    res.status(404).json({message: "Not found"});
}

function errorResponseHandler(res, err ) {
    res.status(500).json({message: err.message})
}

async function validatorAdminHandler(req, res, next) {
    if(VALIDATE_URL) {
        try {
            let validateRes = await fetch(`${VALIDATE_URL}/v3/validate`, {
                method: "POST",
                headers: req.headers,
            });
            if(validateRes.status === 200){
                role = (await validateRes.json()).payload.roleId;
                if(role === UserRoles.ADMIN){
                    next();
                    return;
                }
                res.status(403).json({message: 'Fobident'});
                return;
            }
            res.status(401).json({message: 'Access denined'});
            return;
        } catch(err) {
            res.status(500).json({message: 'Validation host URL exception'});
            return;
        }
    }
    res.status(500).json({message: 'Validation host URL error'});
}

module.exports = {responseHandler, errorResponseHandler, validatorAdminHandler};