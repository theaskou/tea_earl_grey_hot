import express from 'express';
const app = express();
const port = 8080;

app.use('/public', express.static('public')); // middleware til at serve static filer (lydklip fx) - Virker ikke med Vercel.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname =
    path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/timer.html');
});

addStaticRoutes(path.resolve(__dirname, "public"));

function addStaticRoutes(dir, baseURL = "") {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });

    files.forEach((file) => {
        const fullPath = path.join(dir, file.name);
        const routePath = path.join(baseURL, file.name).replace(/\\/g, "/");

        if (file.isDirectory()) {
            addStaticRoutes(fullPath, routePath);
        } else {
            app.get(`/${routePath}`, (req, res) => {
                res.sendFile(fullPath);
            });
        }
    });
}

app.listen(port, () => console.log(`Server is running on port: ${port}`));