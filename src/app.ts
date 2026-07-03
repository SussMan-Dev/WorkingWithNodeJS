import express from 'express';
import dotenv from "dotenv";
import userRoute from './routes/userRoute.js';
import { __dirname } from './config.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//SET VIEW ENGINE TO YOUR APP
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
//ALLOW READING DATA FROM FORM
app.use(express.urlencoded({ extended: true }));


//IMPORT STATIC FILE IMAGES/CSS/JS
app.use(express.static(__dirname + "/public"))

//ROUTE DECLARATION
app.get('/', (req, res) => {
    res.render("home.ejs")
});

//IMPORT ROUTE
userRoute(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
