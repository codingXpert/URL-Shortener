import Url from "../models/url.js";
import shortid from "shortid";

// creating short url
const sortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (originalUrl) {
      const shortUrl = shortid.generate();
      const urlData = new Url({
        originalUrl: originalUrl,
        shortedUrl: shortUrl,
        user: "658548a5e02f1e14964baae2",
      });
      await urlData.save();
      res.status(200).json({
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
