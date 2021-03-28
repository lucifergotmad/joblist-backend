const express = require("express");
const { getUser } = require("../controllers/userControllers");
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getUser);

export default router;
