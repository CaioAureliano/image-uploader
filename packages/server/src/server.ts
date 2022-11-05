import app from "./index";
import config from "./app/config";

app.listen(config.port, () => console.log("server started"));