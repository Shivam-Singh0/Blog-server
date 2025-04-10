import Blog from "../models/Blog.js";
export async function createPost(req, res) {
    try {
        const {title, content} = req.body;
       
        const author = req.user._id;

        const post = await Blog.create({title, content, author});
        res.json(post);
    } catch (error) {
       
        res.status(500).json({ message: error.message });
    }
}

export async function getPosts(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;

        const posts = await Blog.find()
            .populate("author")
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Blog.countDocuments();

        res.json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getPost(req, res) {
    try {
        const post = await Blog.findById(req.params.id).populate("author");
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updatePost(req, res) {
    try {
        const post = await Blog.findById(req.params.id);
        post.title = req.body.title;
        post.content = req.body.content;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Blog.findByIdAndDelete(req.params.id);
       
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   