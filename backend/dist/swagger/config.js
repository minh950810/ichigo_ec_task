"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.endpointsFiles = exports.outputFile = void 0;
exports.outputFile = '../swagger.json';
exports.endpointsFiles = ['./routes/*.js'];
exports.config = {
    info: {
        title: 'eCommerce API Documentation',
        description: ''
    },
    host: process.env.HOST,
    tags: [],
    schemes: ['https', 'http']
};
//# sourceMappingURL=config.js.map