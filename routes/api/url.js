const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");

const middleAuth = require("../../middleware/auth");

const Url = require("../../models/url");
const User = require("../../models/user");

router.get("/", middleAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("shortenedUrl")
      .exec();
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    } else {
      return res
        .status(200)
        .json({ msg: "User found", url: user.shortenedUrl });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

router.post("/compress", middleAuth, async (req, res) => {
  const { longUrl, lastDate, customCode } = req.body;

  // base url = "http://localhost:5000"
  const baseUrl = process.env.BASE_URL;
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).send({ msg: "Invalid Base Url" });
  }

  if (validUrl.isUri(longUrl)) {
    
    
    try {
      let url = await Url.findOne({ longUrl: longUrl });

      if (url) {
        res
          .status(400)
          .send({ msg: "Compressed URL already exists", url: url.shortUrl });
      } else {
        let urlCode;
        if (customCode) {
        urlCode = customCode;

        if (await Url.findOne({ code: urlCode })) {
          return res.status(409).send({ msg: "This code is already in use, try another code" });
        };

        } else {
          urlCode = shortId.generate();
        }
        
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          lastDate: lastDate,
          code: urlCode,
          creator: req.user.id,
        });
        const newUrl = await url.save();

        const user = await User.findById(req.user.id);
        await user.shortenedUrl.push(newUrl._id);
        await user.save();

        res
          .status(200)
          .json({ msg: "URL Compressed Successfully", url: newUrl });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  } else {
    res.status(401).send({ msg: "Invalid Long URL" });
  }
});

router.delete("/:id", middleAuth, async (req, res) => {
  const id = req.params.id;

  try {
    const url = await Url.findById(id);

    if (req.user.id !== url.creator.toString()) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const user = await User.findById(req.user.id);

    for (let i = 0; i < user.shortenedUrl.length; i++) {
      if (user.shortenedUrl[i].toString() === id) {
        user.shortenedUrl.splice(i, 1);
        break;
      }
    }
    await user.save();
    await url.deleteOne();

    res.status(200).json({ msg: "Short Url Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.patch("/:id", middleAuth, async (req, res) => {
  const id = req.params.id;

  try {
    const url = await Url.findById(id);

    if (req.user.id !== url.creator.toString()) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const { lastDate, status } = req.body;

    url.lastDate = lastDate;
    url.status = status;
    const newUrl = await url.save();
    res.status(200).json({ msg: "URL updated successfully", url: newUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
