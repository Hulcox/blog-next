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
      include: {
        profile: true,
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
      {
        payload: {
          userId: user.id,
          userLevel: user.levelAuth,
          authId: user.profile.id,
        },
      },
      user.passwordSalt,
      {
        expiresIn: "24 hours",
      }
    );

    res.send({
      token: token,
      userLevel: user.levelAuth,
      authId: user.profile.id,
      profile: user.profile.firstName + " " + user.profile.lastName,
    });
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

export const userUpdate = async (req, res) => {
  const {
    body: { email, password, userLevel, id },
  } = req;

  res.authId;

  const pro = await prisma.profile.findUnique({ where: { id: authId } });

  try {
    const [passwordHash, passwordSalt] = hashPassword(password);

    await prisma.user.update({
      where: { id: pro.userId },
      data: {
        email: email,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
        levelAuth: userLevel,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { id: id }],
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

export const userSession = async (req, res) => {
  const {
    headers: { authorization },
  } = req;
  const token = jsonwebtoken.decode(authorization);

  try {
    const user = await prisma.user.findUnique({
      where: { id: token.payload.userId },
      include: {
        profile: true,
      },
    });
    const authId = token.payload.authId;
    const userLevel = token.payload.userLevel;
    jsonwebtoken.verify(authorization, user.passwordSalt);
    res.status(200).send({
      token: authorization,
      userLevel: userLevel,
      authId: authId,
      authName: user.profile.firstName + " " + user.profile.lastName,
      profile: user,
    });
  } catch (err) {
    console.log("token invalid !");
    res.status(403).send("token invalid !");
  }
};
