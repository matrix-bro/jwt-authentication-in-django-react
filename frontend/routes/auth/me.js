const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/api/users/me", async (req, res) => {
  const { access } = req.cookies;

  try {
    const url = `${process.env.API_URL}/api/me/`;

    const config = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };
    const response = await axios.get(url, config);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error.response.data);
    return res.status(500).json({
      error: "Something went wrong when retrieving the user.",
    });
  }
});

module.exports = router;
