// urls.js

import express from "express"; // Express library for web framework
import { readUrls, writeUrls, generateShortUrl } from "../controllers/urls.js"; // Functions to read and write URLs

const urlsRouter = express.Router(); // Initializing the express router

urlsRouter.use((req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.redirect("/login");
  }
});

// Route for rendering the form to create a new URL
urlsRouter.get("/new", (req, res) => {
  res.render("newUrl"); // Render the "newUrl" view
});

// Route to redirect to the actual (long) URL based on the short URL alias
urlsRouter.get("/u/:id", (req, res) => {
  const alias = req.params.id; // Extracting the alias from the request parameters
  const urls = readUrls(); // Fetching all stored URLs

  // Attempt to find the long URL associated with the given alias
  const foundUrl = Object.values(urls).find((url) => url.shortUrl === alias);

  if (foundUrl) {
    res.redirect(foundUrl.longUrl); // Redirect to the actual (long) URL
  } else {
    res.status(404).send("<h2>Error: Short URL not found</h2>"); // Return 404 error if URL is not found
  }
});

// Additional routes for editing, deleting, viewing, updating, and creating URLs follow...

// Route for editing a specific URL's alias
urlsRouter.get("/:id/edit", (req, res) => {
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
});

// Route for deleting a specific URL by ID
urlsRouter.get("/:id/delete", (req, res) => {
  const urlId = req.params.id;
  let urls = readUrls();

  if (!urls[urlId]) {
    return res.status(404).send("<h2>Error: URL not found</h2>");
  }

  delete urls[urlId];
  writeUrls(urls);
  res.redirect("/urls");
});

// Default route for viewing all URLs
urlsRouter.get("/", (req, res) => {
  const urls = readUrls();
  res.render("urls", { urls: urls });
});

// Route for updating the short URL alias of a specific URL by ID
urlsRouter.post("/:id", (req, res) => {
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
});

// Route for adding a new URL
urlsRouter.post("/", (req, res) => {
  let urls = readUrls();
  const longUrl = req.body.longUrl;
  const newId = Object.keys(urls).length + 1;
  const shortUrlAlias = generateShortUrl();

  urls[newId] = {
    shortUrl: shortUrlAlias,
    longUrl: longUrl,
  };

  writeUrls(urls);
  res.redirect(`/urls`);
});

export default urlsRouter;
