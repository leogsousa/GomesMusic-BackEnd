import { BaseDatabase } from "./BaseDatabase";

export class PlaylistMusicDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEMUSIC_PLAYLISTS_MUSIC";

  public async addMusicToPlaylist(
    music_id: string,
    playlist_id: string,
    date: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          music_id,
          playlist_id,
          date
        })
        .into(PlaylistMusicDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}
