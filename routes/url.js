import express from 'express';
import urlController from '../controllers/urlController.js';

const router = express.Router();
router.post("/shorten", urlController.sortUrl);
router.get("/:url", urlController.accessOriginalUrl);

export default router;