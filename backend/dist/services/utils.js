"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLoyalty = exports.downgradable = exports.calculateAmountToNext = void 0;
var constant_1 = require("../common/constant");
var type_1 = require("../common/type");
function calculateAmountToNext(tier, current) {
    if (current == type_1.Loyalty.Gold.toString())
        return 0;
    if (current == type_1.Loyalty.Silver.toString())
        return constant_1.loyalty[type_1.Loyalty.Gold] - tier;
    return constant_1.loyalty[type_1.Loyalty.Silver] - tier;
}
exports.calculateAmountToNext = calculateAmountToNext;
function downgradable(tier, current) {
    if (current == type_1.Loyalty.Gold.toString() && tier < constant_1.loyalty[type_1.Loyalty.Gold])
        return true;
    if (current == type_1.Loyalty.Silver.toString() && tier < constant_1.loyalty[type_1.Loyalty.Silver])
        return true;
    return null;
}
exports.downgradable = downgradable;
function calculateLoyalty(tier) {
    if (tier >= constant_1.loyalty[type_1.Loyalty.Gold])
        return type_1.Loyalty.Gold;
    if (tier >= constant_1.loyalty[type_1.Loyalty.Silver])
        return type_1.Loyalty.Silver;
    return type_1.Loyalty.Bronze;
}
exports.calculateLoyalty = calculateLoyalty;
//# sourceMappingURL=utils.js.map