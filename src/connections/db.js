import { connect } from 'mongoose'

export const dbConnect = () => {
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@test.fdk5v31.mongodb.net/${process.env.MONGO_DB_NAME}`
  try {
    connect(uri)
    console.log('mongo db connected')
  } catch (e) {
    console.error(e)
  }
}
