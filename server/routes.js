import { createServer } from "http";
import { storage } from "./storage.js";

export async function registerRoutes(app) {
  // Put application routes here
  // Prefix all routes with /api

  // Use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
