const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 8080;

// CS5356 TODO #2
// Uncomment this next line after you've created
// serviceAccountKey.json
const serviceAccount = require("./config/serviceAccountKey.json");
const userFeed = require("./app/user-feed");
const exploreFeed = require("./app/explore-feed");
const authMiddleware = require("./app/auth-middleware");
const { syncBuiltinESMExports } = require("module");
const twilio = require("twilio");
// const { restart } = require("nodemon");

// CS5356 TODO #2
// Uncomment this next block after you've created serviceAccountKey.json
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 });

// use cookies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static("static/"));

// use res.render to load up an ejs view file
// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/sign-in", function (req, res) {
  res.render("pages/sign-in");
});

app.get("/sign-up", function (req, res) {
  res.render("pages/sign-up");
});

app.get("/dashboard", authMiddleware, async function (req, res) {
  const feed = await userFeed.get();
  const explore = await exploreFeed.get();
  res.render("pages/dashboard", { user: req.user, feed, explore });
});

app.get("/admin", function (req, res) {
  res.render("pages/admin", {nodeEnv: process.env.TWILIO_AUTH_TOKEN });
});
 
app.get("/admin-success", function (req, res){
  res.render("pages/admin-success");
});

app.post("/sessionLogin", async (req, res) => {
  const body = req.body;
  const idToken = body.idToken;
  
  const expiresIn = 3600 * 1000;
  admin.auth().createSessionCookie(idToken, {expiresIn})
  .then(
    (sessionCookie) => {
      const options = {maxAge: expiresIn, httpOnly: true, secure: true};
      res.cookie('__session', sessionCookie, options);
      res.status(201).send(JSON.stringify({ status: 'sucess'}));
    },
    (error) => {
      debugger
      res.status(401).send(error.toString());
    }
  )
});



app.get("/sessionLogout", (req, res) => {
  res.clearCookie("__session");
  res.redirect("/sign-in");
});

app.post("/small-talk", authMiddleware, async (req, res) => {
  // CS5356 TODO #5
  // Get the message that was submitted from the request body
  // Get the user object from the request body
  // Add the message to the userFeed so its associated with the user
  const smallTalk = req.body

  await userFeed.add(req.user, smallTalk.question, smallTalk.answer)
  res.redirect("/dashboard");
});

//app.listen(port);
//console.log("Server started at http://localhost:" + port);
app.post("/send-message", authMiddleware, async(req, res) => {
  const question = req.body
  await userFeed.sendmessage(req.user,  question.question)
  res.redirect("/admin-success");
});

exports.app = functions.https.onRequest(app);



