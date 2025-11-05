import express from "express";
import bodyParser from "body-parser";
import http from "http";
import soap from "soap";
import { sequelize } from "./db.js";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { service, xml } from "./soap/bookService.js"; // export them from the file

const app = express();
app.use(bodyParser.json());

// REST routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8443;

sequelize.sync().then(() => {
  const server = http.createServer(app);

  // Attach SOAP service to same HTTP server
  soap.listen(server, "/soap/bookservice", service, xml);

  server.listen(PORT, () => {
    console.log(`🚀 REST + SOAP running at http://localhost:${PORT}`);
    console.log(`🧼 SOAP WSDL: http://localhost:${PORT}/soap/bookservice?wsdl`);
  });
});
