const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { v2: cloudinary } = require('cloudinary')
const Post = require('../mongodb/models/post')

const router = express.Router()



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

// Get all Posts
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts })


  } catch (error) {
    return res.status(500).json({ success: false, error: error })

  }

})

// Create a Post
router.route('/').post(async (req, res) => {
  try {

    const { name, prompt, photo } = req.body

    if (!name || !prompt || !photo) {
      return res.status(400).json({ success: false, message: 'All fields are required to share a post' });
    }


    const newPost = await Post.create({
      name,
      prompt,
      photo,

    })

    return res.status(201).json({ success: true, data: newPost })

  } catch (error) {
    return res.status(500).json({ success: false, error: error })

  }

})



module.exports = router