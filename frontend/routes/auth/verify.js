const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/api/token/verify", async (req, res) => {
  const { access } = req.cookies; // using cookie-parser to parse the cookie

  const url = `${process.env.API_URL}/api/token/verify/`;

  // have to send data like this
  const data = {
    token: access,
  };

  try {
    const response = await axios.post(url, data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong when verifying login status.",
    });
  }
});

module.exports = router;
