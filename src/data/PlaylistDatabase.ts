import { BaseDatabase } from "./BaseDatabase";

export class PlaylistDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEMUSIC_PLAYLISTS";

  public async createPlaylist(
    id: string,
    title: string,
    subtitle: string,
    image?: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          title,
          subtitle,
          image
        })
        .into(PlaylistDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}
