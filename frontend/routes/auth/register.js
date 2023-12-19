const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/api/register", async (req, res) => {
  try {
    const url = `${process.env.API_URL}/api/register/`;
    const data = req.body;

    const response = await axios.post(url, data);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(error.response.status).json({
      error: "Something went wrong when registering account",
      data: error.response.data,
    });
  }
});

module.exports = router;
