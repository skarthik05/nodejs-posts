const Tag = require('../models/Tag');

exports.createTag = async (req, res) => {
  const { name } = req.body;

  try {
    const newTag = new Tag({ name });
    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
