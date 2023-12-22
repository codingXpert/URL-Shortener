import express from 'express';
import User from '../routes/user.js';

const router = express.Router();
router.use("/user", User);

export default router;

