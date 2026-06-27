// Run this script with: node day1/app.js or node day1/app
// console.log("hello nodejs environment");

import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// dotenv loads environment variables from a .env file.
// It is commonly used to store private information like PORT, API keys, or database URLs.
// If you add .env to .gitignore, it will not be pushed to GitHub.
const port = process.env.PORT || 3000;

// app.get() defines a route for a specific URL path.
// For example, "/" means localhost:3000/
// If you create "/student", it means localhost:3000/studentƯ
app.get('/', (req, res) => { //req is request and res is respond
    res.send('Hello World! Sigma Boi');
});

// app.listen() starts the server on the selected port.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});