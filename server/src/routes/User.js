import jsonwebtoken from "jsonwebtoken";
import hashPassword from "../hashPassword.js";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const userSignIn = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    const [passwordHash, passwordSalt] = hashPassword(
      password,
      user.passwordSalt
    );

    if (passwordHash !== user.passwordHash) {
      res.status(403).send("Email or Password is invalid");
      return;
    }

    const token = jsonwebtoken.sign(
      { payload: { userId: user.id, userLevel: user.levelAuth } },
      user.passwordSalt,
      {
        expiresIn: "24 hours",
      }
    );

    res.send({ token: token, userLevel: user.levelAuth });
  } catch (error) {
    res.status(400).send("Problème survenue : " + error);
  }
};

export const userSignUp = async (req, res) => {
  const {
    body: { email, password, firstName, lastName, address, city, zip_code },
  } = req;

  try {
    const [passwordHash, passwordSalt] = hashPassword(password);

    await prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    await prisma.profile.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        zip_code: zip_code,
        userId: user.id,
      },
    });

    const profile = await prisma.profile.findFirst({
      where: {
        userId: user.id,
      },
    });

    res.send(user + profile);
  } catch (error) {
    res.status(400).send("Problème survenue : " + error);
  }
};
