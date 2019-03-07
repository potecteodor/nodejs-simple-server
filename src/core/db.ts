import { AppSetting } from "../config";

const mdb = require("mongoose");

const settings = AppSetting.getConfig()

mdb.connect(
  `mongodb://${settings.DBConnections.mongo.host}:${settings.DBConnections.mongo.port}/${settings.DBConnections.mongo.dbName}`,
  { useNewUrlParser: true }
);

export default mdb;
