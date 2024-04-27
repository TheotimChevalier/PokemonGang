import { Router } from 'express';

import inventoryRoutes from './inventory/index';
import worldRoutes from './world/index';
import pokemonRoutes from './pokemon/index';

const router = Router();

router.get('/', (req, res) => res.sendStatus(200))

router.use('/inventory', inventoryRoutes);
router.use('/world', worldRoutes);
router.use('/pokemon', pokemonRoutes);

export default router;