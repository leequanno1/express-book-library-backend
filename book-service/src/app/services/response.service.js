const dotenv = require("dotenv");
dotenv.config();
const VALIDATE_URL = process.env.VALIDATOR_API_URL || null;


function responseHandler(res, body) {
    let isNullBody = true;
    if (Array.isArray(body)) {
        isNullBody = false
    } else if (body !== null && typeof body === "object") {
        isNullBody = false
    }
    if(!isNullBody) {
        res.status(200).json(body)
        return;
    }
    res.status(404).json({message: "Not found"});
}

function errorResponseHandler(res, err ) {
    res.status(500).json({message: err.message})
}

async function validatorAdminHandler(req, res, callback) {
    if(VALIDATE_URL) {
        try {
            let validateRes = await fetch(`${VALIDATE_URL}/v3/validate`, {
                method: "POST",
                headers: req.headers,
            });
            if(validateRes.status === 200){
                role = (await validateRes.json()).payload.role;
                if(role === "admin"){
                    await callback(req,res);
                    return;
                }
                res.status(403).json({message: 'Fobident'});
                return;
            }
            res.status(401).json({message: 'Access denined'});
        } catch(err) {
            res.status(500).json({message: 'Validation host URL exception'});
            return;
        }
    }
    res.status(500).json({message: 'Validation host URL error'});
}

module.exports = {responseHandler, errorResponseHandler, validatorAdminHandler};