"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./swagger/config");
var swagger_autogen_1 = __importDefault(require("swagger-autogen"));
(0, swagger_autogen_1.default)(config_1.outputFile, config_1.endpointsFiles, config_1.config);
//# sourceMappingURL=swagger.js.map