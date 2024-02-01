"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var type_1 = require("../common/type");
var customerSchema = new mongoose_1.default.Schema({
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
        enum: type_1.Loyalty,
        default: type_1.Loyalty.Bronze
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Customers', customerSchema);
//# sourceMappingURL=customerModel.js.map