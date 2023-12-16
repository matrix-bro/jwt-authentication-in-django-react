const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("project/dist"));
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "project", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
