import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "LABEMUSIC_USERS";

  public async createUser(
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          nickname,
          email,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

  public async getUserById(id: string): Promise<User> {
    const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return User.toUserModel(result[0]);
  }
}
