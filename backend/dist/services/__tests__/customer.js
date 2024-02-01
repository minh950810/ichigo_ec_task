"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var testServer_1 = require("../../common/testServer");
var customer_1 = require("../customer");
var server;
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, testServer_1.createServer)()];
            case 1:
                server = (_a.sent()).listen();
                return [2 /*return*/];
        }
    });
}); });
afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server.close()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var nonExistInfo = {
    customerId: '65a7af452e12c459bfb2bb2d',
    customerName: 'shogo yoshie',
    order: {
        orderId: 'TestService',
        incents: 340,
        date: new Date()
    }
};
var existInfo = {
    customerId: 'shogoyoshie-1706675667887',
    customerName: 'shogo yoshie',
    order: {
        orderId: 'TestService',
        incents: 340,
        date: new Date()
    }
};
var invalidId = '1111111111';
describe('create Order', function () {
    it('should be not failed and create the new Customer model with valid info and nonExistCustomer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var customer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, customer_1.addOrderHandler)(nonExistInfo.customerId, nonExistInfo.customerName, nonExistInfo.order)];
                case 1:
                    customer = _a.sent();
                    expect(customer).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
    it('should be not failed and add the Order info in Customer model with valid info and existCustomer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var customer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, customer_1.addOrderHandler)(existInfo.customerId, existInfo.customerName, existInfo.order)];
                case 1:
                    customer = _a.sent();
                    expect(customer).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
});
describe('get Customer Infos', function () {
    it('should be not failed with correct page and limit params', function () { return __awaiter(void 0, void 0, void 0, function () {
        var customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, customer_1.getCustomerInfoHandler)(1, 10)];
                case 1:
                    customers = _a.sent();
                    expect(customers).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("get Customer's Order", function () {
    it('should be failed with wrong CustomerId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, customer_1.getCustomerOrdersHandler)(invalidId)];
                case 1:
                    customers = _a.sent();
                    expect(customers).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be failed with correct CustomerId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var customers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, customer_1.getCustomerOrdersHandler)(existInfo.customerId)];
                case 1:
                    customers = _a.sent();
                    expect(customers).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=customer.js.map