"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var express = __importStar(require("express"));
var environment_1 = require("./config/environment");
var db_1 = __importDefault(require("./config/db"));
var dotenv_1 = __importDefault(require("dotenv"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("../swagger.json"));
var routes_1 = __importDefault(require("./routes"));
var node_cron_1 = __importDefault(require("node-cron"));
var customer_1 = require("./services/customer");
var css_1 = require("./swagger/css");
dotenv_1.default.config();
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this.port = process.env.PORT || 5000;
        this.onListening = function (server) {
            console.log("Listening on ".concat(_this.bind(server.address())));
        };
        this.app = express.default();
    }
    Server.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.use(express.json());
                        this.app.use(express.urlencoded({ extended: true }));
                        this.app.use(routes_1.default);
                        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, { customCss: css_1.swaggerCss }));
                        return [4 /*yield*/, (0, db_1.default)()];
                    case 1:
                        _a.sent();
                        node_cron_1.default.schedule('* * 1 1 *', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, customer_1.newYearUpdate)()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.server = this.app.listen(this.port);
                        this.server.on('error', function (err) { return _this.onError(_this.server, err); });
                        this.server.on('listening', function () { return _this.onListening; });
                        console.debug('Server was started on environment %s', environment_1.Environment.getName());
                        console.log("Listening on ".concat(this.bind(this.server.address())));
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.close = function () {
        this.server.close();
    };
    Server.prototype.onError = function (server, error) {
        if (error['syscall'] !== 'listen') {
            throw error;
        }
        var addr = server.address();
        // handle specific listen errors with friendly messages
        switch (error['code']) {
            case 'EACCES':
                console.error("".concat(this.bind(addr), " requires elevated privileges"));
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error("".concat(this.bind(addr), " is already in use"));
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
    Server.prototype.bind = function (addr) {
        return typeof addr === 'string' ? "pipe ".concat(addr) : "port ".concat(this.port);
    };
    return Server;
}());
exports.default = new Server();
//# sourceMappingURL=server.js.map