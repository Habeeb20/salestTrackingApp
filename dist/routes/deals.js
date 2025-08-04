"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const deals_1 = require("../controllers/deals"); // Use correct imports
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', [
    auth_1.authMiddleware,
    (0, express_validator_1.check)('title', 'Title is required').notEmpty(),
    (0, express_validator_1.check)('stage', 'Invalid stage').isIn(['Prospecting', 'Qualification', 'Negotiation', 'Closed']),
    (0, express_validator_1.check)('value', 'Value must be a number').isNumeric(),
], deals_1.createDeal);
router.get('/', auth_1.authMiddleware, deals_1.getMyDeal); // Fix: Use getMyDeal
router.get('/:id', auth_1.authMiddleware, deals_1.getMyDealById); // Fix: Use getMyDealById
exports.default = router;
