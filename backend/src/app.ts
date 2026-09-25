import dotenv from "dotenv";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextFunction, Request, Response } from "express";
import { registerAuthRoute } from "./routes/auth.route.js";
import { registerProductRoute } from "./routes/product.route.js";
import { registerRoleRoute } from "./routes/role.route.js";
import { registerUserRoutes } from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(moduleDirectory, "..");
const frontendDirectory = path.resolve(packageRoot, "../frontend/dist");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

registerUserRoutes(app);
registerAuthRoute(app);
registerProductRoute(app);
registerRoleRoute(app);

app.use("/api", (_req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
});

if (existsSync(path.join(frontendDirectory, "index.html"))) {
    app.use(express.static(frontendDirectory));
    app.get("*", (_req, res) => {
        res.sendFile(path.join(frontendDirectory, "index.html"));
    });
} else {
    app.get("/", (_req, res) => {
        res.status(200).json({
            message: "UserHub API is running. Start the Vite frontend for the user interface.",
        });
    });
}

app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error(`Unhandled error for ${req.method} ${req.originalUrl}:`, error);
    res.status(500).json({ message: "Internal Server Error" });
});

if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`UserHub server listening on port ${port}`);
    });
}

export default app;
