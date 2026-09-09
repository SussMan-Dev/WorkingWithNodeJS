import express from 'express';
import dotenv from "dotenv";
import path from 'node:path';
import { registerUserRoutes } from './routes/user.route.js';
import { registerAuthRoute } from './routes/auth.route.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Resolve runtime assets from the project root. Keeping views outside `src`
// ensures they are available both from compiled `dist` code and on Vercel.
const projectRoot = process.cwd();

//SET VIEW ENGINE TO YOUR APP
app.set("view engine", "ejs")
app.set("views", path.join(projectRoot, "views"));

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

// Vercel invokes the exported Express application as a function. Keep the
// listener only for local development and traditional Node deployments.
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

export default app;
