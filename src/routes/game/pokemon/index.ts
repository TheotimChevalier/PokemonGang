import { Router } from 'express';

import getPokemonsRoutes from './getPokemons';
import createPokemonRoutes from './create';
import zonesRoutes from './zones';
import synchroRoutes from './synchro';
import playerRoutes from './player/index';

const router = Router();

router.get('/', (req, res) => res.sendStatus(200))

router.use('/get-pokemons', getPokemonsRoutes);
router.use('/create', createPokemonRoutes);
router.use('/zones', zonesRoutes)
router.use('/synchro', synchroRoutes)
router.use('/player', playerRoutes)

export default router;