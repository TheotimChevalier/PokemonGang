import { Router } from "express";
import loginRoutes from './login';
import sessionErrorRoutes from './sessionErrorMessage';

const router = Router();
router.get('/', (req, res) => {
  res.send(200)
});

router.use('/login', loginRoutes);
router.use('/get-session-error-message', sessionErrorRoutes);

export default router;