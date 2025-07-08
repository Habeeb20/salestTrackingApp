import { Router } from "express";
import { check } from "express-validator";
import { ForgotPassword, login, resetPassword, sendOtp, signup, verifyEmail } from "../controllers/auth";


const router = Router()

router.post("/register",  [
    check('email', 'enter a valid email').isEmail(),
    check('password', 'password must not be less than 6 characters').isLength({min: 6}),
], signup)


router.post("/verify-email", [
  check('code', )
], verifyEmail)

router.post("/send-otp", [
  check('email', "please enter the email" ).isEmail()
], sendOtp)

router.post('/login', [
    check('email', 'enter a valid email').isEmail(),
    check('password', 'password must not be less than 6 characters').isLength({min: 6}),
], login,)



router.post(
  '/forgot-password',
  [check('email', 'Valid email is required').isEmail()],
  ForgotPassword
);

router.post(
  '/reset-password',
  [
    check('email', 'Valid email is required').isEmail(),
    check('token', 'Reset token is required').notEmpty(),
    check('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  resetPassword,
);

export default router