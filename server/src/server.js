const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const {ErrorMiddleware} = require("./middlewares/error-middleware");
const {routerApi} = require("./API/api.router")
const {appRouter} = require("./API/routers/app.router")
const {application} = require("../config/config")

const app = express();


const run = async () => {

    const corsOptions = {
        origin: (origin, callback) => {
            if (application.cors.whiteList.indexOf(origin) !== -1 || origin === undefined) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }, credentials: true
    };


    app
        .use(cors(corsOptions))
        .use(bodyParser.json())
        .use(cookieParser())
        .use('/api', routerApi)
        .use(express.static(path.join(__dirname, 'public')))
        .use(express.static(path.join(__dirname, 'public/app')))
        .use('/', appRouter)
        .use(ErrorMiddleware)
        .listen(application.port, () => {
            console.info(`App start: http://${application.domain}:${application.port}`);
        });
}

module.exports = {run}