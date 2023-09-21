import server from "./server.js";

const PORT = process.env.PORT || 8080;
// const HOST = "localhost";

server.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
