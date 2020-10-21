import { Request, Response } from "express";
import { UserInputDTO } from "../model/User";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicBusiness } from "../business/MusicBusiness";
import { PlaylistBusiness } from "../business/PlaylistBusiness";

export class PlaylistController {
  async createPlaylist(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const input: any = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image
      }

      const playlistBusiness = new PlaylistBusiness();
      await playlistBusiness.createPlaylist(input, token);

      res.status(200).send({
        message: "Playlist criada com sucesso",
      })

    } catch (error) {
      res.status(400).send({ error: error.message});
    }

    await BaseDatabase.destroyConnection();
  }

  async addMusicToPlaylist(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const input: any = {
        music_id: req.body.music_id,
        playlist_id: req.body.playlist_id,
      }

      const playlistBusiness = new PlaylistBusiness();
      await playlistBusiness.addMusicToPlaylist(input, token);

      res.status(200).send({
        message: "Música adicionada a playlist com sucesso",
      })

    } catch (error) {
      res.status(400).send({ error: error.message});
    }

    await BaseDatabase.destroyConnection();
  }

}