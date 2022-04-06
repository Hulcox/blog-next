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

  try {
    await prisma.comment.create({
      data: {
        content: content,
        postId: Number(postId),
        authorCommentId: authorCommentId,
      },
    });

    const comment = await prisma.comment.findMany();

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send("Problème survenu : " + error);
  }
};

export const readAllComment = async (req, res) => {
  try {
    const comment = await prisma.comment.findMany();

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
        authorCommentId: authorCommentId,
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
