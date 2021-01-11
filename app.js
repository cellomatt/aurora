const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { restoreUser } = require("./utils/auth");
const { sequelize } = require("./db/models");
const { sessionSecret, db } = require("./config");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
const logoutRouter = require("./routes/logout");
const questionsRouter = require("./routes/questions");
const homeRouter = require("./routes/home");
const topicsRouter = require("./routes/topics");
const answersRouter = require("./routes/answers");
const commentsRouter = require("./routes/comments");
const searchRouter = require("./routes/search");

const app = express();

app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, "public")));

const store = new SequelizeStore({
    db: sequelize,
});

app.use(
    session({
        name: "aurora.sid",
        secret: sessionSecret,
        store,
        saveUninitialized: false,
        resave: false,
        cookie: {
            httpOnly: true,
            maxAge: 1800000,
            path: "/",
            // secure: true,
        },
    })
);

store.sync();

app.use(restoreUser);

app.use("/", homeRouter);
app.use("/logout", logoutRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/questions", questionsRouter);
app.use("/topics", topicsRouter);
app.use("/answers", answersRouter);
app.use("/comments", commentsRouter);
app.use("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
