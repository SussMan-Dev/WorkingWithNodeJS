import express from 'express';
import dotenv from "dotenv";
import path from 'node:path';
import { registerUserRoutes } from './routes/user.route.js';
import { registerAuthRoute } from './routes/auth.route.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// TypeScript only compiles .ts files, so resolve EJS and static assets
// from the source directory instead of the generated dist directory.
const projectRoot = process.cwd();

//SET VIEW ENGINE TO YOUR APP
app.set("view engine", "ejs")
app.set("views", path.join(projectRoot, "src", "views"));

//ALLOW READING DATA FROM FORM AND HANDLE JSON REQUEST
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


//IMPORT STATIC FILE IMAGES/CSS/JS
app.use(express.static(path.join(projectRoot, "public")));

//ROUTE DECLARATION
// Used by Railway to verify that the application started successfully.
app.get('/health', (_req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get('/', (_req, res) => {
    res.render("home.ejs")
});
registerUserRoutes(app)
registerAuthRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
