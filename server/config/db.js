const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('MongoDB connected successfuly')
  } catch (error) {
    console.log('An error occurred while establishing a connection to MongoDB')
    console.log(error)
    process.exit(1)
  }
}

module.exports = { connectDB }
