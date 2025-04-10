import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/blogController.js";
import { Aunthenticated } from "../middleware.js";
const router = express.Router()

router.route("/").get(getPosts).post(Aunthenticated, createPost)
router.route("/:id").get(getPost).put(updatePost).delete(deletePost)

export default router