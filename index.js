import express from "express";
import dotEnv from "dotenv/config";
import db from "./config/mongoose.js";
import router from "./routes/index.js";
import passport from "passport";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import fs from "fs";

//security packages
import helmet from "helmet";
import xss_clean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
const PORT = process.env.PORT || 8000;
const yamlFilePath = "api.yaml";

//middlewares
app.use(helmet()); // secure our header section
app.use(xss_clean()); // checks and sanitize the input coming from POST, GET, params
app.use(mongoSanitize()); // middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection from(req.body, req.query or req.params).
app.use(cors({ origin: "*" }));
app.use(passport.initialize());
app.use(express.json());
app.use("/api", router);

// yaml file setup for swagger documentation
try {
  const fileContents = fs.readFileSync(yamlFilePath, "utf8");
  const swaggerDocument = YAML.parse(fileContents);

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (err) {
  console.error("Error reading or parsing the YAML file:", err);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
