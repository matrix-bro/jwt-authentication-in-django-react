const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const logoutRoute = require("./routes/auth/logout");
const verifyRoute = require("./routes/auth/verify");

const app = express();

app.use(express.json()); // middleware
app.use(cookieParser()); // parse cookie for auth verification

app.use(registerRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(verifyRoute);

app.use(express.static("project/dist"));
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "project", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
