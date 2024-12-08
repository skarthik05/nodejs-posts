const Post = require('../models/Post');
const Tag = require('../models/Tag');
const fs = require('fs')


exports.getPosts = async (req, res) => {
    const { sortBy, page = 1, limit = 10, keyword, tag, ...extraParams } = req.query;


    if (Object.keys(extraParams).length > 0) {
        return res.status(400).json({ message: 'BAD_REQUEST: Invalid query parameters.' });
    }

    let query = {};

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { desc: { $regex: keyword, $options: 'i' } }
        ];
    }

    if (tag) {
        query.tags = tag;
    }
    try {
        const posts = await Post.find(query)
            .populate('tags')
            .sort(sortBy ? { [sortBy]: 1 } : {})
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.createPost = async (req, res) => {
    try {
        const { title, desc, tags = [] } = req.body;
        if (!title || !desc) {
            return res.status(400).json({ message: 'Title and Description are required.' });
        }

        const imageBase64 = req.file ? `data:${req.file.mimetype};base64,${fs.readFileSync(req.file.path).toString('base64')}` : null;
        fs.unlinkSync(req.file?.path);

        if (imageBase64 && !imageBase64.startsWith('data:image/')) {
            return res.status(400).json({ message: 'Invalid image format. Only Base64-encoded images are supported.' });
        }

        const tagIds = Array.isArray(tags)
            ? tags.map(tag => tag.trim())
            : typeof tags === 'string'
                ? JSON.parse(tags)
                : [];

        const validatedTags = await Tag.find({ _id: { $in: tagIds } });

        if (validatedTags.length !== tagIds.length) {
            return res.status(404).json({ message: 'One or more tags not found.' });
        }
        const newPost = new Post({ title, desc, image: imageBase64, tags: validatedTags.map(tag => tag._id) });
        const savedPost = await newPost.save();
        const populatedPost = await savedPost.populate('tags');
        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
