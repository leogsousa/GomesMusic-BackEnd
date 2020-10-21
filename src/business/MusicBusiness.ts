import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { MusicDatabase } from "../data/MusicDatabase";
import moment from "moment";
import { MusicGenderDatabase } from "../data/MusicGenderDatabase";

export class MusicBusiness {

  async createMusic(input: any, token: string) {

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token)
    const userId = authenticationData.id

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const creationDate = moment();

    const musicDatabase = new MusicDatabase();
    await musicDatabase.createMusic(id, input.title, userId, creationDate.format("DD/MM/YYYY"), input.file, input.album)

    for (const element of input.genre){
      const musicGenderDatabase = new MusicGenderDatabase();
      await musicGenderDatabase.addGenderToMusic(id, element)
    }

  }

  async getAllMusics(token: string) {

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token)
    const userId = authenticationData.id

    const musicDatabase = new MusicDatabase();
    const result = await musicDatabase.getAllMusics(userId)

    return result

  }

  async getMusicById(id: string, token: string) {

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token)
    const userId = authenticationData.id

    const musicDatabase = new MusicDatabase();
    const result = await musicDatabase.getMusicById(id)

    return result

  }

  async deleteMusicById(id: string, token: string) {

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token)
    const userId = authenticationData.id

    const musicDatabase = new MusicDatabase();
    await musicDatabase.deleteMusicById(id)

  }

}