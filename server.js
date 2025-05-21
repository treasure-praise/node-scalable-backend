"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./src/database/index.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_js_1 = __importDefault(require("./src/routes/userRoutes.js"));
const config_js_1 = require("./config.js");
const todoRoutes_js_1 = __importDefault(require("./src/routes/todoRoutes.js"));
const errorMiddleware_js_1 = require("./src/middleware/errorMiddleware.js");
const PORT = config_js_1.port !== null && config_js_1.port !== void 0 ? config_js_1.port : 8080;
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ origin: config_js_1.corsUrl, optionsSuccessStatus: 200 }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/api/users", userRoutes_js_1.default);
exports.app.use("/api/todo", todoRoutes_js_1.default);
exports.app.use(errorMiddleware_js_1.errorHandler);
exports.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
