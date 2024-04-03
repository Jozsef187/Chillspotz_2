import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';
import * as model from '../models/spotsModel.js';

const dirname = path.resolve();

// eslint-disable-next-line import/prefer-default-export
export const getSpots = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getSpots());
});

export const getSpotsDetail = asyncHandler(async (req, res) => {
  const pid = req.params.id;
  res.status(200).json(await model.getSpotsDetail(pid));
});

export const delSpot = asyncHandler(async (req, res) => {
  const pid = req.params.id;
  res.status(200).json(await model.delSpot(pid));
});

export const makeSpot = asyncHandler(async (req, res) => {
  // eslint-disable-next-line operator-linebreak, camelcase
  const { foto, titel, beschreibung, rating, likes, added_by, latitude, longitude } = req.body;
  const filename = `spot_${Date.now()}.png`;
  const filepath = path.join(dirname, 'public', 'pictures', filename);
  console.log('base64:', foto);
  fs.writeFileSync(filepath, foto.split(',')[1], 'base64');
  res
    .status(200)
    .json(
      await model.makeSpot(
        filename,
        titel,
        beschreibung,
        rating,
        likes,
        added_by,
        latitude,
        longitude,
      ),
    );
});
