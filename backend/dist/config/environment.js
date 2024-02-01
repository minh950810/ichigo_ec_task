"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.getName = function () {
        return process.env.NODE_ENV || 'development';
    };
    Environment.isTest = function () {
        return this.getName() === 'test';
    };
    Environment.isDevelopment = function () {
        return this.getName() === 'development';
    };
    Environment.isProduction = function () {
        return this.getName() === 'production';
    };
    Environment.getRedisURL = function () {
        return process.env.REDIS_URL;
    };
    Environment.getJwtSecret = function () {
        return process.env.JWT_SECRET || 'secret';
    };
    Environment.getAdServerURL = function () {
        return process.env.AD_SERVER_URL || '';
    };
    Environment.getXApiKey = function () {
        return process.env.X_API_KEY || '';
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map