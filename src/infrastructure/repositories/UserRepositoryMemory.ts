import User from "../../domain/user/User";
import UserRepository from "../../domain/user/UserRepository";

export default class UserRepositoryMemory implements UserRepository {
  private users: User[] = [];

  async searchByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async add(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
