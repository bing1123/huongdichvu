import { Router } from 'express';
import { register } from './src/controller/auth-controller';

const router = Router();

router.post('/register', register);


export default router;
