import express from "express";
import path, { dirname } from "path";
import flash from "express-flash";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import expressLayouts from "express-ejs-layouts";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const configure = (app) => {
  app.set("view engine", "ejs");
  app.use(expressLayouts);
  app.set("layout", "layouts/layout");
  app.set("views", path.join(__dirname, "../views"));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(
    "/css",
    express.static(
      path.join(__dirname, "../../node_modules/bootstrap/dist/css")
    )
  );
  app.use(
    "/js",
    express.static(path.join(__dirname, "../../node_modules/bootstrap/dist/js"))
  );
  app.use(
    "/js",
    express.static(path.join(__dirname, "../../node_modules/jquery/dist"))
  );
  app.use("/helpers", express.static(path.join(__dirname, "../helpers")));
  app.use(
    "/icons",
    express.static(path.join(__dirname, "../../node_modules/boxicons"))
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    methodOverride(function (req) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        console.log("Method override fired. New method: ", method);
        return method;
      }
    })
  );
  app.use(cors({ origin: "*" }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      httpOnly: false,
      secure: false,
    })
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
};

export default configure;
