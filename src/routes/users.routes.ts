import { Router } from 'express';
import { meHandler } from '../controllers/user.controller.js';
import { auth, requireRole } from '../middleware/auth.js';
import { updateRoleValidator, updateUserRoleHandler } from '../controllers/admin.controller.js';

const r = Router();
r.get('/me', auth(true), meHandler);
r.patch('/:id/role', auth(true), requireRole(['admin']), updateRoleValidator, updateUserRoleHandler);
export default r;
