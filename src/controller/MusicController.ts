import { Request, Response } from "express";
import { UserInputDTO } from "../model/User";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicBusiness } from "../business/MusicBusiness";

export class MusicController {
  async createMusic(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const input: any = {
        title: req.body.title,
        file: req.body.file,
        genre: req.body.genre,
        album: req.body.album
      }

      const musicBusiness = new MusicBusiness();
      const music = await musicBusiness.createMusic(input, token);

      res.status(200).send({
        message: "Música criada com sucesso",  
        music
      })

    } catch (error) {
      res.status(400).send({ error: error.message});
    }

    await BaseDatabase.destroyConnection();
  }

  async getAllMusics(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string

      const musicBusiness = new MusicBusiness();
      const result = await musicBusiness.getAllMusics(token);

      res.status(200).send({
        musics: result
      })

    } catch (error) {
      res.status(400).send({ error: error.message});
    }

    await BaseDatabase.destroyConnection();
  }

  async getMusicById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const id = req.params.id

      const musicBusiness = new MusicBusiness();
      const result = await musicBusiness.getMusicById(id, token);

      res.status(200).send(
        result
      )

    } catch (error) {
      res.status(400).send({ error: error.message});
    }

    await BaseDatabase.destroyConnection();
  }

  async deleteMusicById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const id = req.body.id

      const musicBusiness = new MusicBusiness();
      await musicBusiness.deleteMusicById(id, token);

      res.status(200).send({
        message: "Música deletada com sucesso",
      })

    } catch (error) {
      res.status(400).send({ error: error.message});
    }

    await BaseDatabase.destroyConnection();
  }
}