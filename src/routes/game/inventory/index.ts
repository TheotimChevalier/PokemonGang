import { Router } from 'express';

import getItemsRoutes from './getItems';
import getPokedollarRoutes from './getPokedollar';

const router = Router();

router.use('/get-items', getItemsRoutes);
router.use('/get-pokedollar', getPokedollarRoutes);

export default router;