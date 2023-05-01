import { PrismaClient } from "@prisma/client";

// The PrismaClient is the main class you use to interact with a database in Prisma. It's a query builder and ORM (Object-Relational Mapping) tool that allows you to define your data models in a schema file and then generate TypeScript code to interact with your database.

const client = new PrismaClient()

export default client;