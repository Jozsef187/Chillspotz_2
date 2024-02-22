import asyncHandler from 'express-async-handler';
import * as model from '../models/spotsModel.js';

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
  const { foto } = req.body.foto;
  const { titel } = req.body.titel;
  const { beschreibung } = req.body.beschreibung;
  const { rating } = req.body.rating;
  const { likes } = req.body.likes;
  // eslint-disable-next-line camelcase
  const { added_by } = req.body.added_by;
  const { latitude } = req.body.latitude;
  const { longitude } = req.body.longitude;
  res
    .status(200)
    .json(
      await model.makeSpot(foto, titel, beschreibung, rating, likes, added_by, latitude, longitude),
    );
});
