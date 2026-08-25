import express from 'express';
import dotenv from "dotenv";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { registerUserRoutes } from './routes/user.route.js';
import { registerAuthRoute } from './routes/auth.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//SET VIEW ENGINE TO YOUR APP
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

//ALLOW READING DATA FROM FORM AND HANDLE JSON REQUEST
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


//IMPORT STATIC FILE IMAGES/CSS/JS
app.use(express.static(path.join(__dirname, "public")));

//ROUTE DECLARATION
app.get('/', (_req, res) => {
    res.render("home.ejs")
});
registerUserRoutes(app)
registerAuthRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
