import express from 'express';
import urlController from '../controllers/urlController.js';
import passport from 'passport';
import passportConfig from '../config/passport-jwt-strategy.js';


const router = express.Router();
router.post("/shorten", passport.authenticate('jwt', { session: false }),  urlController.sortUrl);
router.get("/:url", passport.authenticate('jwt', { session: false }), urlController.accessOriginalUrl);

export default router;