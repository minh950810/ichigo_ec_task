"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
var yup_1 = require("yup");
var constant_1 = require("../common/constant");
exports.createSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        customerId: (0, yup_1.string)().required(constant_1.logs.VALIDATE_ERROR),
        customerName: (0, yup_1.string)().required(constant_1.logs.VALIDATE_ERROR),
        orderId: (0, yup_1.string)().required(constant_1.logs.VALIDATE_ERROR),
        totalIncents: (0, yup_1.number)().required(constant_1.logs.VALIDATE_ERROR),
        date: (0, yup_1.date)().required(constant_1.logs.VALIDATE_ERROR)
    })
});
//# sourceMappingURL=orderSchema.js.map