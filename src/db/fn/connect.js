import { connect } from 'mongoose'
import * as dotenv from "dotenv"

dotenv.config()

export const dbConnect = () => {
  connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@test.fdk5v31.mongodb.net/${process.env.MONGO_DB_NAME}`)
}