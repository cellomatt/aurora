const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const { sessionSecret, db } = require("./config");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");

const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1800000,
      path: "/",
      secure: true,
    },
  })
);

app.use((req, res, next) => {
  let { history } = req.session;
  if (!history) {
    history = [];
    req.session.history = history;
  }
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  history.unshift(url);
  next();
});

// create Session table if it doesn't already exist
store.sync();

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
