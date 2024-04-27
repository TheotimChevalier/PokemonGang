import { Router } from "express";
import synchroRoutes from './synchro';

const router = Router();

router.use('/synchro', synchroRoutes);

export default router;