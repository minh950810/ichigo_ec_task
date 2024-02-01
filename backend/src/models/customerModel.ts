import mongoose from 'mongoose'
import { Loyalty } from '../common/type'

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: true
        },
        userId: {
            type: String,
            required: true
        },
        orders: [
            {
                _id: false,
                orderId: {
                    type: String,
                    required: true
                },
                incents: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    default: new Date()
                }
            }
        ],
        tier: {
            lastYear: {
                type: Number,
                default: 0
            },
            thisYear: {
                type: Number,
                default: 0
            }
        },
        loyalty: {
            type: String,
            enum: Loyalty,
            default: Loyalty.Bronze
        }
    },
    { timestamps: true }
)

export default mongoose.model('Customers', customerSchema)
