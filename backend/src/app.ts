import express from 'express';
import dotenv from "dotenv";
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextFunction, Request, Response } from 'express';
import { registerUserRoutes } from './routes/user.route.js';
import { registerAuthRoute } from './routes/auth.route.js'
import { registerProductRoute } from './routes/product.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Vercel may use a different working directory at runtime. Resolve views from
// both the module location and the working directory so source and dist builds
// behave consistently.
const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(moduleDirectory, "..");
const viewCandidates = [
    path.join(packageRoot, "views"),
    path.join(process.cwd(), "views"),
];
const viewsDirectory = viewCandidates.find((directory) =>
    existsSync(path.join(directory, "home.ejs"))
) ?? viewCandidates[0];

//SET VIEW ENGINE TO YOUR APP
app.set("view engine", "ejs")
app.set("views", viewsDirectory);

//ALLOW READING DATA FROM FORM AND HANDLE JSON REQUEST
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


//IMPORT STATIC FILE IMAGES/CSS/JS
app.use(express.static(path.join(packageRoot, "public")));

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
// registerProductRoute(app)

app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error(`Unhandled error for ${req.method} ${req.originalUrl}:`, error);
    res.status(500).send("Internal Server Error");
});

// Vercel invokes the exported Express application as a function. Keep the
// listener only for local development and traditional Node deployments.
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

export default app;
