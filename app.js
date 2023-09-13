import server from "./server.js";

const PORT = 8080;
const HOST = "localhost";

server.listen(PORT, HOST, () => {
  console.log(`server is running at http://${HOST}:${PORT}`);
});
