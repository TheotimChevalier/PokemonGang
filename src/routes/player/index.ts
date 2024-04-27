import { Router } from 'express';

import getPlayerRoutes from './getPlayer';
import forceLeaveRoutes from './forceLeave';
import getLastCoord from './getLastCoord';

const router = Router();

router.use('/get-player', getPlayerRoutes);
router.use('/force-leave', forceLeaveRoutes);
router.use('/get-last-coord', getLastCoord);

export default router;