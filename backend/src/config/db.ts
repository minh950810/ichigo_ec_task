import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string, {
            autoIndex: true
        })
        console.log('MongoDB Connected:', conn.connection.host)
    } catch (err) {
        console.log('DB connection failed')
        process.exit(1)
    }
}

export default connectDB
