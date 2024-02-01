"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs = exports.loyalty = void 0;
var type_1 = require("./type");
exports.loyalty = (_a = {},
    _a[type_1.Loyalty.Gold] = 500,
    _a[type_1.Loyalty.Silver] = 100,
    _a[type_1.Loyalty.Bronze] = 0,
    _a);
exports.logs = {
    CREATE_ORDER_FAILED: 'Order creation is failed(customerId must be 24bit)',
    GET_CUSTOMER_INFO_FAILED: 'Invalid customer',
    VALIDATE_ERROR: 'Invalid format'
};
//# sourceMappingURL=constant.js.map