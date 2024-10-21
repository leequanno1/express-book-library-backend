const authenRoute = require("./authen.route");

function route(app) {
    app.use("/v3", authenRoute);
}

module.exports = route;