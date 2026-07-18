const { PrismaClient } = require("@prisma/client");

// Single shared Prisma instance (avoids opening too many DB connections)
const prisma = new PrismaClient();

module.exports = prisma;
