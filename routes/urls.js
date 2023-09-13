import express from "express";
const urlsRouter = express.Router();

urlsRouter.get("/", (req, res) => {
  res.render("urls"); // This will render the urls.ejs file
});

urlsRouter.get("/new", (req, res) => {
  res.render("newUrl");
});

// Route for editing a single URL by its ID
urlsRouter.get("/:id/edit", (req, res) => {
  const urlId = req.params.id; // Get the ID from the route parameter
  // If necessary, you can use the urlId to fetch additional data before rendering
  res.render("singleUrl", { id: urlId }); // Pass the ID to the template if required
});

export default urlsRouter;
