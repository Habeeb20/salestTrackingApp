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
exports.resetPassword = exports.ForgotPassword = exports.login = exports.sendOtp = exports.verifyEmail = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const funtion_1 = require("../funtion");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        res.status(400).json({ error: errors.array() });
    const { email, role, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ message: "email already existed, please login" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const uniqueNumber = `RL-${crypto_1.default
            .randomBytes(3)
            .toString('hex')
            .toUpperCase()}`;
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
        const newUser = new user_1.default({
            email, role, password: hashedPassword, verificationToken,
            verificationTokenExpiresAt,
            uniqueNumber,
        });
        yield newUser.save();
        const response = yield (0, funtion_1.sendOTPEmail)(newUser.email, verificationToken, newUser.role);
        if (!response.success) {
            console.log("an error  occurred in sending otp", response.error);
            res.json(400).json({ message: "an error occured while sending otp to your mail" });
        }
        const payload = { user: { id: newUser._id } };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'successfully saved', token: token, role: newUser.role, email: newUser.email });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "an error occurred" });
    }
});
exports.signup = signup;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        res.status(400).json({ error: errors.array() });
    try {
        const { email, code } = req.body;
        console.log("lets verify this", { email, code });
        const user = yield user_1.default.findOne({
            email,
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        yield user.save();
        const payload = { user: { id: user._id } };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            success: true,
            message: "Email verified successfully",
            token,
            user: { id: user._id, email: user.email, isVerified: true, role: user.role },
        });
    }
    catch (error) {
        console.error("Email verification error:", error);
        res
            .status(500)
            .json({ status: false, message: error || "Server error occurred" });
    }
});
exports.verifyEmail = verifyEmail;
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log("Resending OTP for email:", email);
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        user.verificationToken = verificationToken;
        user.verificationTokenExpiresAt = verificationTokenExpiresAt;
        yield user.save();
        const response = yield (0, funtion_1.sendOTPEmail)(email, verificationToken, user.role);
        if (!response.success) {
            console.log("an error occurred whike sending email");
            res.status(400).json({ message: "an error occurred" });
            return;
        }
        res.json({
            status: true,
            message: "Verification code resent successfully",
        });
    }
    catch (error) {
        console.error("Send OTP error:", error);
        res.status(500).json({ status: false, message: "Server error occurred" });
    }
});
exports.sendOtp = sendOtp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: 'Validation errors', errors: errors.array() });
        return;
    }
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const payload = { userId: user._id.toString(), email: user.email, role: user.role };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token: token, user, role: user.role });
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
const ForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty) {
        res.status(400).json({ error: errors.array() });
        return;
    }
    const { email } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(200).json({ message: 'If the email exists, a reset link has been sent.' });
            return;
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetTokenHash = yield bcryptjs_1.default.hash(resetToken, 10);
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);
        yield user.save();
        const transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'If the email exists, a reset link has been sent.' });
    }
    catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.ForgotPassword = ForgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: 'Validation errors', errors: errors.array() });
        return;
    }
    const { email, token, newPassword } = req.body;
    try {
        const user = yield user_1.default.findOne({
            email,
            resetPasswordExpires: { $gt: new Date() }, // Token not expired
        });
        if (!user || !user.resetPasswordToken) {
            res.status(400).json({ message: 'Invalid or expired reset token' });
            return;
        }
        // Verify token
        const isTokenValid = yield bcryptjs_1.default.compare(token, user.resetPasswordToken);
        if (!isTokenValid) {
            res.status(400).json({ message: 'Invalid or expired reset token' });
            return;
        }
        // Hash new password
        user.password = yield bcryptjs_1.default.hash(newPassword, 10);
        user.resetPasswordToken = undefined; // Clear token
        user.resetPasswordExpires = undefined; // Clear expiry
        yield user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.resetPassword = resetPassword;
