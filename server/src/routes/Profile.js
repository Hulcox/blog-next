import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const readProfile = async (req, res) => {
  const {
    body: { profileId },
  } = req;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: Number(profileId) },
    });

    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const updateProfile = async (req, res) => {
  const {
    body: { firstName, lastName, address, city, zip_code },
  } = req;
  const profileId = res.authId;
  try {
    const profile = await prisma.profile.update({
      where: { id: Number(profileId) },
      data: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        zip_code: zip_code,
      },
    });

    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const deleteProfile = async (req, res) => {
  const profileId = res.authId;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: Number(profileId) },
    });

    await prisma.follow.deleteMany({
      where: {
        OR: [
          { followedId: Number(profileId) },
          { followersId: Number(profileId) },
        ],
      },
    });
    await prisma.comment.deleteMany({
      where: { authorCommentId: Number(profileId) },
    });
    await prisma.post.deleteMany({
      where: { authorId: Number(profileId) },
    });
    await prisma.profile.delete({
      where: { id: Number(profileId) },
    });
    await prisma.user.delete({
      where: { id: Number(profile.userId) },
    });

    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};
