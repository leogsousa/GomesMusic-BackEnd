import { BaseDatabase } from "./BaseDatabase";

export class MusicGenderDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEMUSIC_GENRES_MUSIC";

  public async addGenderToMusic(
    music_id: string,
    genre_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          music_id,
          genre_id 
        })
        .into(MusicGenderDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}
