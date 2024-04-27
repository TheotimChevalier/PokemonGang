import { Router } from 'express';

import spawnItemsRoutes from './spawnItems';
import catchItemRoutes from './catchItem';

const router = Router();

router.use('/spawn-items', spawnItemsRoutes);
router.use('/catch-item', catchItemRoutes)

export default router;