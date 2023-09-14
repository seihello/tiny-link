// urls functions

// urls.js in controllers

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to read the URLs from the file
const readUrls = () => {
  const data = fs.readFileSync(
    path.join(__dirname, "../models/urls.json"),
    "utf8"
  );
  return JSON.parse(data);
};

// Function to write the URLs back to the file
const writeUrls = (urls) => {
  fs.writeFileSync(
    path.join(__dirname, "../models/urls.json"),
    JSON.stringify(urls, null, 2),
    "utf8"
  );
};

export { readUrls, writeUrls };
