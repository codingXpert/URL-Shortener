import express from 'express';
import User from '../routes/user.js';
import Url from '../routes/url.js'

const router = express.Router();
router.use("/user", User);
router.use("/url", Url);

export default router;

