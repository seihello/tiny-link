import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getUrls = (req, res) => {
  const urls = readUrls();
  const filteredUrls = filterUrls(urls, req.session.userId);
  res.render("urls", { urls: filteredUrls });
}

export const getPage = (req, res) => {
  const alias = req.params.id; // Extracting the alias from the request parametervs
  const urls = readUrls(); // Fetching all stored URLs

  // Attempt to find the long URL associated with the given alias
  const foundUrl = Object.values(urls).find((url) => url.shortUrl === alias);

  if (foundUrl) {
    res.redirect(foundUrl.longUrl); // Redirect to the actual (long) URL
  } else {
    res.status(404).send("<h2>Error: Short URL not found</h2>"); // Return 404 error if URL is not found
  }
}

export const getNew = (req, res) => {
  res.render("newUrl"); // Render the "newUrl" view
}

export const postNew = (req, res) => {
  let urls = readUrls();
  const longUrl = req.body.longUrl;
  const shortUrlAlias = generateShortUrl();

  urls[shortUrlAlias] = {
    shortUrl: shortUrlAlias,
    longUrl: longUrl,
    userId: req.session.userId
  };

  writeUrls(urls);
  res.redirect(`/urls`);
}

export const getId = (req, res) => {
  const urlId = req.params.id;
  const urls = readUrls();
  const urlToEdit = urls[urlId];

  if (!urlToEdit) {
    return res.status(404).send("URL not found");
  }

  res.render("singleUrl", {
    id: urlId,
    url: urlToEdit.longUrl,
    shortUrlAlias: urlToEdit.shortUrl, // Ensure this line is present
  });
}

export const postId = (req, res) => {
  const urlId = req.params.id;
  const updatedLongUrl = req.body.updatedUrl; // Note the change here
  let urls = readUrls();

  if (!urls[urlId]) {
    return res.status(404).send("URL not found");
  }

  if (updatedLongUrl && updatedLongUrl.trim() !== "") {
    urls[urlId].longUrl = updatedLongUrl; // Updating the long URL
  }

  writeUrls(urls);
  res.redirect("/urls");
}

export const getDeleteId = (req, res) => {
  const urlId = req.params.id;
  let urls = readUrls();

  if (!urls[urlId]) {
    return res.status(404).send("<h2>Error: URL not found</h2>");
  }

  delete urls[urlId];
  writeUrls(urls);
  res.redirect("/urls");
}


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

function generateShortUrl() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function filterUrls(urls, userId) {
  const filteredUrls = {};
  for (let [key, value] of Object.entries(urls)) {
    if(value.userId === userId) {
      filteredUrls[key] = value;
    }
  }
  return filteredUrls;
}