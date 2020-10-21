import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEMUSIC_MUSICS";

  public async createMusic(
    id: string,
    title: string,
    author: string,
    date: string,
    file: string,
    album: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          title,
          author,
          date,
          file,
          album
        })
        .into(MusicDatabase.TABLE_NAME);

    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllMusics(id: string): Promise<any[]> {
    const result = await this.getConnection()
      .select('*')
      .from(MusicDatabase.TABLE_NAME)
      .where({ author: id });

    return result;
  }

  public async getMusicById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(MusicDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }

  public async deleteMusicById(id: string): Promise<any> {
    await this.getConnection()
      .delete()
      .from(MusicDatabase.TABLE_NAME)
      .where({ id });

  }

}
