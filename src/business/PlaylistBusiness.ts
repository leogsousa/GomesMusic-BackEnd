import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { MusicDatabase } from "../data/MusicDatabase";
import moment from "moment";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { PlaylistMusicDatabase } from "../data/PlaylistMusicDatabase";

export class PlaylistBusiness {

  async createPlaylist(input: any, token: string) {

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token) 
    const userId = authenticationData.id

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const playlistDatabase = new PlaylistDatabase();
    await playlistDatabase.createPlaylist(id, input.title, input.subtitle, input.image)

  }

  async addMusicToPlaylist(input: any, token: string) {

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token) 
    const userId = authenticationData.id

    const creationDate = moment();

    const playlistMusicDatabase = new PlaylistMusicDatabase();
    await playlistMusicDatabase.addMusicToPlaylist(input.music_id, input.playlist_id, creationDate.format("DD/MM/YYYY"))

  }

}