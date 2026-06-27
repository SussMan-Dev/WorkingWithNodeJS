import express from 'express';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
//SET VIEW ENGINE TO YOUR APP
app.set("view engine", "ejs")
app.set("views", "./src/views")

//ROUTE DECLARATION
app.get('/', (req, res) => {
    res.render("home.ejs")
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});