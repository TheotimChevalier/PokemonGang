import { Router } from 'express';
import userRoutes from './user';
import gameRoutes from './game';
import playerRoutes from './player';
import serverRoutes from './server';

const router = Router();

router.get('/', (req, res) => {
  res.send(200)
});

router.use('/user', userRoutes);
router.use('/game', gameRoutes);
router.use('/player', playerRoutes)
router.use('/server', serverRoutes)

export default router;