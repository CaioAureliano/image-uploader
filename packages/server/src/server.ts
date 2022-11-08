import app from "./index";
import config from "./app/config";
import logger from "pino";

app.listen(config.port, () => logger().info("server started"));