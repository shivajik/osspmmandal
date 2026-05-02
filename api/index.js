const http = require("node:http");
const crypto = require("node:crypto");
const { MongoClient } = require("mongodb");

let mongoClientPromise;
const memoryStore = {
  status_checks: [],
  contact_submissions: [],
};

function getAllowedOrigin(origin) {
  const configured = process.env.CORS_ORIGINS || "*";
  const allowed = configured.split(",").map((item) => item.trim()).filter(Boolean);
  if (allowed.includes("*")) return "*";
  return origin && allowed.includes(origin) ? origin : allowed[0] || "*";
}

function setCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", getAllowedOrigin(req.headers.origin));
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

async function getDb() {
  if (!process.env.MONGO_URL) return null;
  if (!mongoClientPromise) {
    mongoClientPromise = new MongoClient(process.env.MONGO_URL).connect();
  }
  const client = await mongoClientPromise;
  return client.db(process.env.DB_NAME || "osspm");
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validationError(detail) {
  return { detail };
}

async function handleStatus(req, res) {
  const db = await getDb();
  if (req.method === "GET") {
    const items = db
      ? await db.collection("status_checks").find({}, { projection: { _id: 0 } }).limit(1000).toArray()
      : memoryStore.status_checks.slice(0, 1000);
    return sendJson(res, 200, items);
  }

  if (req.method === "POST") {
    const payload = await readJson(req);
    const clientName = cleanString(payload.client_name);
    if (!clientName) return sendJson(res, 422, validationError("client_name is required"));

    const item = {
      id: crypto.randomUUID(),
      client_name: clientName,
      timestamp: new Date().toISOString(),
    };
    if (db) await db.collection("status_checks").insertOne(item);
    else memoryStore.status_checks.unshift(item);
    return sendJson(res, 200, item);
  }

  return sendJson(res, 405, validationError("Method not allowed"));
}

async function handleContact(req, res) {
  const db = await getDb();
  if (req.method === "GET") {
    const items = db
      ? await db.collection("contact_submissions").find({}, { projection: { _id: 0 } }).sort({ created_at: -1 }).limit(500).toArray()
      : memoryStore.contact_submissions.slice().sort((a, b) => b.created_at.localeCompare(a.created_at));
    return sendJson(res, 200, items);
  }

  if (req.method === "POST") {
    const payload = await readJson(req);
    const name = cleanString(payload.name);
    const email = cleanString(payload.email);
    const subject = cleanString(payload.subject);
    const message = cleanString(payload.message);

    if (!name) return sendJson(res, 422, validationError("name is required"));
    if (!email || !isEmail(email)) return sendJson(res, 422, validationError("valid email is required"));
    if (!message) return sendJson(res, 422, validationError("message is required"));

    const item = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString(),
    };
    if (db) await db.collection("contact_submissions").insertOne(item);
    else memoryStore.contact_submissions.unshift(item);
    return sendJson(res, 200, item);
  }

  return sendJson(res, 405, validationError("Method not allowed"));
}

async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const route = url.pathname.replace(/^\/api\/?/, "/");

    if (route === "/" || route === "") return sendJson(res, 200, { message: "OSSPM API is live" });
    if (route === "/status") return handleStatus(req, res);
    if (route === "/contact") return handleContact(req, res);
    return sendJson(res, 404, validationError("Not found"));
  } catch (error) {
    console.error("API error", error);
    return sendJson(res, 500, validationError("Internal server error"));
  }
}

module.exports = handler;

if (require.main === module) {
  const port = Number(process.env.PORT || 5000);
  http.createServer(handler).listen(port, () => {
    console.log(`OSSPM API running on http://localhost:${port}/api`);
  });
}