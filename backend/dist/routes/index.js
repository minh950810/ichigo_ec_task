"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var customer_1 = require("../controllers/customer");
var orderSchema_1 = require("../schema/orderSchema");
var validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
var router = (0, express_1.Router)();
exports.default = router;
router.post('/create-order', (0, validateRequest_1.default)(orderSchema_1.createSchema), customer_1.createOrder);
router.get('/customers/:page/:limit', customer_1.getCustomersInfo);
router.get('/customer/:_id', customer_1.getCustomerOrders);
//# sourceMappingURL=index.js.map