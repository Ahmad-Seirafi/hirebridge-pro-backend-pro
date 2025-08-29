import { Router } from 'express';
import { loginHandler, loginValidator, registerHandler, registerValidator } from '../controllers/auth.controller.js';
import { refreshHandler } from '../controllers/token.controller.js';
const r = Router();
r.post('/register', registerValidator, registerHandler);
r.post('/login', loginValidator, loginHandler);
r.post('/refresh', refreshHandler);
export default r;
