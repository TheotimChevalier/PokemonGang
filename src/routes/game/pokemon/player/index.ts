import { Router } from 'express';

import actifRoutes from './actif';

const router = Router();

router.get('/', (req, res) => res.sendStatus(200))

router.use('/actif', actifRoutes);

export default router;