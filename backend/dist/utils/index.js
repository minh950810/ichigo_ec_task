"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearFlag = exports.getDownGradeYear = exports.getStartDate = exports.getLastYear = exports.calculateLoyalty = exports.downgradable = exports.calculateAmountToNext = void 0;
var constant_1 = require("../common/constant");
var type_1 = require("../common/type");
var calculateAmountToNext = function (tier, current) {
    if (current == type_1.Loyalty.Gold.toString())
        return 0;
    if (current == type_1.Loyalty.Silver.toString())
        return constant_1.loyalty[type_1.Loyalty.Gold] - tier;
    return constant_1.loyalty[type_1.Loyalty.Silver] - tier;
};
exports.calculateAmountToNext = calculateAmountToNext;
var downgradable = function (tier, current) {
    if (current == type_1.Loyalty.Gold.toString() && tier < constant_1.loyalty[type_1.Loyalty.Gold])
        return true;
    if (current == type_1.Loyalty.Silver.toString() && tier < constant_1.loyalty[type_1.Loyalty.Silver])
        return true;
    return null;
};
exports.downgradable = downgradable;
var calculateLoyalty = function (tier) {
    if (tier >= constant_1.loyalty[type_1.Loyalty.Gold])
        return type_1.Loyalty.Gold;
    if (tier >= constant_1.loyalty[type_1.Loyalty.Silver])
        return type_1.Loyalty.Silver;
    return type_1.Loyalty.Bronze;
};
exports.calculateLoyalty = calculateLoyalty;
var getLastYear = function () {
    var startOfLastYear = new Date();
    startOfLastYear.setFullYear(startOfLastYear.getFullYear() - 1);
    startOfLastYear.setMonth(0); // January
    startOfLastYear.setDate(1); // 1st day of the month
    return startOfLastYear;
};
exports.getLastYear = getLastYear;
var getStartDate = function () {
    return new Date().getFullYear() - 1;
};
exports.getStartDate = getStartDate;
var getDownGradeYear = function (downgrade) {
    var downgradeYear = downgrade == true ? new Date().getFullYear() + 1 : new Date().getFullYear() + 2;
    return downgradeYear;
};
exports.getDownGradeYear = getDownGradeYear;
var getYearFlag = function (date) {
    var thisYear = new Date().getFullYear();
    var lastYear = thisYear - 1;
    var dateInfo = new Date(date).getFullYear();
    return dateInfo >= thisYear ? 2 : dateInfo >= lastYear ? 1 : 0;
};
exports.getYearFlag = getYearFlag;
//# sourceMappingURL=index.js.map