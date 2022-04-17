import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const createPost = async (req, res) => {
  const {
    body: { title, subTitle, content, authorId },
  } = req;
  console.log(title, subTitle, content, authorId);
  try {
    await prisma.post.create({
      data: {
        title: title,
        subTitle: subTitle,
        content: content,
        authorId: Number(authorId),
      },
    });
    const post = await prisma.post.findFirst({
      where: {
        title: title,
        subTitle: subTitle,
        content: content,
        authorId: Number(authorId),
      },
    });

    res.status(200).send({ postId: post.id });
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readAllPost = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      where: { published: true },
      include: {
        authorPost: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readMyPost = async (req, res) => {
  const {
    params: { authId },
  } = req;
  try {
    const post = await prisma.post.findMany({
      where: {
        authorId: Number(authId),
      },
      include: {
        authorPost: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readAllPopularPost = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      where: { published: true },
      include: {
        authorPost: true,
      },
      orderBy: {
        like: "asc",
      },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readAllFeedPost = async (req, res) => {
  const authorId = res.authId;
  const user = await prisma.profile.findUnique({
    include: {
      followed: true,
    },
    where: {
      id: authorId,
    },
  });

  if (user.followed.length == 0) {
    res.status(204).send("Vous n'avez pas d'abonnement");
    return;
  }

  try {
    const followed = user.followed.map(({ followersId }) => {
      return followersId;
    });
    const post = await prisma.post.findMany({
      include: {
        authorPost: true,
      },
      where: {
        authorId: { in: followed },
        published: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readPost = async (req, res) => {
  const {
    params: { postId },
  } = req;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
      include: {
        authorPost: true,
      },
    });

    res.status(200).send([post]);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const updatePost = async (req, res) => {
  const {
    body: { title, subTitle, content, authorId, published },
  } = req;
  console.log(title, subTitle, content, authorId, published);
  const {
    params: { postId },
  } = req;

  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title: title,
      subTitle: subTitle,
      content: content,
      authorId: Number(authorId),
      published: published,
    },
  });
  try {
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const deletePost = async (req, res) => {
  const {
    params: { postId },
  } = req;
  try {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const addLike = async (req, res) => {
  const {
    params: { postId },
  } = req;
  try {
    const post = await prisma.post.updateMany({
      where: { id: Number(postId) },
      data: {
        like: {
          increment: 1,
        },
      },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const removeLike = async (req, res) => {
  const {
    params: { postId },
  } = req;
  try {
    const post = await prisma.post.updateMany({
      where: { id: Number(postId) },
      data: {
        like: {
          increment: -1,
        },
      },
    });

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};
