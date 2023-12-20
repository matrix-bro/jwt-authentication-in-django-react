const express = require("express");
const axios = require("axios");
const cookie = require("cookie");

const router = express.Router();

router.post("/api/login", async (req, res) => {
  try {
    const url = `${process.env.API_URL}/api/token/`;

    const data = req.body;

    const response = await axios.post(url, data);

    if (response.status === 200) {
      res.header("Set-Cookie", [
        cookie.serialize("access", response.data.access, {
          httpOnly: true,
          maxAge: 60 * 30, // 30 minutes
          path: "/api/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production", // only set secure to true if in production
        }),
        cookie.serialize("refresh", response.data.access, {
          httpOnly: true,
          maxAge: 60 * 60 * 24, // 1 day
          path: "/api/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
      ]);
      return res.status(response.status).json({
        success: "Logged in successfully.",
      });
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(error.response.status).json({
      error: "Something went wrong when logging in.",
      data: error.response.data,
    });
  }
});

module.exports = router;
