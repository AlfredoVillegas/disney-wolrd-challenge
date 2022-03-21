import { Request, Response } from 'express';
import { findCharacterDetails } from '../services/findCharacterDetails';

export async function FindCharacterDetailControllers(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const character = await findCharacterDetails(id);
    res.status(200).json({ data: character });
  } catch (err: any) {
    res.status(400).json({ errorMessage: err.message });
  }
}
