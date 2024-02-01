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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var testServer_1 = require("../../common/testServer");
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
var existInfo = {
    customerId: 'shogoyoshie-1706675667887',
    customerName: 'shogo yoshie',
    orderId: 'TestController',
    totalIncents: 340,
    date: new Date()
};
var invalidInfo = {
    customerId: 'aaa-123',
    customerName: 'shogo yoshie',
    orderId: 'T123'
};
var nonExistInfo = {
    customerId: '65a7af452e12c459bfb2bb2d',
    customerName: 'shogo yoshie',
    orderId: 'TestController',
    totalIncents: 340,
    date: new Date()
};
describe('creatOrder', function () {
    it('should return 400 and failed the request if invalid shema, in this case, there is not date field', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server).post("/create-order").send(invalidInfo).expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
    it('should return 200 and create the Customer model with order info if valid schema and nom-exist customer ', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server).post("/create-order").send(nonExistInfo).expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
    it('should return 200 and create the Order info in Customer model if valid schema and exist customer ', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server).post("/create-order").send(existInfo).expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
});
describe('getCustomersInfo', function () {
    it('should be not failed with valid page and limit params', function () { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = 1;
                    limit = 10;
                    return [4 /*yield*/, (0, supertest_1.default)(server).get("/customers/".concat(page, "/").concat(limit)).expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
});
describe('getCustomersOrders', function () {
    it('should failed with nonExistId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = 'aaaaaaaaa';
                    return [4 /*yield*/, (0, supertest_1.default)(server).get("/customer/".concat(id)).expect(500)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
    it('should be not failed with nonExistId', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server).get("/customer/".concat(existInfo.customerId)).expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 100000);
});
//# sourceMappingURL=customer.js.map