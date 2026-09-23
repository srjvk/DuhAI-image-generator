require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./mongodb/connect')

// Importing Routes
const duhAIRoutes = require('./routes/duhAIRoutes')
const postRoutes = require('./routes/postRoutes')

const PORT = 1234
const app = express();


app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.get('/', async (req, res) => {
  res.send('Hello From DuhAI ')

})

// router files
app.use('/api/v1/duhai', duhAIRoutes)
app.use('/api/v1/post', postRoutes)

const start = async () => {
  try {
    // connect to database 
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server has started on ${PORT} and running`))

  } catch (error) {
    console.log(error)
  }

}

start()