"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var server = server_1.default;
var app = server.app;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
server.run();
exports.default = app;
//# sourceMappingURL=index.js.map