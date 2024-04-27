import { Router } from 'express';
import { cacheServer } from '../../../lib';

const router = Router();

router.get('/', async (req, res) => {
  const idWorld = +req.query.id!;

  const zones = [...cacheServer.zones.zones.values()].filter(i => i.id_world === idWorld)
  const zone_encounters = [...cacheServer.zones.zone_encounters.values()].filter(i => zones.map(x => x.id).includes(i.id_zone));

  res.json({
    zones,
    zone_encounters
  });
});

export default router;