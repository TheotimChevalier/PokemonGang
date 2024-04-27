import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', async (req, res) => {
  console.log('forceleave')
  res.sendFile(path.join(__dirname, '../../../public//components/leaveGame/index.html'))
});

export default router;