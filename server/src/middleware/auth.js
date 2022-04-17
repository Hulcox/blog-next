import jsonwebtoken from "jsonwebtoken";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  const token = jsonwebtoken.decode(authorization);

  try {
    const user = await prisma.user.findUnique({
      where: { id: token.payload.userId },
    });
    res.authId = token.payload.authId;
    res.userLevel = token.userLevel;
    jsonwebtoken.verify(authorization, user.passwordSalt);
    next();
  } catch (err) {
    console.log("token invalid !");
    res.status(403).send("token invalid !");
  }
};

export default auth;
