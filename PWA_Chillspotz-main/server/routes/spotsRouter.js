import express from 'express';
import asyncHandler from 'express-async-handler';

import { getSpots, getSpotsDetail, delSpot, makeSpot } from '../controllers/spotsController.js';

const router = express.Router();

router.get('/', asyncHandler(getSpots));
router.get('/:id', asyncHandler(getSpotsDetail));
router.delete('/:id', asyncHandler(delSpot));
router.post('/', asyncHandler(makeSpot));

export default router;
