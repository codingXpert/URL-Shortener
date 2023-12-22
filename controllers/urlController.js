import Url from "../models/url.js";
import shortid from "shortid";
import passport from "../config/passport-jwt-strategy.js";

// creating short url
const sortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId =req.user.id;
    if (originalUrl) {
      const shortUrl = shortid.generate();
      const urlData = new Url({
        originalUrl: originalUrl,
        shortedUrl: shortUrl,
        user: userId,
      });
      await urlData.save();
      res.status(201).json({
        status: "success",
        originalUrl: originalUrl,
        shortedUrl: `http://localhost:8000/${shortUrl}`,
      });
    } else {
      res.status(400).json({ status: "failed", message: "Please provide url" });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "error in shorting the url",
      error: error.message,
    });
  }
};

// accessing the original url using short url
const accessOriginalUrl = async (req, res) => {
  try {
    const { url } = req.params;
    if (url) {
      const urlData = await Url.findOne({ shortedUrl: url });
      if (urlData) {
        res.redirect(urlData.originalUrl);
      } else {
        res.status(400).json({ status: "failed", message: "Invalid Url" });
      }
    } else {
      res.status(400).json({ status: "failed", message: "Please provide url" });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "error in accessing the url",
      error: error.message,
    });
  }
};

export default {
  sortUrl,
  accessOriginalUrl,
};
