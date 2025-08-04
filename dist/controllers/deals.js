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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyDealById = exports.getMyDeal = exports.createDeal = void 0;
const express_validator_1 = require("express-validator");
const deals_1 = __importDefault(require("../models/deals"));
const createDeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { title, stage, value } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const deal = new deals_1.default({ title, stage, value, userId });
        yield deal.save();
        res.status(201).json(deal);
    }
    catch (err) {
        console.error('Create deal error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createDeal = createDeal;
const getMyDeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const deals = yield deals_1.default.find({ userId });
        res.json(deals);
    }
    catch (err) {
        console.error('Get deals error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMyDeal = getMyDeal;
const getMyDealById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const deal = yield deals_1.default.findOne({ _id: id, userId });
        if (!deal) {
            res.status(404).json({ message: 'Deal not found' });
            return;
        }
        res.json(deal);
    }
    catch (err) {
        console.error('Get deal by ID error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMyDealById = getMyDealById;
