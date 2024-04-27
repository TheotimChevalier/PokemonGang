import { Router } from "express";
import { synchro } from "../../lib";

const router = Router();

router.get('/', (req, res) => {
  synchro();

  res.sendStatus(200);
});

export default router;