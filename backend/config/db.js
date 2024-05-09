import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connect(process.env.URL)
  .then(
    console.log(`Connected to database`)
  )
  .catch(e => {
    console.log(`Database connection failed\n${e}.message`);
  })
}


export default connectDB;