import { validationResult } from "express-validator";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import Deal, { IDeals } from "../models/deals";
import { AuthRequest } from "../middleware/auth";


export const createDeal = async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, stage, value } = req.body as {
    title: string;
    stage: 'Prospecting' | 'Qualification' | 'Negotiation' | 'Closed';
    value: number;
  };
  const userId = req.user?.userId;

  try {
    const deal: IDeals = new Deal({ title, stage, value, userId });
    await deal.save();
    res.status(201).json(deal);
  } catch (err) {
    console.error('Create deal error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMyDeal = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  try {
    const deals: IDeals[] | null = await Deal.find({ userId });
    res.json(deals);
  } catch (err) {
    console.error('Get deals error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMyDealById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.userId;

  try {
    const deal: IDeals | null = await Deal.findOne({ _id: id, userId });
    if (!deal) {
      res.status(404).json({ message: 'Deal not found' });
      return;
    }
    res.json(deal);
  } catch (err) {
    console.error('Get deal by ID error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};