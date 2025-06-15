import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth";


const router = Router()


router.post('/login', [
    check('email', 'enter a valid email').isEmail(),
    check('password', 'password must not be less than 6 characters').isLength({min: 6}),
], login,)


export default router