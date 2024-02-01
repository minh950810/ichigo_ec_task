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
exports.newYearUpdate = exports.getCustomerInfoHandler = exports.getCustomerOrdersHandler = exports.addOrderHandler = void 0;
var customerModel_1 = __importDefault(require("../models/customerModel"));
var utils_1 = require("../utils");
var addOrderHandler = function (customerId, customerName, newOrder) { return __awaiter(void 0, void 0, void 0, function () {
    var exist, flag, bonusThisYear, bonusLastYear, thisYear, lastYear, customer, newCustomer, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                return [4 /*yield*/, customerModel_1.default.findOne({ userId: customerId })];
            case 1:
                exist = _c.sent();
                flag = (0, utils_1.getYearFlag)(newOrder.date);
                bonusThisYear = flag == 2 ? newOrder.incents : 0;
                bonusLastYear = flag == 1 ? newOrder.incents : 0;
                if (!exist) return [3 /*break*/, 3];
                thisYear = ((_a = exist.tier) === null || _a === void 0 ? void 0 : _a.thisYear) || 0;
                lastYear = ((_b = exist.tier) === null || _b === void 0 ? void 0 : _b.lastYear) || 0;
                return [4 /*yield*/, customerModel_1.default.findOneAndUpdate({ userId: customerId }, {
                        $push: { orders: newOrder },
                        tier: {
                            thisYear: thisYear + bonusThisYear,
                            lastYear: lastYear + bonusLastYear
                        },
                        loyalty: (0, utils_1.calculateLoyalty)(thisYear + lastYear + newOrder.incents)
                    }, { new: true })];
            case 2:
                customer = _c.sent();
                return [2 /*return*/, customer];
            case 3: return [4 /*yield*/, customerModel_1.default.create({
                    name: customerName,
                    userId: "".concat(customerName.split(' ').join(''), "-").concat(Date.now()),
                    orders: newOrder,
                    tier: {
                        lastYear: bonusLastYear,
                        thisYear: bonusThisYear
                    },
                    loyalty: (0, utils_1.calculateLoyalty)(newOrder.incents)
                })];
            case 4:
                newCustomer = _c.sent();
                if (newCustomer)
                    return [2 /*return*/, newCustomer];
                else
                    return [2 /*return*/, null];
                _c.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                return [2 /*return*/, null];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addOrderHandler = addOrderHandler;
var getCustomerOrdersHandler = function (customerId) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, userId, name_1, paginatedOrders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customerModel_1.default.findOne({ userId: customerId }, {
                        orders: {
                            $filter: {
                                input: '$orders',
                                as: 'order',
                                cond: { $gt: ['$$order.date', (0, utils_1.getLastYear)()] }
                            }
                        },
                        name: 1,
                        userId: 1
                    })];
            case 1:
                customer = _a.sent();
                if (!customer)
                    return [2 /*return*/, null];
                console.log(customer);
                userId = customer.userId, name_1 = customer.name;
                paginatedOrders = customer.orders.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
                return [2 /*return*/, {
                        userId: userId,
                        name: name_1,
                        orders: paginatedOrders
                    }];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCustomerOrdersHandler = getCustomerOrdersHandler;
var getCustomerInfoHandler = function (page, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var validPage, validLimit, customer, result, i, tier, _a, userId, name_2, loyalty, startDate, spentAmount, amountToNext, downgrade, downgradeYear, error_3;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                validPage = page > 0 ? page : 1;
                validLimit = limit > 0 ? limit : 10;
                return [4 /*yield*/, customerModel_1.default.find({})
                        .limit(validLimit * 1)
                        .skip((validPage - 1) * validLimit)
                        .sort({ updatedAt: -1 })
                        .exec()];
            case 1:
                customer = _d.sent();
                if (customer) {
                    result = [];
                    for (i = 0; i < customer.length; i++) {
                        tier = {
                            thisYear: ((_b = customer[i].tier) === null || _b === void 0 ? void 0 : _b.thisYear) || 0,
                            lastYear: ((_c = customer[i].tier) === null || _c === void 0 ? void 0 : _c.lastYear) || 0
                        };
                        _a = customer[i], userId = _a.userId, name_2 = _a.name, loyalty = _a.loyalty;
                        startDate = (0, utils_1.getStartDate)();
                        spentAmount = tier.thisYear + tier.lastYear;
                        amountToNext = (0, utils_1.calculateAmountToNext)(spentAmount, loyalty);
                        downgrade = (0, utils_1.downgradable)(tier.thisYear, loyalty);
                        downgradeYear = (0, utils_1.getDownGradeYear)(downgrade);
                        result.push({
                            userId: userId,
                            name: name_2,
                            loyalty: loyalty,
                            startDate: startDate,
                            spentAmount: spentAmount,
                            amountToNext: amountToNext,
                            downgrade: downgrade,
                            downgradeYear: downgradeYear
                        });
                    }
                    return [2 /*return*/, result];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _d.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCustomerInfoHandler = getCustomerInfoHandler;
//yearly update
var newYearUpdate = function () { return __awaiter(void 0, void 0, void 0, function () {
    var customer, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customerModel_1.default.updateMany({}, [
                        {
                            $set: {
                                'tier.lastYear': '$tier.thisYear',
                                'tier.thisYear': 0,
                                loyalty: {
                                    $cond: {
                                        if: { $gt: ['$tier.thisYear', 500] },
                                        then: 2,
                                        else: {
                                            $cond: {
                                                if: { $gt: ['$tier.thisYear', 100] },
                                                then: 1,
                                                else: 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ])];
            case 1:
                customer = _a.sent();
                return [2 /*return*/, customer];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.newYearUpdate = newYearUpdate;
//# sourceMappingURL=customer.js.map