const cookieSession = require("cookie-session");
const express = require("express");
require("dotenv").config();
const passport = require("passport");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const app = express();
const cors = require("cors");
const { PORT = 8080 } = process.env;

app.use(
  cookieSession({
    name: "session",
    keys: ["merdeka"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.clear();
  console.log(`server is running`);
});
