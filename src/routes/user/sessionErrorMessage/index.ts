import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ errorMessage: req.session.errorMessage || '' });
  req.session.destroy(err => 0) 
});

export default router;