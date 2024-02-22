/* eslint-disable camelcase */
import { query } from '../db/index.js';

// eslint-disable-next-line import/prefer-default-export
export const getSpots = async () => {
  const { rows } = await query('SELECT * from spots');
  return rows;
};

export const getSpotsDetail = async (pid) => {
  const { rows } = await query('SELECT * from spots where pid = $1;', [pid]);
  return rows;
};

export const delSpot = async (pid) => {
  const { rows } = await query('delete from spots where pid = $1 ;', [pid]);
  return rows;
};

export const makeSpot = async (
  foto,
  titel,
  beschreibung,
  rating,
  likes,
  added_by,
  latitude,
  longitude,
) => {
  const { rows } = await query(
    'INSERT INTO public.spots (pid, foto, titel, beschreibung, rating, likes, added_by, latitude, longitude) VALUES (DEFAULT, $1, $2,$3, $4, $5, $6, $7, $8);',
    [foto, titel, beschreibung, rating, likes, added_by, latitude, longitude],
  );
  return rows;
};
