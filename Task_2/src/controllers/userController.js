const prisma = require("../prismaClient");

async function createUser(req, res) {
  try {
    const { email, age } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "A valid 'email' is required." });
    }
    if (age === undefined || typeof age !== "number" || age < 0) {
      return res.status(400).json({ error: "'age' must be a number >= 0." });
    }

    const user = await prisma.user.create({
      data: { email, age },
    });

    return res.status(201).json(user);
  } catch (err) {

    if (err.code === "P2002") {
      return res.status(409).json({ error: "A user with this email already exists." });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

async function getUserById(req, res) {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

async function updateUser(req, res) {
  try {
    const id = Number(req.params.id);
    const { email, age, isActive } = req.body;

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "User not found." });
    }

    if (age !== undefined && (typeof age !== "number" || age < 0)) {
      return res.status(400).json({ error: "'age' must be a number >= 0." });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(email !== undefined && { email }),
        ...(age !== undefined && { age }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Another user with this email already exists." });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "User not found." });
    }

    await prisma.user.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
