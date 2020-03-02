const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  try {
    const mongoServer = new MongoMemoryServer();
    mongoose.Promise = Promise;
    const mongoUri = await mongoServer.getUri();
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: false
    };
    mongoose.connect(mongoUri, mongooseOpts);
    mongoose.connection.on("error", e => {
      if (e.message.code === "ETIMEDOUT") {
        console.log(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      console.log(e);
    });
    mongoose.connection.once("open", () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
  } catch (error) {
    console.log("An error occurred while establishing a connection to MongoDB in memory");
    console.log(error);
  }
};

const resetDB = async () => {
  try {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
  } catch (error) {
    console.log("An error occurred while reset MongoDB in memory");
    console.log(error);
  }
};

module.exports = { connectDB, resetDB };
