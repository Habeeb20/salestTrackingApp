import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/user";


interface LoginBody {
  email: string;
  password: string;
}

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const payload = { userId: user._id.toString(), email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(200).json({ accessToken: token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



