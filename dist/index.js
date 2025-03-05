// server/index.js
import express2 from "express";

// server/routes.js
import { createServer } from "http";

// server/storage.js
var MemStorage = class {
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.apiBaseUrl = "https://flask-service-management.onrender.com";
  }
  async getUser(id) {
    const user = this.users.get(id);
    if (user) return user;
    try {
      const response = await fetch(`${this.apiBaseUrl}/users/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user from Flask:", error);
      return null;
    }
  }
  async getUserByUsername(username) {
    const user = Array.from(this.users.values()).find((user2) => user2.username === username);
    if (user) return user;
    try {
      const response = await fetch(`${this.apiBaseUrl}/users?username=${username}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user by username from Flask:", error);
      return null;
    }
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    try {
      const response = await fetch(`${this.apiBaseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(insertUser)
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const newUserFromBackend = await response.json();
      this.users.set(newUserFromBackend.id, newUserFromBackend);
      return newUserFromBackend;
    } catch (error) {
      console.error("Error creating user in Flask:", error);
      return user;
    }
  }
};
var storage = new MemStorage();

// server/routes.js
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.js
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var cartographerPlugin = [];
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0) {
  cartographerPlugin = [
    await import("@replit/vite-plugin-cartographer").then(
      (m) => m.cartographer()
    )
  ];
}
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...cartographerPlugin
    // Include the plugin conditionally
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "client", "src", "main.jsx")
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});

// server/vite.js
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(__dirname2, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.js
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, "0.0.0.0", () => {
    log(`Serving on port ${port}`);
  });
})();
