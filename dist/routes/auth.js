"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)('email', 'enter a valid email').isEmail(),
    (0, express_validator_1.check)('password', 'password must not be less than 6 characters').isLength({ min: 6 }),
], auth_1.signup);
router.post("/verify-email", [
    (0, express_validator_1.check)('code')
], auth_1.verifyEmail);
router.post("/send-otp", [
    (0, express_validator_1.check)('email', "please enter the email").isEmail()
], auth_1.sendOtp);
router.post('/login', [
    (0, express_validator_1.check)('email', 'enter a valid email').isEmail(),
    (0, express_validator_1.check)('password', 'password must not be less than 6 characters').isLength({ min: 6 }),
], auth_1.login);
router.post('/forgot-password', [(0, express_validator_1.check)('email', 'Valid email is required').isEmail()], auth_1.ForgotPassword);
router.post('/reset-password', [
    (0, express_validator_1.check)('email', 'Valid email is required').isEmail(),
    (0, express_validator_1.check)('token', 'Reset token is required').notEmpty(),
    (0, express_validator_1.check)('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 }),
], auth_1.resetPassword);
exports.default = router;
