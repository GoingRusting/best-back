import "dotenv/config";
import Fastify from "fastify";
import { PrismaClient } from "./prisma/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const fastify = Fastify({ logger: false });

fastify.addHook("onRequest", async (request, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (request.method === "OPTIONS") {
    reply.status(204).send();
  }
});

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

fastify.get("/users", async function (_req, res) {
  try {
    const users = await prisma.users.findMany();
    res.send({ users });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Database fetch error" });
  }
});

fastify.post("/user", async function (req, res) {
  const { name, email } = req.body;
  try {
    const user = await prisma.users.create({ data: { name, email } });
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "User creation error" });
  }
});

fastify.get("/", function handler(request, reply) {
  console.log("query:", request.query);
  reply.send({ hello: "world" });
});

fastify.get("/health", async function health(_req, res) {
  res.send({ status: "working" });
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
