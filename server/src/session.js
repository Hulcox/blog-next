import auth from "./middleware/auth.js";
import {
  addCommentLike,
  createComment,
  deleteComment,
  readAllComment,
  readComment,
  removeCommentLike,
  updateComment,
} from "./routes/Comment.js";
import { addFollower, removeFollower } from "./routes/Follow.js";
import {
  addLike,
  createPost,
  deletePost,
  readAllFeedPost,
  readAllPopularPost,
  readAllPost,
  readPost,
  removeLike,
  updatePost,
} from "./routes/Post.js";
import { deleteProfile, readProfile, updateProfile } from "./routes/Profile.js";
import { userSignIn, userSignUp } from "./routes/User.js";

const sessionRoutes = ({ app }) => {
  app.post("/post", auth, async (req, res) => {
    await createPost(req, res);
  });
  app.get("/post/recent", async (req, res) => {
    await readAllPost(req, res);
  });
  app.get("/post/popular", async (req, res) => {
    await readAllPopularPost(req, res);
  });
  app.post("/post/feed", auth, async (req, res) => {
    await readAllFeedPost(req, res);
  });
  app.get("/post/:postId", async (req, res) => {
    await readPost(req, res);
  });
  app.put("/post/:postId", auth, async (req, res) => {
    await updatePost(req, res);
  });
  app.delete("/post/:postId", auth, async (req, res) => {
    await deletePost(req, res);
  });
  app.get("/post/add-like/:postId", auth, async (req, res) => {
    await addLike(req, res);
  });
  app.get("/post/remove-like/:postId", auth, async (req, res) => {
    await removeLike(req, res);
  });

  app.post("/comment/:postId", auth, async (req, res) => {
    await createComment(req, res);
  });
  app.get("/comment", async (req, res) => {
    await readAllComment(req, res);
  });
  app.get("/comment/:commentId", auth, async (req, res) => {
    await readComment(req, res);
  });
  app.put("/comment/:postId/:commentId", auth, async (req, res) => {
    await updateComment(req, res);
  });
  app.delete("/comment/:commentId", auth, async (req, res) => {
    await deleteComment(req, res);
  });
  app.get("/comment/add-like/:commentId", auth, async (req, res) => {
    await addCommentLike(req, res);
  });
  app.get("/comment/remove-like/:commentId", auth, async (req, res) => {
    await removeCommentLike(req, res);
  });

  app.post("/sign-in", async (req, res) => {
    await userSignIn(req, res);
  });
  app.post("/sign-up", async (req, res) => {
    await userSignUp(req, res);
  });

  app.post("/profile", auth, async (req, res) => {
    await readProfile(req, res);
  });
  app.put("/profile", auth, async (req, res) => {
    await updateProfile(req, res);
  });
  app.delete("/profile", auth, async (req, res) => {
    await deleteProfile(req, res);
  });

  app.post("/follow", auth, async (req, res) => {
    await addFollower(req, res);
  });
  app.delete("/follow", auth, async (req, res) => {
    await removeFollower(req, res);
  });
};

export default sessionRoutes;
