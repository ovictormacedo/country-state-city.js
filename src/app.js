const { webServer } = require("./bootstrap/server")
const { router } = require("./bootstrap/router")
const { app } = require("./bootstrap/app")

main = async () => {
    router(app())
    webServer(app())
}

main();