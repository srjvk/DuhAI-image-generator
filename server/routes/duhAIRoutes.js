const express = require('express')
const dotenv = require('dotenv')
const { InferenceClient } = require('@huggingface/inference')
dotenv.config()
const { v2: cloudinary } = require('cloudinary')
const post = require('../mongodb/models/post')

const router = express.Router()
// Initializing Hugging Face with token
const hf = new InferenceClient(process.env.HF_TOKEN);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    // Generating the image from Hugging Face
    const response = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: { num_inference_steps: 4, },
    }, {
      headers: {
        'x-use-cache': 'false',
        'x-provider': 'hf-inference'
      }
    }
    );

    // Converts the data from the API response
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const base64image = `data:image/jpeg;base64,${buffer.toString('base64')}`

    const uploadResponse = await cloudinary.uploader.upload(base64image, { folder: 'ai-image-generator' })

    return res.status(200).json({ success: true, photo: uploadResponse.secure_url })


  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, error: error })

  }

})

module.exports = router