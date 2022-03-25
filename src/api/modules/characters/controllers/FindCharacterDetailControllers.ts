import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../../../shared/network/response';
import { CharacterNotExist } from '../Errors';
import { findCharacterDetails } from '../services/findCharacterDetails';

export async function FindCharacterDetailControllers(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const character = await findCharacterDetails(id);
    responseSuccess(res, 200, character);
    res.status(200).json({ data: character });
  } catch (err: any) {
    if (err instanceof CharacterNotExist) responseError(res, 404, err.message);
    else responseError(res);
  }
}
