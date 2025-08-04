"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const deals_1 = __importDefault(require("./routes/deals"));
const db_1 = __importDefault(require("./db"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
app.use((0, cors_1.default)({ origin: "*" }));
// app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.get('/', (req, res) => {
    res.send('Sales Tracking API');
});
app.use('/api/auth', auth_1.default);
app.use('/api/deals', deals_1.default);
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
