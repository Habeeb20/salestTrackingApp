import { check } from "express-validator";
import { Router } from "express";
import { createDeal, getMyDeal, getMyDealById } from "../controllers/deals"; // Use correct imports
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  '/',
  [
    authMiddleware,
    check('title', 'Title is required').notEmpty(),
    check('stage', 'Invalid stage').isIn(['Prospecting', 'Qualification', 'Negotiation', 'Closed']),
    check('value', 'Value must be a number').isNumeric(),
  ],
  createDeal,
);

router.get('/', authMiddleware, getMyDeal); // Fix: Use getMyDeal
router.get('/:id', authMiddleware, getMyDealById); // Fix: Use getMyDealById

export default router;