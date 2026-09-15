import app from "./app.js";

async function startServer() {
  try {
    const port = 3000;
    const server = app.listen(port, () =>
      console.log(`Server listening on PORT:::${port}`),
    );

    server.on("error", (e) => {
      throw new Error(`Error starting to server. ERR: ${e.message}`);
    });
  } catch (error) {
    console.error(error.message || `Internal Server Error: ${error.message}`);
  }
}

startServer()