import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const addFollower = async (req, res) => {
  const {
    body: { profileId, profileIdToFollow },
  } = req;
  try {
    const follow = await prisma.follow.create({
      data: {
        followersId: profileId,
        followedId: profileIdToFollow,
      },
    });

    res.status(200).send(follow);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const removeFollower = async (req, res) => {
  const {
    body: { profileId, profileIdToFollow },
  } = req;
  try {
    const follow = await prisma.follow.delete({
      where: {
        followersId: profileId,
        followedId: profileIdToFollow,
      },
    });

    res.status(200).send(follow);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};
