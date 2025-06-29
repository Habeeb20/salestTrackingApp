import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/user";
import nodemailer from "nodemailer"
import crypto from "crypto"
interface LoginBody {
  email: string;
  password: string;
}

export const signup = async(req:Request, res:Response):Promise<void> => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) res.status(400).json({error: errors.array()})
    

        const {email, role, password} = req.body as {email: string, role: string, password: string}

        try {
            const user: IUser | null =  await User.findOne({email})
            if(user){
                 res.status(400).json({message: "email already existed, please login"})
                 return
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                email, role, password:hashedPassword
            })

            await newUser.save()
            res.status(200).json({message: 'successfully saved'})      
            
        } catch (error){
            console.log(error)
            res.status(500).json({message: "an error occurred"})
        }
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




interface ForgotPasswordBody {
    email:string
}


export const  ForgotPassword = async(req: Request<{}, {}, ForgotPasswordBody>, res:Response):Promise<void> => {
    const errors = validationResult(req)
    if(!errors.isEmpty){res.status(400).json({error:errors.array()}) 
        return 
    }

    const {email} = req.body

    try {
        const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(200).json({ message: 'If the email exists, a reset link has been sent.' });
      return;
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();


    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset for your Sales Tracking account.</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn’t request this, ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'If the email exists, a reset link has been sent.' })
    } catch (error) {
        console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
    }

  
}


// New: Reset Password
interface ResetPasswordBody {
  email: string;
  token: string;
  newPassword: string;
}

export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordBody>,
  res: Response,
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    return;
  }

  const { email, token, newPassword } = req.body;

  try {
    const user: IUser | null = await User.findOne({
      email,
      resetPasswordExpires: { $gt: new Date() }, // Token not expired
    });

    if (!user || !user.resetPasswordToken) {
      res.status(400).json({ message: 'Invalid or expired reset token' });
      return;
    }

    // Verify token
    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) {
      res.status(400).json({ message: 'Invalid or expired reset token' });
      return;
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; // Clear token
    user.resetPasswordExpires = undefined; // Clear expiry
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};