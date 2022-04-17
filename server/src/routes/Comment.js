import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const createComment = async (req, res) => {
  const {
    body: { content, authorCommentId },
  } = req;

  const {
    params: { postId },
  } = req;

  await prisma.comment.create({
    data: {
      content: content,
      postId: Number(postId),
      authorCommentId: Number(authorCommentId),
    },
  });
  try {
    const comment = await prisma.comment.findMany({
      include: { authorComment: true },
    });

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readAllComment = async (req, res) => {
  const {
    params: { postId },
  } = req;
  try {
    const comment = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      include: { authorComment: true },
    });

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readComment = async (req, res) => {
  const {
    params: { commentId },
  } = req;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const updateComment = async (req, res) => {
  const {
    body: { content, authorCommentId },
  } = req;

  const {
    params: { postId, commentId },
  } = req;

  console.log(postId, commentId);

  try {
    const comment = await prisma.comment.update({
      where: { id: Number(commentId) },
      data: {
        content: content,
        postId: Number(postId),
        authorCommentId: Number(authorCommentId),
      },
    });

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const deleteComment = async (req, res) => {
  const {
    params: { commentId },
  } = req;
  try {
    const comment = await prisma.comment.delete({
      where: { id: Number(commentId) },
    });

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const addCommentLike = async (req, res) => {
  const {
    params: { commentId },
  } = req;
  try {
    const comment = await prisma.comment.updateMany({
      where: { id: Number(commentId) },
      data: {
        like: {
          increment: 1,
        },
      },
    });

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const removeCommentLike = async (req, res) => {
  const {
    params: { commentId },
  } = req;
  try {
    const comment = await prisma.comment.updateMany({
      where: { id: Number(commentId) },
      data: {
        like: {
          increment: -1,
        },
      },
    });

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};
