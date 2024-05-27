import express, { response } from 'express';
import ArticleModel from '../models/article.js';

const router = express.Router();
router.post("/articles", async (req, res) => {
    const article = new ArticleModel(req.body);

    try {
        await article.save();
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/articles", async (req, res) => {

    try {
        const article = await ArticleModel.find({});
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/articles/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.findById(id);
        if (!article) {
            return res.status(404).send({ message: "Article not found" });
        }
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/articles/:id", async (req, res) => {
    const article = new ArticleModel(req.body);
    const requiredFields = ['title', 'description', 'content'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ message: `${field} is required` });
        }
    }

    try {
        await article.save();
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/articles/:id", async (request, response) => {
    const { id } = request.params;
    const updates = request.body;
    const options = { new: true, runValidators: true };

    try {
        const article = await ArticleModel.findByIdAndUpdate(id, updates, options);
        if (!article) {
            return response.status(404).send({ error: "Article not found" });
        }
        response.send(article);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete("/articles/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await ArticleModel.findByIdAndDelete(id);
        res.send({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;